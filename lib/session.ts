import "server-only";
import { UserRoles } from '@/types';
import { jwtVerify, SignJWT } from 'jose';
import { cookies } from 'next/headers';

const secretKey = process.env.JWT_SECRET;
if (!secretKey || secretKey.length < 32) throw new Error("JWT_SECRET must be set (32+ chars)");
const key = new TextEncoder().encode(secretKey);

interface SessionPayload {
  id: string;
  role: UserRoles
}

export async function createSession(payload: SessionPayload) {
    //EXPIERS AFTER 7 DAYS
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); 
    
    const sessionToken = await new SignJWT(payload as any)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('7d')
        .sign(key);

    const cookieStore = await cookies();
    
    cookieStore.set('session', sessionToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        expires: expiresAt,
    });
}

export async function verifySession(token: string) {
  try {
    const { payload } = await jwtVerify<SessionPayload>(token, key, {
      algorithms: ['HS256'],
    });
    
    return payload;
  } catch (error) {
    return null;
  }
}