export type Category = 'UI' | 'UX' | 'Enhancement' | 'Bug' | 'Feature';
export type FilterCategory = Category | 'All';
export type Status = 'Suggestion' | 'Planned' | 'In-Progress' | 'Live';
export type RoadmapStatus = Exclude<Status, 'Suggestion'>;
export type User = {
  id: string;
  name: string;
  username: string;
  image: string | null;
  created_at: Date;
};

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
  user?: User;
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
};

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

export type Roadmap = Record<RoadmapStatus, number>;

export type RoadmapDetails = {
  color: string;
  description: string;
  feedbacks: Feedback[];
};
