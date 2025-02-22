'use server';

import { sql, eq } from 'drizzle-orm';
import db from '../index';
import { feedbacks, comments } from '../schema';

export const getAllFeedbacks = async () => {
  return await db
    .select({
      id: feedbacks.id,
      category: feedbacks.category,
      title: feedbacks.title,
      upvotes: feedbacks.upvotes,
      status: feedbacks.status,
      description: feedbacks.description,
      user_id: feedbacks.user_id,
      commentCount: sql<number>`count(${comments.id})`.as('commentCount'),
    })
    .from(feedbacks)
    .leftJoin(comments, eq(feedbacks.id, comments.feedback_id))
    .groupBy(feedbacks.id);
};
