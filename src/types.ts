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
  id: number;
  title: string;
  category: string;
  upvotes: number;
  status: string;
  description: string;
  comments?: Comment[];
};
