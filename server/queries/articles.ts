import { and, desc, eq, sql } from "drizzle-orm";
import { db } from "../db";
import { savedArticles } from "../schema";

export async function getHeroArticles() {
  return db.query.articles.findMany({
    where: (t, { eq, and, inArray, lte }) => and(
      eq(t.status, "public"),
      lte(t.publishedAt, new Date()),
      inArray(t.priority, ["hero1", "hero2", "hero3"]),
    ),
    columns: {
      id: true,
      slug: true,
      title: true,
      thumbnailAlt: true,
      thumbnailImage: true,
      category: true,
      publishedAt: true,
    },
    orderBy: (t) => [
      sql`CASE ${t.priority} WHEN 'hero1' THEN 1 WHEN 'hero2' THEN 2 WHEN 'hero3' THEN 3 END`,
      desc(t.publishedAt),
    ],
    limit: 3,
  });
}

export async function getLatestArticles() {
  return db.query.articles.findMany({
    where: (t, { eq, and, lte }) => and(eq(t.status, "public"), lte(t.publishedAt, new Date())),
    columns: {
      id: true,
      slug: true,
      title: true,
      thumbnailAlt: true,
      thumbnailImage: true,
      category: true,
      publishedAt: true,
    },
    orderBy: (t, { desc }) => [desc(t.publishedAt), desc(t.id)],
    limit: 6,
  });
}

export async function getArticles() {
  return db.query.articles.findMany({
    where: (t, { eq, and, lte }) => and(eq(t.status, "public"), lte(t.publishedAt, new Date())),
    columns: {
      id: true,
      slug: true,
      title: true,
      thumbnailAlt: true,
      thumbnailImage: true,
      category: true,
      publishedAt: true,
    },
    orderBy: (t, { desc }) => [desc(t.publishedAt), desc(t.id)],
  });
}


export async function getPublicArticleBySlug(slug: string) {
  return db.query.articles.findFirst({
    where: (t, { eq, and, lte }) => and(
      eq(t.slug, slug),
      eq(t.status, "public"),
      lte(t.publishedAt, new Date()),
    ),
    columns: {
      id: true,
      slug: true,
      title: true,
      subtitle: true,
      category: true,
      publishedAt: true,
      thumbnailImage: true,
      thumbnailAlt: true,
      thumbnailDescription: true,
      thumbnailAnnotaion: true,
      blocks: true,
    },
  });
}

export async function checkIsArticleSaved(userId: string, articleId: string) {
  const savedRecord = await db.query.savedArticles.findFirst({
    where: and(
      eq(savedArticles.userId, userId),
      eq(savedArticles.articleId, articleId)
    ),
    columns: { articleId: true }
  });
  
  return !!savedRecord;
}