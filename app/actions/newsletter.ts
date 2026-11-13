'use server'
import { db } from '@/server/db';
import { users } from '@/server/schema';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { z } from "zod";
import { getCurrentUser } from "@/lib/auth";

export type ActionResult = { ok: true } | { ok: false; error: string };

/** Sets the newsletter preference to the given value (not a toggle, so it's safe to repeat). */
export async function setNewsletterOptIn(optIn: boolean): Promise<ActionResult> {
  const parsed = z.boolean().safeParse(optIn);
  if (!parsed.success) return { ok: false, error: "Invalid value" };

  const user = await getCurrentUser();
  if (!user) return { ok: false, error: "Your session expired. Log in again." };

  try {
    await db.update(users).set({ newsletterOptIn: parsed.data }).where(eq(users.id, user.id));
    revalidatePath("/account", "layout");
    return { ok: true };
  } catch (error) {
    console.error("[NEWSLETTER]", error);
    return { ok: false, error: "Couldn't save your preference. Try again." };
  }
}