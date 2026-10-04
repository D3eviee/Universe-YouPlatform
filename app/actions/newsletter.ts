'use server'
import { cookies } from 'next/headers';
import { db } from '@/server/db';
import { users } from '@/server/schema';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { verifySession } from '@/lib/session';

export async function subscribeToNewsletterAction() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get('session');
  if (!sessionCookie) return { error: 'Unauthorized' };

  const session = await verifySession(sessionCookie.value);
  if (!session?.id) return { error: 'Unauthorized' };

  try {
    await db.update(users)
      .set({ newsletterOptIn: true })
      .where(eq(users.id, session.id as string));

    revalidatePath('/account/membership'); 
    return { success: true };
  } catch (error) {
    return { error: 'Failed to subscribe' };
  }
}

export async function toggleNewsletterAction(currentOptInStatus: boolean) {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get('session');
  if (!sessionCookie) return { error: 'Unauthorized' };

  const session = await verifySession(sessionCookie.value);
  if (!session?.id) return { error: 'Unauthorized' };

  try {
    await db.update(users)
      .set({ newsletterOptIn: !currentOptInStatus })
      .where(eq(users.id, session.id as string));
    
      revalidatePath('/account'); 
    return { success: true };
  } catch (error) {
    return { error: 'Failed to update newsletter preferences' };
  }
}