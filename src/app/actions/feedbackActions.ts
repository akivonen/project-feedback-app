'use server';

import {
  getAllFeedbacks,
  getFeedbackById,
  createFeedback,
  deleteFeedback,
  updateFeedback,
} from '@/db/queries/feedbacks';
import { handleError, isValidUUID } from '@/lib/utils';
import { Feedback, FeedbackFormData, FeedbackInsertData } from '@/types';
import { revalidatePath, revalidateTag } from 'next/cache';
import { auth } from '../auth';

export async function getAllFeedbacksAction(): Promise<Feedback[]> {
  try {
    return await getAllFeedbacks();
  } catch (error) {
    handleError(error, 'getAllFeedbackAction');
  }
}

export async function getFeedbackByIdAction(id: string): Promise<Feedback | null> {
  if (!isValidUUID(id)) {
    console.error('Invalid feedbackId');
    return null;
  }
  try {
    return await getFeedbackById(id);
  } catch (error) {
    handleError(error, 'getFeedbackById');
  }
}

export async function createFeedbackAction(feedback: FeedbackInsertData): Promise<void> {
  const session = await auth();
  if (!session) {
    throw new Error('Not authorized in createFeedbackAction');
  }
  try {
    await createFeedback(feedback);
    revalidateTag('feedbacks');
    revalidatePath('/');
  } catch (error) {
    handleError(error, 'createFeedbackAction');
  }
}

export async function updateFeedbackAction(feedback: FeedbackFormData): Promise<void> {
  const session = await auth();
  if (!session || session?.user?.id !== feedback.user_id) {
    throw new Error('Not authorized in updateFeedbackAction');
  }
  try {
    await updateFeedback(feedback);
    revalidateTag('feedbacks');
    revalidatePath('/');
  } catch (error) {
    handleError(error, 'updateFeedbackAction');
  }
}

export async function deleteFeedbackAction(id: string, userId: string): Promise<void> {
  const session = await auth();
  if (!session || session?.user?.id !== userId) {
    throw new Error('Not authorized in deleteFeedbackAction');
  }
  try {
    await deleteFeedback(id);
    revalidateTag('feedbacks');
    revalidatePath('/');
  } catch (error) {
    handleError(error, 'deleteFeedbackAction');
  }
}
