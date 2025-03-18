'use server';
import db from '../index';
import { feedbacks } from '../schema';
import { eq } from 'drizzle-orm';
import { Feedback, FeedbackInsertData, FeedbackFormData } from '@/types';
import { unstable_cache } from 'next/cache';
import { cache } from 'react';

export const getAllFeedbacks = unstable_cache(
  // error handling
  cache(async (): Promise<Feedback[]> => {
    return await db.query.feedbacks.findMany({
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
  }),
  ['feedbacks'],
  { revalidate: 600, tags: ['feedbacks'] }
);

export const getFeedbackById = async (feedbackId: string): Promise<Feedback> => {
  // error handling
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
  const { id, title, category, status, description } = feedback;
  const result = await db
    .update(feedbacks)
    .set({ title, category, status, description })
    .where(eq(feedbacks.id, id))
    .returning();
  return result;
};

export const deleteFeedback = async (id: string) => {
  const [result] = await db.delete(feedbacks).where(eq(feedbacks.id, id)).returning();
  return result;
};
