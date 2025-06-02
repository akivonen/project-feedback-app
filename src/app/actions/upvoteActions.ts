'use server';

import { createUpvote, deleteUpvote, getUpvoters } from '@/db/queries/upvotes';
import { revalidatePath, revalidateTag } from 'next/cache';
import { Upvote } from '@/types';
import { isValidUUID } from '@/lib/utils';
import { validateAuthorization } from '../auth';

export async function getUpvotersAction(feedbackId: string): Promise<Upvote[]> {
  if (!isValidUUID(feedbackId)) {
    throw new Error('Invalid feedbackId');
  }
  try {
    const result = getUpvoters(feedbackId);
    if (!result) {
      return [];
    }
    return result;
  } catch (error) {
    console.error('Error in getUpvotersAction:', error);
    throw error;
  }
}

export async function createUpvoteAction(feedbackId: string, userId: string): Promise<void> {
  if (!isValidUUID(feedbackId) || !isValidUUID(userId)) {
    throw new Error('Invalid feedbackId or userId');
  }
  await validateAuthorization('createUpvoteAction', userId);
  try {
    await createUpvote(feedbackId, userId);
    revalidateTag('feedbacks');
    revalidatePath('/');
  } catch (error) {
    console.error('Error in createUpvoteAction:', error);
    throw error;
  }
}

export async function deleteUpvoteAction(feedbackId: string, userId: string): Promise<void> {
  if (!isValidUUID(feedbackId) || !isValidUUID(userId)) {
    throw new Error('Invalid feedbackId or userId');
  }
  await validateAuthorization('deleteUpvoteAction', userId);
  try {
    await deleteUpvote(feedbackId, userId);
    revalidateTag('feedbacks');
    revalidatePath('/');
  } catch (error) {
    console.error('Error in deleteUpvoteAction:', error);
    throw error;
  }
}
