'use server';

import {
  getAllFeedbacks,
  getFeedbackById,
  createFeedback,
  deleteFeedback,
  updateFeedback,
} from '@/db/queries/feedbacks';

import { Feedback, FeedbackFormData, FeedbackInsertData } from '@/types';
import { revalidatePath, revalidateTag } from 'next/cache';

export async function getAllFeedbacksAction(): Promise<Feedback[]> {
  try {
    return await getAllFeedbacks();
  } catch (error) {
    console.error('Error in getAllFeedbacksAction:', error);
    if (error instanceof Error) {
      throw new Error(`Failed to get all feedbacks: ${error.message}`);
    }
    throw new Error('An unexpected error occurred while getting all feedbacks');
  }
}

export async function getFeedbackByIdAction(id: string): Promise<Feedback> {
  try {
    return await getFeedbackById(id);
  } catch (error) {
    console.error('Error in getFeedbackByIdAction:', error);
    if (error instanceof Error) {
      throw new Error(`Failed to get feedback by id: ${error.message}`);
    }
    throw new Error(`An unexpected error occurred while getting feedback by id`);
  }
}

export async function createFeedbackAction(
  feedback: Omit<FeedbackInsertData, 'user_id'>
): Promise<void> {
  try {
    const feedbackData = {
      ...feedback,
      user_id: '21c40a49-b9f0-426f-b608-724afbc019f0', //implement auth
    } as FeedbackInsertData;
    await createFeedback(feedbackData);
    revalidateTag('feedbacks');
    revalidatePath('/');
  } catch (error) {
    console.error('Error in createFeedbackAction:', error);
    throw error instanceof Error
      ? error
      : new Error('An unexpected error occurred while creating feedback');
  }
}

export async function updateFeedbackAction(feedback: FeedbackFormData): Promise<void> {
  try {
    await updateFeedback(feedback);
    revalidateTag('feedbacks');
    revalidatePath('/');
  } catch (error) {
    console.error('Error in updateFeedbackAction:', error);
    throw error instanceof Error
      ? error
      : new Error('An unexpected error occurred while updating feedback');
  }
}

export async function deleteFeedbackAction(id: string): Promise<void> {
  try {
    await deleteFeedback(id);
    revalidateTag('feedbacks');
    revalidatePath('/');
  } catch (error) {
    console.error('Error in deleteFeedbackAction:', error);
    throw error instanceof Error
      ? error
      : new Error('An unexpected error occurred while deleting feedback');
  }
}
