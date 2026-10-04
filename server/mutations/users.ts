import { db } from '@/server/db';
import { users } from '@/server/schema';
import bcrypt from 'bcryptjs';

export async function createUser(email: string, passwordPlain: string) {
  const normalizedEmail = email.trim().toLowerCase();
  const passwordHash = await bcrypt.hash(passwordPlain, 12); 

  const [newUser] = await db
    .insert(users)
    .values({
        email: normalizedEmail,
        passwordHash,
        role: 'user',
    })
    .returning({ id: users.id, role: users.role });

  return newUser;
}