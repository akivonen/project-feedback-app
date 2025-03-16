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

export async function getAllFeedbacksAction() {
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

export async function createFeedbackAction(feedback: Omit<FeedbackInsertData, 'user_id'>) {
  try {
    const feedbackData = {
      ...feedback,
      user_id: '21c40a49-b9f0-426f-b608-724afbc019f0',
    } as FeedbackInsertData;
    const result = await createFeedback(feedbackData);
    if (!result) {
      throw new Error('Creating the feedback failed');
    }
    revalidateTag('feedbacks');
    revalidatePath('/');
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Unknown error');
  }
}

export async function updateFeedbackAction(feedback: FeedbackFormData) {
  try {
    const result = await updateFeedback(feedback);
    if (!result) {
      throw new Error('Editing the feedback failed');
    }
    revalidateTag('feedbacks');
    revalidatePath('/');
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Unknown error');
  }
}

export async function deleteFeedbackAction(id: string): Promise<void> {
  try {
    const feedback = await getFeedbackById(id);
    if (!feedback) {
      throw new Error('Feedback not found');
    }
    const result = await deleteFeedback(id);
    if (!result) {
      throw new Error('Removing the feedback failed');
    }
    revalidateTag('feedbacks');
    revalidatePath('/');
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Unknown error');
  }
}
