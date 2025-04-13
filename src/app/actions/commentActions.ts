'use server';
import { CommentInsertData } from '@/types';
import { createComment } from '@/db/queries/comments';
import { revalidateTag, revalidatePath } from 'next/cache';
import { handleError } from '@/lib/utils';

export async function createCommentAction(comment: CommentInsertData): Promise<void> {
  try {
    await createComment(comment);
    revalidateTag('feedbacks');
    revalidatePath('/');
  } catch (error) {
    handleError(error, 'createCommentAction');
  }
}
