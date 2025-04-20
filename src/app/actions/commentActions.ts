'use server';

import { CommentInsertData } from '@/types';
import { createComment } from '@/db/queries/comments';
import { revalidateTag, revalidatePath } from 'next/cache';
import { handleError } from '@/lib/utils';
import { auth } from '../auth';

export async function createCommentAction(comment: CommentInsertData): Promise<void> {
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
