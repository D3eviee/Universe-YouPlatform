import "server-only";
import { cache } from "react";
import { redirect } from "next/navigation";
import { cookies } from 'next/headers';
import { verifySession } from './session';
import { NextResponse } from 'next/server';

/** The logged-in user's session, or null. cache(): runs once per request, however often it's called. */
export const getCurrentUser = cache(async () => {
  const token = (await cookies()).get("session")?.value;
  if (!token) return null;
  const session = await verifySession(token);
  return session?.id ? session : null;
});

/** For pages: the logged-in user, or a redirect to /login. */
export async function requireUser() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  return user;
}

export async function requireAdmin() {
  const user = await getCurrentUser();
  if (!user) return { ok: false, status: 401 } as const;
  if (user.role !== "admin") return { ok: false, status: 403 } as const;
  return { ok: true, user } as const;
}