import { z } from 'zod';
import { string, usernameSchema, passwordSchema } from './';

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png'];

export const signInSchema = z.object({
  username: usernameSchema,
  password: passwordSchema,
});

export const signUpSchema = signInSchema
  .extend({
    name: string('Username', 30, 3),
    confirmPassword: string('Confirm password', 30, 6),
    image: z
      .instanceof(File)
      .refine((file) => file.size <= MAX_FILE_SIZE, 'Max file size is 5MB.')
      .refine(
        (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
        'Only .jpg, .jpeg, .png are allowed.'
      )
      .optional()
      .nullable(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords must match',
  });
