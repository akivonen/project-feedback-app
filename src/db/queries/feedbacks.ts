'use server';
import db from '../index';
import { feedbacks } from '../schema';
import { eq } from 'drizzle-orm';
import { Feedback } from '@/types';
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
