'use server';
import { z } from "zod";
import { and, eq, lte } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "@/server/db";
import { articles, savedArticles } from "@/server/schema";
import { getCurrentUser } from "@/lib/auth";

export type SaveResult = { ok: true } | { ok: false; error: string };

const inputSchema = z.object({ articleId: z.uuid(), saved: z.boolean() });

/** Saves or unsaves an article for the current user. Setting a state, not toggling, so repeats are safe. */
export async function setArticleSavedAction(articleId: string, saved: boolean): Promise<SaveResult> {
  const parsed = inputSchema.safeParse({ articleId, saved });
  if (!parsed.success) return { ok: false, error: "Invalid request" };

  const user = await getCurrentUser();
  if (!user) return { ok: false, error: "Log in to save articles." };

  try {
    // Only public, published articles can be saved
    const article = await db.query.articles.findFirst({
      where: and(
        eq(articles.id, parsed.data.articleId),
        eq(articles.status, "public"),
        lte(articles.publishedAt, new Date()),
      ),
      columns: { slug: true },
    });
    if (!article) return { ok: false, error: "Article not found." };

    if (parsed.data.saved) {
      await db
        .insert(savedArticles)
        .values({ userId: user.id, articleId: parsed.data.articleId })
        .onConflictDoNothing(); // already saved: nothing to do
    } else {
      await db
        .delete(savedArticles)
        .where(and(eq(savedArticles.userId, user.id), eq(savedArticles.articleId, parsed.data.articleId)));
    }

    // The server decides what to refresh, based on the article itself
    revalidatePath(`/articles/${article.slug}`);
    revalidatePath("/account/saved-content");
    return { ok: true };
  } catch (error) {
    console.error("[SAVE ARTICLE]", error);
    return { ok: false, error: "Couldn't update your saved articles. Try again." };
  }
}