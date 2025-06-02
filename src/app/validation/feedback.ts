import { z } from 'zod';
import { string, feedbackStatusEnum } from './';

export const feedbackBaseSchema = z.object({
  title: string('title', 100),
  category: z.enum(['Feature', 'UI', 'UX', 'Enhancement', 'Bug'], {
    invalid_type_error: 'Category is required',
    required_error: 'Category is required',
  }),
  description: string('description'),
});

export const feedbackClientSchema = feedbackBaseSchema.extend({
  status: feedbackStatusEnum.optional(),
});

export const feedbackInsertServerSchema = feedbackBaseSchema.extend({
  user_id: z.string().uuid(),
});

export const feedbackUpdateServerSchema = feedbackInsertServerSchema.extend({
  id: z.string().uuid(),
  status: feedbackStatusEnum,
});
