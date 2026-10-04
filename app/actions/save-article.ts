'use server'
import { cookies } from 'next/headers';
import { db } from '@/server/db';
import { savedArticles } from '@/server/schema';
import { eq, and } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { verifySession } from '@/lib/session';

export async function toggleSaveArticleAction(articleId: string, currentPath: string) {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get('session');
    if (!sessionCookie) return { error: 'Unauthorized' };
    
    const session = await verifySession(sessionCookie.value);
    if (!session?.id) return { error: 'Unauthorized' };
    const userId = session.id as string;

    try {
        const existingSave = await db.query.savedArticles.findFirst({
            where: and(
                eq(savedArticles.userId, userId),
                eq(savedArticles.articleId, articleId)
            )
        });
        
        if (existingSave) {
            // --- IF ALREADY SAVED -> UNSAVE ---
            await db.delete(savedArticles).where(
                and(
                    eq(savedArticles.userId, userId),
                    eq(savedArticles.articleId, articleId)
                )
            );
        } 
        // --- IF NOT -> SAVE ---
        else 
            await db.insert(savedArticles).values({userId, articleId });
    
        revalidatePath(currentPath);
        return { success: true };
    } catch (error) {
        return { error: 'Failed to toggle save state' };
    }
}