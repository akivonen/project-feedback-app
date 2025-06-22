import { z } from 'zod';

const MAX_FILE_SIZE = Number(process.env.MAX_FILE_SIZE ?? 5 * 1024 * 1024); // 5MB default
const ACCEPTED_IMAGE_TYPES = process.env.ACCEPTED_IMAGE_TYPES?.split(',') ?? [
  'image/jpeg',
  'image/jpg',
  'image/png',
];

export const string = (field: string, maxLength?: number, minLength?: number) =>
  z
    .string({ required_error: 'Can`t be empty' })
    .trim()
    .min(minLength ?? 1, {
      message:
        minLength && minLength > 1
          ? `${field} can't bet shorter than ${minLength} chars`
          : 'Can`t be empty',
    })
    .max(maxLength ?? 1000, {
      message: `${field} can't be empty longer than ${maxLength ?? 1000} chars`,
    });

export const imageSchema = z
  .instanceof(File)
  .refine((file) => file.size <= MAX_FILE_SIZE, 'Max file size is 5MB')
  .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type), 'Only JPEG or PNG images are allowed')
  .optional()
  .nullable();

export const feedbackStatusEnum = z.enum(['Suggestion', 'Planned', 'In-Progress', 'Live'], {
  invalid_type_error: 'Invalid status',
});

export const commentTextSchema = string('Content', 250);

export const usernameSchema = string('Username', 30, 3);
export const passwordSchema = string('Password', 30, 6);

export function validateFormData<T>(data: T, schema: z.ZodType<T>, serverActionName: string): T {
  const parsedData = schema.safeParse(data);
  if (!parsedData.success) {
    throw new Error(
      `Validation error in ${serverActionName}: ${JSON.stringify(parsedData.error.format())}`
    );
  }
  return parsedData.data;
}
