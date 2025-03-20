import { User } from './user';

export type Reply = {
  id: string;
  content: string;
  replying_to: string;
  comment_id: string;
  user_id: string;
  created_at: Date;
  user: User;
};

export type ReplyInsertData = {
  replying_to: string;
  comment_id: string;
  content: string;
  user_id: string;
};
