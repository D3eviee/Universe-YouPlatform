import { db } from '@/server/db';
import { articles, savedArticles, users } from '@/server/schema';
import { and, desc, eq, lte } from 'drizzle-orm';

export async function getUserByEmail(email: string) {
  const normalizedEmail = email.trim().toLowerCase();
  
  const [user] = await db
    .select({ id: users.id, role: users.role })
    .from(users)
    .where(eq(users.email, normalizedEmail))
    .limit(1);

  return user;
}

// GETTING USER AND PASSWORD HASH FROM DB
export async function getUserForAuth(email: string) {
  const normalizedEmail = email.trim().toLowerCase();
  
  const [user] = await db
    .select({ 
      id: users.id, 
      passwordHash: users.passwordHash, 
      role: users.role 
    })
    .from(users)
    .where(eq(users.email, normalizedEmail))
    .limit(1);

  return user;
}

// GETTING SAVED ARTICLES FOR USER
export async function getSavedArticles(userId: string) {
  return db
    .select({
      article: {
        id: articles.id,
        slug: articles.slug,
        title: articles.title,
        category: articles.category,
        thumbnailImage: articles.thumbnailImage,
        thumbnailAlt: articles.thumbnailAlt,
      },
    })
    .from(savedArticles)
    .innerJoin(articles, eq(savedArticles.articleId, articles.id))
    .where(
      and(
        eq(savedArticles.userId, userId),
        eq(articles.status, "public"),
        lte(articles.publishedAt, new Date()),
      ),
    )
    .orderBy(desc(savedArticles.savedAt));
}

export async function getAccountInfo(userId: string) {
  return db.query.users.findFirst({
    where: eq(users.id, userId),
    columns: { email: true, newsletterOptIn: true },
  });
}