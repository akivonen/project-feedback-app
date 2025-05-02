'use server';

import { CommentInsertData } from '@/types';
import { createComment } from '@/db/queries/comments';
import { revalidateTag, revalidatePath } from 'next/cache';
import { handleError } from '@/lib/utils';
import { auth } from '../auth';
import { isValidUUID } from '@/lib/utils';

export async function createCommentAction(comment: CommentInsertData): Promise<void> {
  if (!isValidUUID(comment.feedback_id)) {
    throw new Error('Invalid feedback_id');
  }
  const session = await auth();
  if (!session) {
    throw new Error('Not authorized in createCommentAction');
  }
  try {
    await createComment(comment);
    revalidateTag('feedbacks');
    revalidatePath('/');
  } catch (error) {
    handleError(error, 'createCommentAction');
  }
}
