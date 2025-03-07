'use server';
import db from '../index';
import { feedbacks } from '../schema';
import { eq } from 'drizzle-orm';
import { Feedback, FeedbackInsertData, FeedbackFormData } from '@/types';
import { unstable_cache } from 'next/cache';

export const getAllFeedbacks = unstable_cache(
  async (): Promise<Feedback[]> => {
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
  },
  ['feedbacks'],
  { revalidate: 3600, tags: ['feedbacks'] }
);

export const getFeedbackById = async (feedbackId: string): Promise<Feedback> => {
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
  const [result] = await db.insert(feedbacks).values(feedback).returning();
  return result;
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
