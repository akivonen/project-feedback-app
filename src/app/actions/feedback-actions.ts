'use server';
import { getFeedbackById } from '@/db/queries/feedbacks';
import { Feedback } from '@/types';

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
