'server-only';
import db from '../index';
import { upvotes, feedbacks } from '../schema';
import { eq, and, sql } from 'drizzle-orm';
import { Upvote } from '@/types';
import { isValidUUID, handleError } from '@/lib/utils';

export const getUpvoters = async (feedbackId: string): Promise<Upvote[]> => {
  if (!isValidUUID(feedbackId)) {
    throw new Error('Invalid feedbackId');
  }

  try {
    return await db.query.upvotes.findMany({
      where: eq(upvotes.feedback_id, feedbackId),
      columns: { user_id: true, feedback_id: true, created_at: true },
    });
  } catch (error) {
    handleError(error, 'getUpvoters', 'Database');
  }
};

export const createUpvote = async (feedbackId: string, userId: string): Promise<void> => {
  if (!isValidUUID(feedbackId) || !isValidUUID(userId)) {
    throw new Error('Invalid feedbackId or userId');
  }

  try {
    await db.transaction(async (tx) => {
      const existingUpvote = await tx.query.upvotes.findFirst({
        where: and(eq(upvotes.feedback_id, feedbackId), eq(upvotes.user_id, userId)),
      });

      if (existingUpvote) {
        throw new Error(`Failed to insert upvote, already upvoted`);
      }

      await tx.insert(upvotes).values({
        feedback_id: feedbackId,
        user_id: userId,
      });

      await tx
        .update(feedbacks)
        .set({ upvotes_count: sql`${feedbacks.upvotes_count} + 1` })
        .where(eq(feedbacks.id, feedbackId));
    });
  } catch (error) {
    handleError(error, 'createUpvote', 'Database');
  }
};

export const deleteUpvote = async (feedbackId: string, userId: string): Promise<void> => {
  if (!isValidUUID(feedbackId) || !isValidUUID(userId)) {
    throw new Error('Invalid feedbackId or userId');
  }

  try {
    await db.transaction(async (tx) => {
      const existingUpvote = await tx.query.upvotes.findFirst({
        where: and(eq(upvotes.feedback_id, feedbackId), eq(upvotes.user_id, userId)),
      });

      if (!existingUpvote) {
        throw new Error(`Failed to delete upvote, not upvoted yet`);
      }

      await tx
        .delete(upvotes)
        .where(and(eq(upvotes.feedback_id, feedbackId), eq(upvotes.user_id, userId)));

      await tx
        .update(feedbacks)
        .set({ upvotes_count: sql`${feedbacks.upvotes_count} - 1` })
        .where(eq(feedbacks.id, feedbackId));
    });
  } catch (error) {
    handleError(error, 'deleteUpvote', 'Database');
  }
};
