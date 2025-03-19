'use server';
import db from '../index';
import { comments } from '../schema';
import { CommentInsertData } from '@/types';

export const createComment = async (comment: CommentInsertData) => {
  try {
    const [result] = await db.insert(comments).values(comment).returning();
    if (!result) {
      throw new Error('Failed to insert comment in database');
    }
    return result;
  } catch (error) {
    console.error('Database error in createComment:', error);
    if (error instanceof Error) {
      throw new Error(`Database operation failed: ${error.message}`);
    }
    throw new Error('An unexpected error occured while creating comment');
  }
};
