'use server';
import db from '../index';
import { feedbacks } from '../schema';
import { eq } from 'drizzle-orm';
import { Feedback, FeedbackInsertData, FeedbackFormData } from '@/types';
import { unstable_cache } from 'next/cache';
import { cache } from 'react';

export const getAllFeedbacks = unstable_cache(
  cache(async (): Promise<Feedback[]> => {
    try {
      const result = await db.query.feedbacks.findMany({
        with: {
          user: true,
          comments: {
            with: {
              user: true,
              replies: {
                with: {
                  user: true,
                },
              },
            },
          },
        },
      });
      return result;
    } catch (error) {
      console.error('Database error in getAllFeedbacks:', error);
      if (error instanceof Error) {
        throw new Error(`Failed to fetch feedbacks: ${error.message}`);
      }
      throw new Error('An unexpected error occurred while fetching feedbacks');
    }
  }),
  ['feedbacks'],
  { revalidate: 600, tags: ['feedbacks'] }
);

export const getFeedbackById = async (feedbackId: string): Promise<Feedback> => {
  try {
    const [feedback] = await db.query.feedbacks.findMany({
      with: {
        comments: {
          with: {
            user: true,
            replies: {
              with: {
                user: true,
              },
            },
          },
        },
      },
      where: eq(feedbacks.id, feedbackId),
    });
    return feedback;
  } catch (error) {
    console.error('Database error in getFeedbackById:', error);
    if (error instanceof Error) {
      throw new Error(`Failed to fetch feedback: ${error.message}`);
    }
    throw new Error('An unexpected error occurred while fetching feedback');
  }
};

export const createFeedback = async (feedback: FeedbackInsertData) => {
  try {
    const [result] = await db.insert(feedbacks).values(feedback).returning();
    if (!result) {
      throw new Error('Failed to insert feedback into database');
    }
    return result;
  } catch (error) {
    console.error('Database error in createFeedback:', error);
    if (error instanceof Error) {
      throw new Error(`Database operation failed: ${error.message}`);
    }
    throw new Error('An unexpected error occured while creating feedback');
  }
};

export const updateFeedback = async (feedback: FeedbackFormData) => {
  try {
    const { id, title, category, status, description } = feedback;
    const [result] = await db
      .update(feedbacks)
      .set({ title, category, status, description })
      .where(eq(feedbacks.id, id))
      .returning();

    if (!result) {
      throw new Error('Failed to update feedback in database');
    }
    return result;
  } catch (error) {
    console.error('Database error in updateFeedback:', error);
    if (error instanceof Error) {
      throw new Error(`Database operation failed ${error.message}`);
    }
    throw new Error('An unexpected error occured while updating feedback');
  }
};

export const deleteFeedback = async (id: string) => {
  try {
    const [result] = await db.delete(feedbacks).where(eq(feedbacks.id, id)).returning();
    if (!result) {
      throw new Error('Failed to delete feedback from database');
    }
    return result;
  } catch (error) {
    console.error('Database error in deleteFeedback:', error);
    if (error instanceof Error) {
      throw new Error(`Database operation failed ${error.message}`);
    }
    throw new Error('An unexpected error occured while deleting feedback');
  }
};
