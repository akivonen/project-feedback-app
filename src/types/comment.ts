import { User } from './user';
import { Reply } from './reply';

export type Comment = {
  id: string;
  feedback_id: string;
  content: string;
  user_id: string;
  created_at: Date;
  user: User;
  replies: Reply[] | [];
};

export type CommentInsertData = {
  feedback_id: string;
  content: string;
  user_id: string;
};
