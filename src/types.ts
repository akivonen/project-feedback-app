export type User = {
  name: string;
  username: string;
  image: string;
};

export type Comment = {
  id: number;
  content: string;
  user: User;
};

export type Feedback = {
  id: string;
  title: string;
  category: string;
  upvotes: number;
  status: string;
  description: string;
  comments?: Comment[];
  commentCount: number;
};

export type RoadmapStatus = 'planned' | 'in-progress' | 'live';

export type Roadmap = Record<RoadmapStatus, number>;
