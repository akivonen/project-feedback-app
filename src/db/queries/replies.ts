'server-only';
import { handleError } from '@/lib/utils';
import db from '../index';
import { replies } from '../schema';
import { ReplyInsertData } from '@/types';
import { Reply } from '@/types';

export const createReply = async (reply: ReplyInsertData): Promise<Partial<Reply> | never> => {
  try {
    const [result] = await db.insert(replies).values(reply).returning();
    if (!result) {
      throw new Error('Failed to insert reply in database');
    }
    return result;
  } catch (error) {
    handleError(error, 'createReply', 'Database');
  }
};
