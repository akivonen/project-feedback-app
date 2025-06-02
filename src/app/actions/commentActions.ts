'use server';

import { CommentInsertData } from '@/types';
import { createComment } from '@/db/queries/comments';
import { revalidateTag, revalidatePath } from 'next/cache';
import { handleError } from '@/lib/utils';
import { validateAuthorization } from '../auth';
import { commentSchema, validateFormData } from '../validation';

export async function createCommentAction(comment: CommentInsertData): Promise<void> {
  await validateAuthorization('createCommentAction', comment.user_id);
  try {
    const validatedComment = validateFormData(comment, commentSchema, 'createCommentAction');
    await createComment(validatedComment);
    revalidateTag('feedbacks');
    revalidatePath('/');
  } catch (error) {
    handleError(error, 'createCommentAction');
  }
}
