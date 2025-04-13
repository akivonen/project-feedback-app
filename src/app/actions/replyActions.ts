'use server';

import { ReplyInsertData } from '@/types';
import { createReply } from '@/db/queries/replies';
import { revalidateTag, revalidatePath } from 'next/cache';
import { handleError } from '@/lib/utils';

export async function createReplyAction(reply: ReplyInsertData): Promise<void> {
  try {
    await createReply(reply);
    revalidateTag('feedbacks');
    revalidatePath('/');
  } catch (error) {
    handleError(error, 'createReplyAction');
  }
}
