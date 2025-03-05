'use server';
import { getAllFeedbacks, getFeedbackById, addFeedback } from '@/db/queries/feedbacks';
import { Feedback, FeedbackInsertData } from '@/types';
import { revalidateTag } from 'next/cache';

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

export async function addFeedbackAction(feedback: Omit<FeedbackInsertData, 'user_id'>) {
  try {
    const feedbackData = {
      ...feedback,
      user_id: '21c40a49-b9f0-426f-b608-724afbc019f0',
    } as FeedbackInsertData;
    const result = await addFeedback(feedbackData);
    if (!result) {
      return { success: false };
    }
    revalidateTag('feedbacks');
    return { success: true };
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Unknown error');
  }
}
