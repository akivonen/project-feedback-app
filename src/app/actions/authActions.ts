'use server';

import { createUser } from '@/db/queries/users';
import { handleError } from '@/lib/utils';
import { UserSignUpData } from '@/types';
import bcrypt from 'bcryptjs';

export async function signUpAction(user: UserSignUpData) {
  try {
    const hashedPassword = bcrypt.hashSync(user.password, 10);
    await createUser({ ...user, password: hashedPassword });
  } catch (error) {
    if (
      error instanceof Error &&
      error.message === 'duplicate key value violates unique constraint "users_username_key"'
    ) {
      throw new Error('Username already taken. Please choose other username.');
    }
    handleError(error, 'signUpAction');
  }
}
