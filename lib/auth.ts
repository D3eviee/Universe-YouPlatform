'server-only'
import { cookies } from 'next/headers';
import { verifySession } from './session';
import { NextResponse } from 'next/server';

export async function getCurrentUser() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get('session');
  if (!sessionCookie) return null;
  
  const session = await verifySession(sessionCookie.value);
  return session?.id ? session : null;
}

export async function requireAdmin() {
  const user = await getCurrentUser();
  if (!user) return { ok: false, status: 401 } as const;
  if (user.role !== "admin") return { ok: false, status: 403 } as const;
  return { ok: true, user } as const;
}

export const forbidden = () => NextResponse.json({ error: "Forbidden" }, { status: 403 });