'use server';
import { CommentInsertData } from '@/types';
import { createComment } from '@/db/queries/comments';
import { revalidateTag, revalidatePath } from 'next/cache';

export async function createCommentAction(comment: CommentInsertData): Promise<void> {
  try {
    await createComment(comment);
    revalidateTag('feedbacks');
    revalidatePath('/');
  } catch (error) {
    console.error('Error in createCommentAction:', error);
    throw error instanceof Error
      ? error
      : new Error('An unexpected error occurred while creating comment');
  }
}
