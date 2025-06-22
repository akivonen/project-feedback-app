'use server';

import { createUser } from '@/db/queries/users';
import { handleError } from '@/lib/utils';
import { UserSignUpData } from '@/types';
import { signUpSchema, validateFormData } from '../validation';
import bcrypt from 'bcryptjs';
import handleImage from '@/lib/handleImage';
import { revalidatePath } from 'next/cache';

export async function signUpAction(user: UserSignUpData): Promise<void> {
  try {
    const validatedUser = validateFormData(user, signUpSchema, 'signUpAction');
    const hashedPassword = bcrypt.hashSync(user.password, 10);
    const imagePath = validatedUser.image
      ? await handleImage({ image: validatedUser.image, username: user.username })
      : null;
    await createUser({ ...validatedUser, password: hashedPassword, image: imagePath });
    revalidatePath('/[[...filter]]', 'page');
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
