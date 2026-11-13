import { NextResponse } from "next/server";
import { z } from "zod";
import { desc, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "@/server/db";
import { books } from "@/server/schema";
import { requireAdmin } from "@/lib/auth";
import { parseJsonBody } from "@/server/content/parse";
import { allImageKeys, saveWithImages } from "@/server/content/images";
import { deleteFromS3 } from "@/server/s3";
import { denied, errorResponse, notFound } from "@/server/http";
import { parseBookRequest } from "@/server/books/book-input";

/** Refresh every public page a book appears on. */
function refreshBookPages(...slugs: string[]) {
  revalidatePath("/");
  revalidatePath("/books");
  for (const slug of new Set(slugs)) revalidatePath(`/books/${slug}`);
}

export async function GET() {
  const auth = await requireAdmin();
  if (!auth.ok) return denied(auth.status);

  try {
    const all = await db.query.books.findMany({ orderBy: [desc(books.createdAt)] });
    return NextResponse.json(all);
  } catch (error) {
    return errorResponse(error, "Error while getting books");
  }
}

export async function POST(req: Request) {
  const auth = await requireAdmin();
  if (!auth.ok) return denied(auth.status);

  try {
    const values = await parseBookRequest(req, auth.user.id);

    // Refuse before touching S3: the images in this folder may belong to the existing book
    const exists = await db.query.books.findFirst({ where: eq(books.id, values.id), columns: { id: true } });
    if (exists) return NextResponse.json({ error: "Book already exists, use PUT" }, { status: 409 });

    const saved = await saveWithImages({
      content: { cover: values.bookCover, blocks: values.blocks },
      before: null,
      write: async () => (await db.insert(books).values(values).returning())[0],
    });

    if (saved) refreshBookPages(saved.slug);
    return NextResponse.json(saved, { status: 201 });
  } catch (error) {
    return errorResponse(error, "Error while saving book");
  }
}

export async function PUT(req: Request) {
  const auth = await requireAdmin();
  if (!auth.ok) return denied(auth.status);

  try {
    // The author and id never change on update
    const { id, authorId: _, ...changes } = await parseBookRequest(req, auth.user.id);

    const before = await db.query.books.findFirst({
      where: eq(books.id, id),
      columns: { bookCover: true, blocks: true, slug: true },
    });
    if (!before) return notFound("Book");

    const saved = await saveWithImages({
      content: { cover: changes.bookCover, blocks: changes.blocks },
      before: { cover: before.bookCover, blocks: before.blocks },
      write: async () => (await db.update(books).set(changes).where(eq(books.id, id)).returning())[0],
    });
    if (!saved) return notFound("Book");

    refreshBookPages(before.slug, saved.slug); // a new title means a new slug: refresh the old URL too
    return NextResponse.json(saved);
  } catch (error) {
    return errorResponse(error, "Error while updating book");
  }
}

export async function DELETE(req: Request) {
  const auth = await requireAdmin();
  if (!auth.ok) return denied(auth.status);

  try {
    const { id } = await parseJsonBody(req, z.object({ id: z.uuid() }));
    const [deleted] = await db
      .delete(books)
      .where(eq(books.id, id))
      .returning({ bookCover: books.bookCover, blocks: books.blocks, slug: books.slug });
    if (!deleted) return notFound("Book");

    // The row is gone, so its images are no longer used by anything
    await deleteFromS3(allImageKeys({ cover: deleted.bookCover, blocks: deleted.blocks }));
    refreshBookPages(deleted.slug);
    return NextResponse.json({ id });
  } catch (error) {
    return errorResponse(error, "Error while deleting book");
  }
}