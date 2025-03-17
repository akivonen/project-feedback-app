'use server';
import db from '../index';
import { comments } from '../schema';
import { CommentInsertData } from '@/types';

export const createComment = async (comment: CommentInsertData) => {
  const [result] = await db.insert(comments).values(comment).returning();
  return result;
};
