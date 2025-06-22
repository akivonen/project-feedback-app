'server-only';
import db from '..';
import { User } from '@/types';
import { users } from '../schema';
import { eq } from 'drizzle-orm';
import { UserInsertData } from '@/types';
import { handleError } from '@/lib/utils';
import { UpdateUserProfileProps } from '@/types/user';

export const createUser = async (user: UserInsertData) => {
  try {
    const result = db.insert(users).values(user).returning();
    if (!result) {
      throw new Error('Failed to insert user into database');
    }
    return result;
  } catch (error) {
    handleError(error, 'createUser', 'Database');
  }
};

export const getUserByUsername = async (username: string): Promise<User | null> => {
  try {
    const user = await db.query.users.findFirst({
      where: eq(users.username, username),
    });
    return user ?? null;
  } catch (error) {
    handleError(error, 'getUserByUsername', 'Database');
  }
};

export const getUserById = async (id: string): Promise<User | null> => {
  try {
    const user = await db.query.users.findFirst({
      where: eq(users.id, id),
    });
    return user ?? null;
  } catch (error) {
    handleError(error, 'getUserById', 'Database');
  }
};

export const updateUser = async (user: UpdateUserProfileProps): Promise<User | never> => {
  try {
    const [result] = await db.update(users).set(user).where(eq(users.id, user.id)).returning();
    if (!result) {
      throw new Error('Failed to update user in database');
    }
    return result;
  } catch (error) {
    handleError(error, 'updateUser', 'Database');
  }
};

export const changeUserPassword = async (user: {
  id: string;
  password: string;
}): Promise<User | never> => {
  try {
    const [result] = await db
      .update(users)
      .set({ password: user.password })
      .where(eq(users.id, user.id))
      .returning();
    if (!result) {
      throw new Error('Failed to change user password in database');
    }
    return result;
  } catch (error) {
    handleError(error, 'changeUserPassword', 'Database');
  }
};
