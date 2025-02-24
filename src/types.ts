export type Category = 'All' | 'UI' | 'UX' | 'Enhancement' | 'Bug' | 'Feature';
export type Status = 'Suggestion' | 'Planned' | 'In-Progress' | 'Live';
export type RoadmapStatus = Exclude<Status, 'Suggestion'>;
export type User = {
  id: string;
  name: string;
  username: string;
  image: string;
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
  comments: Comment[];
  created_at: Date;
};

export type Comment = {
  id: string;
  feedback_id: string;
  content: string;
  user_id: string;
  created_at: Date;
};

export type Reply = {
  id: string;
  content: string;
  replying_to: string;
  comment_id: string;
  user_id: string;
  created_at: Date;
};

export type Roadmap = Record<RoadmapStatus, number>;
