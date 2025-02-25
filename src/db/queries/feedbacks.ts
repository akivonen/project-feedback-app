'use server';
import db from '../index';
import { feedbacks } from '../schema';
import { eq } from 'drizzle-orm';
import { Feedback } from '@/types';

export const getAllFeedbacks = async (): Promise<Feedback[]> => {
  return await db.query.feedbacks.findMany({
    with: {
      user: true,
      comments: {
        with: {
          user: true,
          replies: true,
        },
      },
    },
  });
};
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
