import db from '..';
import { User } from '@/types';
import { users } from '../schema';
import { eq } from 'drizzle-orm';
import { UserSignUpData } from '@/types/user';

export const getUserByUsername = (username: string): Promise<User | undefined> => {
  const user = db.query.users.findFirst({
    where: eq(users.username, username),
  });
  return user;
};

export const createUser = (user: UserSignUpData) => {
  try {
    const result = db.insert(users).values(user).returning();
    if (!result) {
      throw new Error('Failed to insert user into database');
    }
    return result;
  } catch (error) {
    console.error('Database error in createUser:', error);
    if (error instanceof Error) {
      throw new Error(`Database operation failed: ${error.message}`);
    }
    throw new Error('An unexpected error occured while creating user');
  }
};
