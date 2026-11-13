import { NextResponse } from "next/server";
import { z } from "zod";
import { desc, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "@/server/db";
import { articles } from "@/server/schema";
import { requireAdmin } from "@/lib/auth";
import { parseArticleRequest } from "@/server/articles/article-input";
import { parseJsonBody } from "@/server/content/parse";
import { allImageKeys, saveWithImages } from "@/server/content/images";
import { deleteFromS3 } from "@/server/s3";
import { denied, errorResponse, notFound } from "@/server/http";

/** Refresh every public page an article appears on. */
function refreshArticlePages(...slugs: string[]) {
  revalidatePath("/");
  revalidatePath("/articles");
  revalidatePath("/account/saved-content");
  for (const slug of new Set(slugs)) revalidatePath(`/articles/${slug}`);
}

export async function GET() {
  const auth = await requireAdmin();
  if (!auth.ok) return denied(auth.status);

  try {
    const all = await db.query.articles.findMany({ orderBy: [desc(articles.createdAt)] });
    return NextResponse.json(all);
  } catch (error) {
    return errorResponse(error, "Error while getting articles");
  }
}

export async function POST(req: Request) {
  const auth = await requireAdmin();
  if (!auth.ok) return denied(auth.status);

  try {
    const articleData = await parseArticleRequest(req, auth.user.id);

    // Refuse before touching S3: the images in this folder may belong to the existing article
    const exists = await db.query.articles.findFirst({ where: eq(articles.id, articleData.id), columns: { id: true } });
    if (exists) return NextResponse.json({ error: "Article already exists, use PUT" }, { status: 409 });

    const saved = await saveWithImages({
      content: { cover: articleData.thumbnailImage, blocks: articleData.blocks },
      before: null,
      write: async () => (await db.insert(articles).values(articleData).returning())[0],
    });
    
    if (saved) refreshArticlePages(saved.slug);
    return NextResponse.json(saved, { status: 201 });
  } catch (error) {
    return errorResponse(error, "Error while saving article");
  }
}

export async function PUT(req: Request) {
  const auth = await requireAdmin();
  if (!auth.ok) return denied(auth.status);

  try {
    // The author and id never change on update
    const { id, authorId: _, ...changes } = await parseArticleRequest(req, auth.user.id);

    const before = await db.query.articles.findFirst({
      where: eq(articles.id, id),
      columns: { thumbnailImage: true, blocks: true, slug: true },
    });
    if (!before) return notFound("Article");

    const saved = await saveWithImages({
      content: { cover: changes.thumbnailImage, blocks: changes.blocks },
      before: { cover: before.thumbnailImage, blocks: before.blocks },
      write: async () => (await db.update(articles).set(changes).where(eq(articles.id, id)).returning())[0],
    });
    if (!saved) return notFound("Article");

    refreshArticlePages(before.slug, saved.slug);
    return NextResponse.json(saved);
  } catch (error) {
    return errorResponse(error, "Error while updating article");
  }
}

export async function DELETE(req: Request) {
  const auth = await requireAdmin();
  if (!auth.ok) return denied(auth.status);

  try {
    const { id } = await parseJsonBody(req, z.object({ id: z.uuid() }));
    const [deleted] = await db
      .delete(articles)
      .where(eq(articles.id, id))
      .returning({ thumbnailImage: articles.thumbnailImage, blocks: articles.blocks, slug: articles.slug });
    if (!deleted) return notFound("Article");

    // saved_articles rows are removed by the foreign key's ON DELETE CASCADE
    await deleteFromS3(allImageKeys({ cover: deleted.thumbnailImage, blocks: deleted.blocks }));
    refreshArticlePages(deleted.slug);
    return NextResponse.json({ id });
  } catch (error) {
    return errorResponse(error, "Error while deleting article");
  }
}