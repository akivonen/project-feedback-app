import { Category, Status } from './roadmap';
import { User } from './user';
import { Comment } from './comment';
export type Feedback = {
  id: string;
  user_id: string;
  title: string;
  category: Category;
  upvotes: number;
  status: Status;
  description: string;
  comments: Comment[] | [];
  created_at: Date;
  user: User;
};

export type FeedbackInsertData = {
  title: string;
  category: Category;
  description: string;
  user_id: string;
};

export type FeedbackFormData = {
  id: string;
  title: string;
  category: Category;
  status: Status;
  description: string;
  user_id: string;
};
