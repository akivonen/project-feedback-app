'use server';
import db from '../index';
import { comments } from '../schema';

export const getAllComments = async () => {
  return await db.select().from(comments);
};
