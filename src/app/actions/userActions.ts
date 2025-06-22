'use server';

import { changeUserPassword, getUserById, updateUser } from '@/db/queries/users';
import {
  User,
  UserProfileProps,
  UpdateUserProfileActionProps,
  ChangeUserPasswordProps,
} from '@/types';
import { handleError, isValidUUID } from '@/lib/utils';
import { validateAuthorization } from '../auth';
import { validateFormData } from '../validation';
import { changePasswordServerSchema, profileUpdateServerSchema } from '../validation/user';
import handleImage from '@/lib/handleImage';
import bcrypt from 'bcryptjs';
import { revalidatePath } from 'next/cache';

export async function getUserByIdAction(id: string): Promise<UserProfileProps | null> {
  if (!isValidUUID(id)) {
    throw new Error('Invalid userId');
  }
  validateAuthorization('getUserByIdAction', id);
  try {
    const user: User | null = await getUserById(id);
    if (!user) {
      return null;
    }
    return {
      id: user.id,
      name: user.name,
      username: user.username,
      image: user.image,
    };
  } catch (error) {
    handleError(error, 'getUserByIdAction');
  }
}

export async function updateUserProfileAction(user: UpdateUserProfileActionProps): Promise<void> {
  if (!isValidUUID(user.id)) {
    throw new Error('Invalid userId');
  }
  validateAuthorization('getUserByIdAction', user.id);
  try {
    const validatedUser = validateFormData(user, profileUpdateServerSchema, 'updateUserProfile');
    const updatedUser = {
      id: validatedUser.id,
      name: validatedUser.name,
    };
    const imagePath = validatedUser.image
      ? await handleImage({
          image: validatedUser.image,
          username: validatedUser.username,
        })
      : null;
    await updateUser(imagePath ? { ...updatedUser, image: imagePath } : updatedUser);
    revalidatePath('/[[...filter]]', 'page');
  } catch (error) {
    handleError(error, 'updateUserProfile');
  }
}

export async function changeUserPasswordAction(user: ChangeUserPasswordProps): Promise<void> {
  if (!isValidUUID(user.id)) {
    throw new Error('Invalid userId');
  }
  validateAuthorization('changeUserPasswordAction', user.id);
  try {
    const validatedUser = validateFormData(user, changePasswordServerSchema, 'updateUserProfile');
    const currentUser = await getUserById(user.id);
    if (!currentUser) {
      throw new Error('User not found');
    }
    if (!bcrypt.compareSync(validatedUser.oldPassword, currentUser.password)) {
      throw new Error('Current password is incorrect');
    }
    const hashedPassword = bcrypt.hashSync(validatedUser.newPassword, 10);
    await changeUserPassword({ id: validatedUser.id, password: hashedPassword });
    revalidatePath('/[[...filter]]', 'page');
  } catch (error) {
    if (error instanceof Error && error.message === 'Current password is incorrect') {
      throw error;
    }
    handleError(error, 'changeUserPasswordAction');
  }
}
