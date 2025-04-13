'use server';
import db from '../index';
import { feedbacks } from '../schema';
import { eq } from 'drizzle-orm';
import { unstable_cache } from 'next/cache';
import { cache } from 'react';
import { Feedback, FeedbackInsertData, FeedbackFormData } from '@/types';
import { handleError } from '@/lib/utils';

export const getAllFeedbacks = unstable_cache(
  cache(async (): Promise<Feedback[]> => {
    try {
      return await db.query.feedbacks.findMany({
        with: {
          user: true,
          upvotes: true,
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
    } catch (error) {
      handleError(error, 'getAllFeedbacks', 'Database');
    }
  }),
  ['feedbacks'],
  { revalidate: 600, tags: ['feedbacks'] }
);

export const getFeedbackById = async (feedbackId: string): Promise<Feedback> => {
  try {
    const [feedback] = await db.query.feedbacks.findMany({
      with: {
        user: true,
        upvotes: true,
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
    handleError(error, 'getFeedbackById', 'Database');
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
    handleError(error, 'createFeedback', 'Database');
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
    handleError(error, 'updateFeedback', 'Database');
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
    handleError(error, 'deleteFeedback', 'Database');
  }
};
