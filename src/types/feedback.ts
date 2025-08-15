import { Category, Status } from './roadmap';
import { UserProfileProps } from './user';
import { Comment } from './comment';
import { Upvote } from './upvotes';

export type BaseFeedback = {
  title: string;
  category: Category;
  description: string;
  status: Status;
  user_id: string;
};

export type Feedback = BaseFeedback & {
  id: string;
  upvotes_count: number;
  comments: Comment[] | [];
  created_at: Date;
  user: UserProfileProps;
  upvotes: Upvote[];
};

export type FeedbackInputData = Omit<BaseFeedback, 'user_id'>;

export type FeedbackInsertData = Omit<BaseFeedback, 'status'>;

export type FeedbackFormData = BaseFeedback & {
  id: string;
};
