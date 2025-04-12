'use server';

import { createUpvote, deleteUpvote, getUpvoters } from '@/db/queries/upvotes';
import { revalidatePath, revalidateTag } from 'next/cache';

export async function getUpvotersAction(feedbackId: string) {
  try {
    return await getUpvoters(feedbackId);
  } catch (error) {
    console.error('Error in getUpvotersAction:', error);
    if (error instanceof Error) {
      throw new Error(`Failed to get upvoters: ${error.message}`);
    }
    throw new Error('An unexpected error occurred while getting upvoters');
  }
}

export async function createUpvoteAction(feedbackId: string, userId: string): Promise<void> {
  try {
    await createUpvote(feedbackId, userId);
    revalidateTag('feedbacks');
    revalidatePath('/');
  } catch (error) {
    console.error('Error in createUpvoteAction:', error);
    throw error instanceof Error
      ? error
      : new Error('An unexpected error occurred while creating upvote');
  }
}

export async function deleteUpvoteAction(feedbackId: string, userId: string): Promise<void> {
  try {
    await deleteUpvote(feedbackId, userId);
    revalidateTag('feedbacks');
    revalidatePath('/');
  } catch (error) {
    console.error('Error in deleteUpvoteAction:', error);
    throw error instanceof Error
      ? error
      : new Error('An unexpected error occurred while deleting upvote');
  }
}
