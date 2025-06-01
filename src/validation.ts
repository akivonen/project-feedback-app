import { z } from 'zod';

export const feedbackSchema = z.object({
  title: z.string({ required_error: "Can't be empty" }).trim().min(1, {
    message: "Can't be empty",
  }),
  category: z.enum(['Feature', 'UI', 'UX', 'Enhancement', 'Bug'], {
    invalid_type_error: 'Category is required',
    required_error: 'Category is required',
  }),
  status: z.enum(['Suggestion', 'Planned', 'In-Progress', 'Live'], {
    invalid_type_error: 'Invalid status',
  }),
  description: z
    .string({ required_error: "Can't be empty" })
    .trim()
    .min(1, { message: "Can't be empty" }),
});

export const commentSchema = z.object({
  body: z
    .string({ required_error: 'Can`t be empty' })
    .trim()
    .min(1, { message: 'Can`t be empty' })
    .max(250, { message: 'Can`t be empty longer than 100 chars' }),
});

export const signInSchema = z.object({
  username: z
    .string({ required_error: 'Username is required' })
    .trim()
    .min(3, { message: 'At least 3 characters' })
    .max(30, { message: 'At most 30 characters' }),
  password: z
    .string({ required_error: 'Password is required' })
    .trim()
    .min(6, { message: 'At least 6 characters' })
    .max(30, { message: 'At most 30 characters' }),
});

export const signUpSchema = z
  .object({
    name: z
      .string({ required_error: 'Name is required' })
      .trim()
      .min(3, 'At least 1 character')
      .max(30, { message: 'At most 30 characters' }),
    username: z
      .string({ required_error: 'Username is required' })
      .trim()
      .min(3, 'At least 1 character')
      .max(30, { message: 'At most 30 characters' }),
    password: z
      .string({ required_error: 'Password is required' })
      .trim()
      .min(3, 'At least 6 character')
      .max(30, { message: 'At most 30 characters' }),
    confirmPassword: z
      .string({ required_error: 'Confirm Password is required' })
      .trim()
      .min(3, 'At least 6 character')
      .max(30, { message: 'At most 30 characters' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords must match',
  });
