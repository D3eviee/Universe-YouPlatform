import { NextResponse } from "next/server";
import { desc, eq } from "drizzle-orm";
import { db } from "@/server/db";
import { books } from "@/server/schema";
import { deleteFromS3 } from "@/server/s3";
import { requireAdmin } from "@/lib/auth";
import { parseBookForm } from "@/server/books/parse-book-form";
import { ValidationError, isUniqueViolation } from "@/server/errors";
import { collectImageKeys, unusedKeys } from "@/server/content/images";

const denied = (status: 401 | 403) => NextResponse.json({ error: "Permission denied" }, { status });

/** Bad input → 400 with the list of issues. Anything else → 500. */
function parseErrorResponse(error: unknown, fallback: string) {
  if (error instanceof ValidationError)
    return NextResponse.json({ error: error.message, issues: error.issues }, { status: 400 });
  console.error(fallback, error);
  return NextResponse.json({ error: fallback }, { status: 500 });
}

export async function GET() {
  const auth = await requireAdmin();
  if (!auth.ok) return denied(auth.status);

  try {
    const allBooks = await db.query.books.findMany({ orderBy: [desc(books.createdAt)] });
    return NextResponse.json(allBooks);
  } catch (error) {
    console.error("Error while getting books", error);
    return NextResponse.json({ error: "Error while getting books" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const auth = await requireAdmin();
  if (!auth.ok) return denied(auth.status);

  // 1) VALIDATE + UPLOAD
  let parsed: Awaited<ReturnType<typeof parseBookForm>>;
  try {
    parsed = await parseBookForm(await req.formData(), auth.user.id);
  } catch (error) {
    return parseErrorResponse(error, "Error while saving book");
  }

  // 2) SAVE. If it fails, remove the images we just uploaded.
  try {
    const [saved] = await db.insert(books).values(parsed.values).returning();
    return NextResponse.json(saved, { status: 201 });
  } catch (error) {
    await deleteFromS3(parsed.uploadedKeys);
    if (isUniqueViolation(error))
      return NextResponse.json({ error: "A book with this slug or id already exists" }, { status: 409 });
    console.error("Error while saving book", error);
    return NextResponse.json({ error: "Error while saving book" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  const auth = await requireAdmin();
  if (!auth.ok) return denied(auth.status);

  // 1) VALIDATE + UPLOAD
  let parsed: Awaited<ReturnType<typeof parseBookForm>>;
  try {
    parsed = await parseBookForm(await req.formData(), auth.user.id);
  } catch (error) {
    return parseErrorResponse(error, "Error while updating book");
  }

  // On update, the author and id never change (createdAt isn't in the form at all)
  const { id, authorId: _, ...changes } = parsed.values;

  try {
    // 2) READ THE IMAGES THE BOOK USES NOW, to clean up afterwards
    const before = await db.query.books.findFirst({
      where: eq(books.id, id),
      columns: { bookCover: true, blocks: true },
    });
    if (!before) {
      await deleteFromS3(parsed.uploadedKeys);
      return NextResponse.json({ error: "Book not found" }, { status: 404 });
    }

    // 3) SAVE
    const [saved] = await db.update(books).set(changes).where(eq(books.id, id)).returning();
    if (!saved) {
      await deleteFromS3(parsed.uploadedKeys);
      return NextResponse.json({ error: "Book not found" }, { status: 404 });
    }

    // 4) DELETE IMAGES THE BOOK NO LONGER USES (best-effort, never fails the request)
    const oldKeys = collectImageKeys("books", id, { cover: before.bookCover, blocks: before.blocks });
    const newKeys = collectImageKeys("books", id, { cover: saved.bookCover, blocks: saved.blocks });
    await deleteFromS3(unusedKeys(oldKeys, newKeys));

    return NextResponse.json(saved);
  } catch (error) {
    await deleteFromS3(parsed.uploadedKeys);
    if (isUniqueViolation(error))
      return NextResponse.json({ error: "A book with this slug already exists" }, { status: 409 });
    console.error("Error while updating book", error);
    return NextResponse.json({ error: "Error while updating book" }, { status: 500 });
  }
}