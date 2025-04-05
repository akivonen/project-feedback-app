'use server';

import { createUser } from '@/db/queries/users';
import { UserSignUpData } from '@/types';
import bcrypt from 'bcryptjs';

export async function signUpAction(user: UserSignUpData) {
  try {
    const hashedPassword = bcrypt.hashSync(user.password, 10);
    await createUser({ ...user, password: hashedPassword });
    // revalidatePath('/');
  } catch (error) {
    if (
      error instanceof Error &&
      error.message === 'duplicate key value violates unique constraint "users_username_key"'
    ) {
      throw new Error('Username already taken. Please choose other username.');
    }
    console.error('Error in signUpAction:', error);
    throw error instanceof Error
      ? error
      : new Error('An unexpected error occurred while creating user');
  }
}
