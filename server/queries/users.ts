import { db } from '@/server/db';
import { savedArticles, users } from '@/server/schema';
import { eq } from 'drizzle-orm';


export async function getUserByEmail(email: string) {
  const normalizedEmail = email.trim().toLowerCase();
  
  const [user] = await db
    .select({ id: users.id, role: users.role })
    .from(users)
    .where(eq(users.email, normalizedEmail))
    .limit(1);

  return user;
}


// GETTING PASSWORD HASH FROM DB
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
  return await db.query.savedArticles.findMany({
    where: eq(savedArticles.userId, userId),
    with: {
      article: {
        columns: {
          id: true,
          title: true,
          category: true,
          slug: true,
          thumbnailImage: true,
          thumbnailDescription: true,
          thumbnailAnnotaion: true,
          thumbnailAlt: true,
          publishedAt: true,
        }
      }
    },
    orderBy: (savedArticles, { desc }) => [desc(savedArticles.savedAt)],
  });
}