import { z } from 'zod';
import { string, commentTextSchema } from './';

export const commentFormSchema = z.object({
  body: commentTextSchema,
});

export const commentSchema = z.object({
  content: commentTextSchema,
  feedback_id: z.string().uuid(),
  user_id: z.string().uuid(),
});

export const replySchema = z.object({
  content: commentTextSchema,
  replying_to: string('Replying to', 30, 3),
  comment_id: z.string().uuid(),
  user_id: z.string().uuid(),
});
