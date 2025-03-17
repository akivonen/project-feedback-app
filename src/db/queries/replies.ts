'use server';
import db from '../index';
import { replies } from '../schema';
import { ReplyInsertData } from '@/types';

export const createReply = async (reply: ReplyInsertData) => {
  const [result] = await db.insert(replies).values(reply).returning();
  return result;
};
