'use server';
import { CommentInsertData } from '@/types';
import { createComment } from '@/db/queries/comments';
import { revalidateTag, revalidatePath } from 'next/cache';

export async function createCommentAction(
  comment: Omit<CommentInsertData, 'user_id'>
): Promise<void> {
  try {
    const commentData = {
      ...comment,
      user_id: '21c40a49-b9f0-426f-b608-724afbc019f0',
    } as CommentInsertData;
    await createComment(commentData);
    revalidateTag('feedbacks');
    revalidatePath('/');
  } catch (error) {
    console.error('Error in createCommentAction:', error);
    throw error instanceof Error
      ? error
      : new Error('An unexpected error occurred while creating comment');
  }
}
