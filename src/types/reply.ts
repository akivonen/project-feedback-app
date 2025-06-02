import { UserSessionProps } from '@/types/user';

export type Reply = {
  id: string;
  content: string;
  replying_to: string;
  comment_id: string;
  user_id: string;
  user: UserSessionProps;
  created_at: Date;
};

export type ReplyInsertData = {
  content: string;
  replying_to: string;
  comment_id: string;
  user_id: string;
};
