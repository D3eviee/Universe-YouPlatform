'use server';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import bcrypt from 'bcrypt';
import { z } from 'zod';
import { eq } from 'drizzle-orm';
import { db } from '@/server/db';
import { users } from '@/server/schema';


export type AuthState = 
  | { success: true; message?: string }
  | { success: false; error: string }
  | null;

const LoginSchema = z.object({
  email: z.string().email('Niepoprawny format e-mail'),
  password: z.string().min(1, 'Wprowadź hasło'),
});

// LOG OUT FUNCTION
export async function loginAction( prevState: AuthState, formData: FormData) : Promise<AuthState> {
  const parsed = LoginSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  });

  if (!parsed.success) return { success: false, error: 'Provide correct data.' };
  const { email, password } = parsed.data;

  try {
    // GETTING USER FROM DB
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    if (!user) return { success: false, error: 'Password or email is incorrect' };
    

    // PASSWORD CHECK
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) return { success: false, error: 'Password or email is incorrect' };

    // SETTING COOKIE
    const cookieStore = await cookies();
    cookieStore.set('auth-token', user.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    });

  } catch (error) {
    console.error('[Login Action Error]:', error);
    return { success: false, error: 'Server error. Trry again.' };
  }

  redirect('/dashboard');
}

// LOG OUT FUNCTION
export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete('auth-token');
  redirect('/dashboard/auth');
}