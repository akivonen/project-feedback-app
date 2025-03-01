'use server';
import { getAllFeedbacks, getFeedbackById } from '@/db/queries/feedbacks';
import { Feedback } from '@/types';

export async function getFeedbacksAction() {
  try {
    const feedbacks = await getAllFeedbacks();
    if (!feedbacks) {
      return [];
    }
    return feedbacks;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Unknown error');
  }
}

export async function getFeedbackByIdAction(id: string): Promise<Feedback | null> {
  try {
    const feedback = await getFeedbackById(id);
    if (!feedback) {
      return null;
    }
    return feedback;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Unknown error');
  }
}
