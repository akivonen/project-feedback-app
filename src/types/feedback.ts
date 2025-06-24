import { Category, Status } from './roadmap';
import { UserProfileProps } from './user';
import { Comment } from './comment';
import { Upvote } from './upvotes';
export type Feedback = {
  id: string;
  user_id: string;
  title: string;
  category: Category;
  upvotes_count: number;
  status: Status;
  description: string;
  comments: Comment[] | [];
  created_at: Date;
  user: UserProfileProps;
  upvotes: Upvote[];
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
