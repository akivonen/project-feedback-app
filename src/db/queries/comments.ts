'use server';
import { handleError } from '@/lib/utils';
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
    handleError(error, 'createComment', 'Database');
  }
};
