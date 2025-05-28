import { Feedback } from '@/types';

const date = new Date(Date.now());

export const defaultFeedback: Feedback = {
  id: 'feedback1',
  title: 'Test feedback',
  category: 'Feature',
  description: 'Test description',
  comments: [
    {
      id: 'c1',
      content: 'Comment 1',
      user_id: 'u1',
      replies: [],
      feedback_id: '1',
      created_at: date,
      user: {
        id: 'u1',
        username: 'user1',
        name: 'user1',
        image: null,
      },
    },
    {
      id: 'c2',
      content: 'Comment 2',
      user_id: 'u2',
      feedback_id: '1',
      created_at: date,
      replies: [
        {
          id: 'r1',
          content: 'Reply 1',
          user_id: 'u3',
          comment_id: 'c2',
          created_at: date,
          replying_to: 'u2,',
          user: {
            id: 'u3',
            username: 'user3',
            name: 'user3',
            image: null,
          },
        },
      ],
      user: {
        id: 'u1',
        username: 'user1',
        name: 'user1',
        image: null,
      },
    },
  ],
  upvotes: [{ user_id: 'u1', feedback_id: '1', created_at: date }],
  status: 'Suggestion',
  user_id: 'u1',
  user: {
    id: 'u1',
    username: 'user',
    name: 'user',
    image: null,
  },
  created_at: date,
  upvotes_count: 1,
};
