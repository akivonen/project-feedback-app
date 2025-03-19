'use server';
import db from '../index';
import { replies } from '../schema';
import { ReplyInsertData } from '@/types';

export const createReply = async (reply: ReplyInsertData) => {
  try {
    const [result] = await db.insert(replies).values(reply).returning();
    if (!result) {
      throw new Error('Failed to insert reply in database');
    }
    return result;
  } catch (error) {
    console.error('Database error in createReply:', error);
    if(error instanceof Error) {
      throw new Error(`Database operation failed: ${error.message}`)
    }
    throw new Error('An unexpected error occured while creating reply')
  }
};
