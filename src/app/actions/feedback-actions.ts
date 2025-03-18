'use server';
import { createComment } from '@/db/queries/comments';
import {
  getAllFeedbacks,
  getFeedbackById,
  createFeedback,
  deleteFeedback,
  updateFeedback,
} from '@/db/queries/feedbacks';
import { createReply } from '@/db/queries/replies';
import {
  CommentInsertData,
  Feedback,
  FeedbackFormData,
  FeedbackInsertData,
  ReplyInsertData,
} from '@/types';
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
      throw new Error(`Failed to get all feedbacks: ${error.message}`);
    }
    throw new Error('An unexpected error occurred while getting all feedbacks');
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
      throw new Error(`Failed to get feedback by id: ${error.message}`);
    }
    throw new Error(`An unexpected error occurred while getting feedback by id`);
  }
}

export async function createFeedbackAction(feedback: Omit<FeedbackInsertData, 'user_id'>) {
  try {
    const feedbackData = {
      ...feedback,
      user_id: '21c40a49-b9f0-426f-b608-724afbc019f0', //implement auth
    } as FeedbackInsertData;

    const result = await createFeedback(feedbackData);
    if (!result) {
      throw new Error('Feedback creation returned no result');
    }
    revalidateTag('feedbacks');
    revalidatePath('/');
    return result;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to create feedback: ${error.message}`);
    }
    throw new Error('An unexpected error occurred while processing feedback');
  }
}

export async function updateFeedbackAction(feedback: FeedbackFormData) {
  try {
    const result = await updateFeedback(feedback);
    if (!result) {
      throw new Error('Feedback updating returned no result');
    }
    revalidateTag('feedbacks');
    revalidatePath('/');
    return result;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to update feedback: ${error.message}`);
    }
    throw new Error('An unexpected error occurred while processing feedback');
  }
}

export async function deleteFeedbackAction(id: string): Promise<void> {
  try {
    const feedback = await getFeedbackById(id);
    if (!feedback) {
      throw new Error('Feedback not found while deleting feedback');
    }
    const result = await deleteFeedback(id);
    if (!result) {
      throw new Error(`Feedback deleting returned no result`);
    }
    revalidateTag('feedbacks');
    revalidatePath('/');
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to delete feedback: ${error.message}`);
    }
    throw new Error('An unexpected error occurred while deleting feedback');
  }
}

export async function createCommentAction(comment: Omit<CommentInsertData, 'user_id'>) {
  try {
    const commentData = {
      ...comment,
      user_id: '21c40a49-b9f0-426f-b608-724afbc019f0',
    } as CommentInsertData;
    const result = await createComment(commentData);
    if (!result) {
      throw new Error('Comment creation returned no result');
    }
    revalidateTag('feedbacks');
    revalidatePath('/');
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to create comment: ${error.message}`);
    }
    throw new Error('An unexpected error occurred while creating feedback');
  }
}

export async function createReplyAction(reply: Omit<ReplyInsertData, 'user_id'>) {
  try {
    const replyData = {
      ...reply,
      user_id: '21c40a49-b9f0-426f-b608-724afbc019f0',
    } as ReplyInsertData;
    const result = await createReply(replyData);
    if (!result) {
      throw new Error('Reply creation returned no result');
    }
    revalidateTag('feedbacks');
    revalidatePath('/');
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to create reply: ${error.message}`);
    }
    throw new Error('An unexpected error occurred while creating reply');
  }
}
