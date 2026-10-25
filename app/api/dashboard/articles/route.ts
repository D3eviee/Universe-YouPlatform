import { NextResponse } from "next/server";
import { desc, eq } from "drizzle-orm";
import { db } from "@/server/db";
import { articles } from "@/server/schema";
import { deleteFromS3 } from "@/server/s3";
import { requireAdmin } from "@/lib/auth";
import { parseArticleForm } from "@/server/articles/parse-article-form";
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
    const allArticles = await db.query.articles.findMany({ orderBy: [desc(articles.createdAt)] });
    return NextResponse.json(allArticles);
  } catch (error) {
    console.error("Error while getting articles", error);
    return NextResponse.json({ error: "Error while getting articles" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const auth = await requireAdmin();
  if (!auth.ok) return denied(auth.status);

  // 1) VALIDATE + UPLOAD
  let parsed: Awaited<ReturnType<typeof parseArticleForm>>;
  try {
    parsed = await parseArticleForm(await req.formData(), auth.user.id);
  } catch (error) {
    return parseErrorResponse(error, "Error while saving article");
  }

  // 2) SAVE. If it fails, remove the images we just uploaded.
  try {
    const [saved] = await db.insert(articles).values(parsed.values).returning();
    return NextResponse.json(saved, { status: 201 });
  } catch (error) {
    await deleteFromS3(parsed.uploadedKeys);
    if (isUniqueViolation(error))
      return NextResponse.json({ error: "An article with this slug or id already exists" }, { status: 409 });
    console.error("Error while saving article", error);
    return NextResponse.json({ error: "Error while saving article" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  const auth = await requireAdmin();
  if (!auth.ok) return denied(auth.status);

  // 1) VALIDATE + UPLOAD
  let parsed: Awaited<ReturnType<typeof parseArticleForm>>;
  try {
    parsed = await parseArticleForm(await req.formData(), auth.user.id);
  } catch (error) {
    return parseErrorResponse(error, "Error while updating article");
  }

  // On update, the author and id never change
  const { id, authorId: _, ...changes } = parsed.values;

  try {
    // 2) READ THE IMAGES THE ARTICLE USES NOW, to clean up afterwards
    const before = await db.query.articles.findFirst({
      where: eq(articles.id, id),
      columns: { thumbnailImage: true, blocks: true },
    });
    if (!before) {
      await deleteFromS3(parsed.uploadedKeys);
      return NextResponse.json({ error: "Article not found" }, { status: 404 });
    }

    // 3) SAVE
    const [saved] = await db.update(articles).set(changes).where(eq(articles.id, id)).returning();
    if (!saved) {
      await deleteFromS3(parsed.uploadedKeys);
      return NextResponse.json({ error: "Article not found" }, { status: 404 });
    }

    // 4) DELETE IMAGES THE ARTICLE NO LONGER USES (best-effort, never fails the request)
    const oldKeys = collectImageKeys("articles", id, { cover: before.thumbnailImage, blocks: before.blocks });
    const newKeys = collectImageKeys("articles", id, { cover: saved.thumbnailImage, blocks: saved.blocks });
    await deleteFromS3(unusedKeys(oldKeys, newKeys));

    return NextResponse.json(saved);
  } catch (error) {
    await deleteFromS3(parsed.uploadedKeys);
    if (isUniqueViolation(error))
      return NextResponse.json({ error: "An article with this slug already exists" }, { status: 409 });
    console.error("Error while updating article", error);
    return NextResponse.json({ error: "Error while updating article" }, { status: 500 });
  }
}