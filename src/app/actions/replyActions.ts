'use server';
import { ReplyInsertData } from '@/types';
import { createReply } from '@/db/queries/replies';
import { revalidateTag, revalidatePath } from 'next/cache';

export async function createReplyAction(reply: Omit<ReplyInsertData, 'user_id'>): Promise<void> {
  try {
    const replyData = {
      ...reply,
      user_id: '21c40a49-b9f0-426f-b608-724afbc019f0',
    } as ReplyInsertData;
    await createReply(replyData);
    revalidateTag('feedbacks');
    revalidatePath('/');
  } catch (error) {
    console.error('Error in createReplyAction:', error);
    throw error instanceof Error
      ? error
      : new Error('An unexpected error occurred while creating reply');
  }
}
