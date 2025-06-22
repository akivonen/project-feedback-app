'use server';
import { imageSchema } from '@/app/validation';
import fs from 'node:fs/promises';
import path from 'node:path';

export default async function handleImage({
  image,
  username,
}: {
  image: File;
  username: string;
}): Promise<string | never> {
  try {
    imageSchema.parse(image);
    const extension = image.name.split('.').pop()?.toLowerCase();
    if (!extension) {
      throw new Error('Invalid file extension');
    }
    const imagePath = `/images/user-images/${username}.${extension}`;
    const filePath = path.join(process.cwd(), 'public', imagePath);
    await fs.mkdir(path.dirname(filePath), { recursive: true });
    try {
      await fs.unlink(filePath);
    } catch (error) {
      // Ignore if file doesn't exist
      if ((error as NodeJS.ErrnoException).code !== 'ENOENT') {
        throw error;
      }
    }
    const bufferedImage = await image.arrayBuffer();
    await fs.writeFile(filePath, Buffer.from(bufferedImage));
    return imagePath;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to save image';
    throw new Error(errorMessage);
  }
}
