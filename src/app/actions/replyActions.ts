'use server';

import { ReplyInsertData } from '@/types';
import { createReply } from '@/db/queries/replies';
import { revalidateTag, revalidatePath } from 'next/cache';

export async function createReplyAction(reply: ReplyInsertData): Promise<void> {
  try {
    await createReply(reply);
    revalidateTag('feedbacks');
    revalidatePath('/');
  } catch (error) {
    console.error('Error in createReplyAction:', error);
    throw error instanceof Error
      ? error
      : new Error('An unexpected error occurred while creating reply');
  }
}
