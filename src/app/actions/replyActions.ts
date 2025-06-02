'use server';

import { ReplyInsertData } from '@/types';
import { createReply } from '@/db/queries/replies';
import { revalidateTag, revalidatePath } from 'next/cache';
import { handleError } from '@/lib/utils';
import { validateAuthorization } from '../auth';
import { replySchema, validateFormData } from '../validation';

export async function createReplyAction(reply: ReplyInsertData): Promise<void> {
  await validateAuthorization('createReplyAction', reply.user_id);
  try {
    const validatedReply = validateFormData(reply, replySchema, 'createReplyAction');
    await createReply(validatedReply);
    revalidateTag('feedbacks');
    revalidatePath('/');
  } catch (error) {
    handleError(error, 'createReplyAction');
  }
}
