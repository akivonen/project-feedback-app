import { z } from 'zod';
import { string, imageSchema, usernameSchema, passwordSchema } from '.';

export const signInSchema = z.object({
  username: usernameSchema,
  password: passwordSchema,
});

export const signUpSchema = signInSchema
  .extend({
    name: string('Name', 30, 3),
    confirmPassword: string('Confirm password', 30, 6),
    image: imageSchema,
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords must match',
  });

export const profileUpdateServerSchema = z.object({
  id: string('Id').uuid(),
  name: string('Name', 30, 3),
  username: usernameSchema,
  image: imageSchema,
});

export const profileUpdateClientSchema = profileUpdateServerSchema.omit({ id: true });

export const changePasswordClientSchema = z
  .object({
    oldPassword: passwordSchema,
    newPassword: passwordSchema,
    confirmPassword: passwordSchema,
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords must match',
  });

export const changePasswordServerSchema = z.object({
  id: string('Id').uuid(),
  oldPassword: passwordSchema,
  newPassword: passwordSchema,
});
