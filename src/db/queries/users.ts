'server-only';
import db from '..';
import { User } from '@/types';
import { users } from '../schema';
import { eq } from 'drizzle-orm';
import { UserSignUpData } from '@/types';
import { handleError } from '@/lib/utils';

export const createUser = (user: UserSignUpData) => {
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

export const getUserByUsername = (username: string): Promise<User | undefined> => {
  try {
    const user = db.query.users.findFirst({
      where: eq(users.username, username),
    });
    return user;
  } catch (error) {
    handleError(error, 'getUserByUsername', 'Database');
  }
};
