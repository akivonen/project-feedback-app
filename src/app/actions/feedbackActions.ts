'use server';
import {
  getAllFeedbacks,
  getFeedbackById,
  createFeedback,
  deleteFeedback,
  updateFeedback,
} from '@/db/queries/feedbacks';
import { handleError } from '@/lib/utils';
import { Feedback, FeedbackFormData, FeedbackInsertData } from '@/types';
import { revalidatePath, revalidateTag } from 'next/cache';

export async function getAllFeedbacksAction(): Promise<Feedback[]> {
  try {
    return await getAllFeedbacks();
  } catch (error) {
    handleError(error, 'getAllFeedbackAction');
  }
}

export async function getFeedbackByIdAction(id: string): Promise<Feedback> {
  try {
    return await getFeedbackById(id);
  } catch (error) {
    handleError(error, 'getFeedbackById');
  }
}

export async function createFeedbackAction(feedback: FeedbackInsertData): Promise<void> {
  try {
    await createFeedback(feedback);
    revalidateTag('feedbacks');
    revalidatePath('/');
  } catch (error) {
    handleError(error, 'createFeedbackAction');
  }
}

export async function updateFeedbackAction(feedback: FeedbackFormData): Promise<void> {
  try {
    await updateFeedback(feedback);
    revalidateTag('feedbacks');
    revalidatePath('/');
  } catch (error) {
    handleError(error, 'updateFeedbackAction');
  }
}

export async function deleteFeedbackAction(id: string): Promise<void> {
  try {
    await deleteFeedback(id);
    revalidateTag('feedbacks');
    revalidatePath('/');
  } catch (error) {
    handleError(error, 'deleteFeedbackAction');
  }
}
