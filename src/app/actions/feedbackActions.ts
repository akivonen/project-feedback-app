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
import { validateAuthorization } from '../auth';
import {
  feedbackInsertServerSchema,
  feedbackUpdateServerSchema,
  validateFormData,
} from '../validation';

export async function getAllFeedbacksAction(): Promise<Feedback[]> {
  try {
    return await getAllFeedbacks();
  } catch (error) {
    handleError(error, 'getAllFeedbackAction');
  }
}

export async function getFeedbackByIdAction(id: string): Promise<Feedback | null> {
  try {
    if (!isValidUUID(id)) {
      console.error('Invalid feedbackId');
      throw new Error('Invalid feedbackId');
    }
    return await getFeedbackById(id);
  } catch (error) {
    handleError(error, 'getFeedbackById');
  }
}

export async function createFeedbackAction(feedback: FeedbackInsertData): Promise<string | null> {
  try {
    await validateAuthorization('createFeedbackAction', feedback.user_id);
    const validatedFeedback = validateFormData(
      feedback,
      feedbackInsertServerSchema,
      'createFeedbackAction'
    );
    const { id } = await createFeedback(validatedFeedback);
    revalidateTag('feedbacks');
    return id || null;
  } catch (error) {
    handleError(error, 'createFeedbackAction');
  }
}

export async function updateFeedbackAction(feedback: FeedbackFormData): Promise<void> {
  await validateAuthorization('updateFeedbackAction', feedback.user_id);
  try {
    const validatedFeedback = validateFormData(
      feedback,
      feedbackUpdateServerSchema,
      'updateFeedbackAction'
    );
    await updateFeedback(validatedFeedback);
    revalidateTag('feedbacks');
  } catch (error) {
    handleError(error, 'updateFeedbackAction');
  }
}

export async function deleteFeedbackAction(id: string, userId: string): Promise<void> {
  if (!isValidUUID(id) || !isValidUUID(userId)) {
    throw new Error('Invalid feedbackId or userId');
  }
  await validateAuthorization('deleteFeedbackAction', userId);
  try {
    await deleteFeedback(id);
    revalidateTag('feedbacks');
    revalidatePath('/');
  } catch (error) {
    handleError(error, 'deleteFeedbackAction');
  }
}
