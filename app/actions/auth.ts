'use server';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import bcrypt from 'bcrypt';
import { getUserByEmail, getUserForAuth } from '@/server/queries/users';
import { createSession } from '@/lib/session';
import { createUser } from '@/server/mutations/users';

// --- CHEKING WHETHER USER WITH EMAIL-ALREDY EXISTS ---
export async function checkEmailExists(email: string) {
  if (!email || typeof email !== 'string') 
    return { exists: false, error: 'Incorrect email.' };
  try {
    const user = await getUserByEmail(email);
    return { exists: !!user };
  } catch (error) {
    console.error('[AUTH ERROR]', error);
    throw new Error('Server error occured. Try later.');
  }
}

// ---LOG-IN ---
export async function loginAction(email: string, passwordPlain: string, requireDashboardAccess: boolean = false) {
  if (!email || !passwordPlain) return { error: 'Email and password are required.'};

  try {
    const user = await getUserForAuth(email);
    if (!user) return { error: 'Incorrect credendials.' };

    const isValidPassword = await bcrypt.compare(passwordPlain, user.passwordHash);
    if (!isValidPassword) return { error: 'Incorrect credendials.' };

    // --- ROLE VERIFICATION ---
    if (requireDashboardAccess && user.role !== 'admin') 
      return { error: 'Access denied. No permission.' };

    // SESSION CREATION
    await createSession({ id: user.id, role: user.role });
    return { success: true };
  } catch (error) {
    console.error('[LOGIN ERROR]', error);
    return { error: 'Server error occured. Try later.' };
  }
}

// --- SIGN-UP ---
export async function registerAction(email: string, passwordPlain: string) {
  if (!email || !passwordPlain) return { error: 'Email and password are required.'};

  if (passwordPlain.length < 8) 
    return { error: 'Password must be at least 8 characters long.' };
  if (passwordPlain.length > 32) 
    return { error: 'Password is too long.' };
  if (!/[A-Z]/.test(passwordPlain) || !/[0-9]/.test(passwordPlain)) 
    return { error: 'Password must contain at least one uppercase letter and one number.' };

  try {
    const newUser = await createUser(email, passwordPlain);
    await createSession({ id: newUser.id, role: newUser.role });
    return { success: true };
  } catch (error: any) {
    // 23505 - unique code for breaking the UNIQUE PostgreSQL rule
    if (error.code === '23505') return { error: 'Account with this email address already exists.' };
    
    console.error('[REGISTER ERROR]', error);
    return { error: 'Server error occured. Try later.' };
  }
}

// --- LOG-OUT ---
export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete('session');
  redirect('/');
}

