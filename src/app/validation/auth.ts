import { z } from 'zod';
import { string, usernameSchema, passwordSchema } from './';

export const signInSchema = z.object({
  username: usernameSchema,
  password: passwordSchema,
});

export const signUpSchema = signInSchema
  .extend({
    name: string('Username', 30, 3),
    confirmPassword: string('Confirm password', 30, 6),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords must match',
  });
