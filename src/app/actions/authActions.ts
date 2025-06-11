'use server';

import { createUser } from '@/db/queries/users';
import { handleError } from '@/lib/utils';
import { UserSignUpData } from '@/types';
import { signUpSchema, validateFormData } from '../validation';
import bcrypt from 'bcryptjs';
import fs from 'node:fs';

export async function signUpAction(user: UserSignUpData) {
  try {
    const validatedUser = validateFormData(user, signUpSchema, 'signUpAction');
    const hashedPassword = bcrypt.hashSync(user.password, 10);
    const { image } = user;
    let imagePath = null;
    if (image) {
      const extension = image.name.split('').pop();
      imagePath = `/images/user-images/${user.username}.${extension}`;
      const stream = fs.createWriteStream(`public/${imagePath}`);
      const bufferedImage = await image.arrayBuffer();
      stream.write(Buffer.from(bufferedImage), (error) => {
        if (error) {
          throw new Error('Saving image failed.');
        }
      });
    }
    await createUser({ ...validatedUser, password: hashedPassword, image: imagePath });
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
