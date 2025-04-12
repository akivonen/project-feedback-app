import db from '../index';
import { upvotes, feedbacks } from '../schema';
import { eq, and, sql } from 'drizzle-orm';

export const getUpvoters = async (feedbackId: string) => {
  try {
    return await db.query.upvotes.findMany({
      where: eq(upvotes.feedback_id, feedbackId),
    });
  } catch (error) {
    console.error('Database error in getUpvoters:', error);
    if (error instanceof Error) {
      throw new Error(`Failed to get upvoters: ${error.message}`);
    }
    throw new Error('An unexpected error occurred while getting upvoters');
  }
};

export const createUpvote = async (feedbackId: string, userId: string) => {
  try {
    await db.transaction(async (tx) => {
      const existingUpvote = await tx.query.upvotes.findMany({
        where: and(eq(upvotes.feedback_id, feedbackId), eq(upvotes.user_id, userId)),
      });

      if (existingUpvote.length > 0) {
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
    console.error('Database error in createUpvote:', error);
    if (error instanceof Error) {
      throw new Error(`Database operation failed: ${error.message}`);
    }
    throw new Error('An unexpected error occured while creating upvote');
  }
};

export const deleteUpvote = async (feedbackId: string, userId: string) => {
  try {
    await db.transaction(async (tx) => {
      const existingUpvote = await tx.query.upvotes.findMany({
        where: and(eq(upvotes.feedback_id, feedbackId), eq(upvotes.user_id, userId)),
      });

      if (existingUpvote.length < 1) {
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
    console.error('Database error in deleteUpvote:', error);
    if (error instanceof Error) {
      throw new Error(`Database operation failed: ${error.message}`);
    }
    throw new Error('An unexpected error occured while deleting upvote');
  }
};
