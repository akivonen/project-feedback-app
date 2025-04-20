'use server';

import { ReplyInsertData } from '@/types';
import { createReply } from '@/db/queries/replies';
import { revalidateTag, revalidatePath } from 'next/cache';
import { handleError } from '@/lib/utils';
import { auth } from '../auth';

export async function createReplyAction(reply: ReplyInsertData): Promise<void> {
  const session = await auth();
  if (!session) {
    throw new Error('Not authorized in createCommentAction');
  }
  try {
    await createReply(reply);
    revalidateTag('feedbacks');
    revalidatePath('/');
  } catch (error) {
    handleError(error, 'createReplyAction');
  }
}
