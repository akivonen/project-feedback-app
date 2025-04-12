import { relations } from 'drizzle-orm';
import { pgEnum, pgTable, uuid, text, integer, timestamp, primaryKey } from 'drizzle-orm/pg-core';

export const categoryType = pgEnum('category', ['Feature', 'UI', 'UX', 'Enhancement', 'Bug']);

export const statusType = pgEnum('status', ['Suggestion', 'Planned', 'In-Progress', 'Live']);

export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  username: text('username').notNull(),
  password: text('password').notNull(),
  image: text('image'),
  created_at: timestamp('created_at').notNull().defaultNow(),
});

export const feedbacks = pgTable('feedbacks', {
  id: uuid('id').primaryKey().defaultRandom(),
  category: categoryType('category').notNull(),
  title: text('title').notNull(),
  upvotes_count: integer('upvotes_count').notNull().default(0),
  status: statusType('status').notNull().default('Suggestion'),
  description: text('description').notNull(),
  user_id: uuid('user_id').notNull(),
  created_at: timestamp('created_at').notNull().defaultNow(),
});

export const comments = pgTable('comments', {
  id: uuid('id').primaryKey().defaultRandom(),
  feedback_id: uuid('feedback_id').notNull(),
  content: text('content').notNull(),
  user_id: uuid('user_id').notNull(),
  created_at: timestamp('created_at').notNull().defaultNow(),
});

export const replies = pgTable('replies', {
  id: uuid('id').primaryKey().defaultRandom(),
  content: text('content').notNull(),
  replying_to: text('replying_to').notNull(),
  comment_id: uuid('comment_id').notNull(),
  user_id: uuid('user_id').notNull(),
  created_at: timestamp('created_at').notNull().defaultNow(),
});

export const upvotes = pgTable(
  'upvotes',
  {
    feedback_id: uuid('feedback_id').notNull(),
    user_id: uuid('user_id').notNull(),
    created_at: timestamp('created_at').notNull().defaultNow(),
  },
  (table) => [primaryKey({ columns: [table.user_id, table.feedback_id] })]
);

export const feedbacksRelations = relations(feedbacks, ({ one, many }) => ({
  user: one(users, {
    fields: [feedbacks.user_id],
    references: [users.id],
  }),
  comments: many(comments),
  upvotes: many(upvotes),
}));

export const usersRelations = relations(users, ({ many }) => ({
  feedbacks: many(feedbacks),
  comments: many(comments),
  replies: many(replies),
  upvotes: many(upvotes),
}));

export const commentsRelations = relations(comments, ({ one, many }) => ({
  user: one(users, {
    fields: [comments.user_id],
    references: [users.id],
  }),
  feedback: one(feedbacks, { fields: [comments.feedback_id], references: [feedbacks.id] }),
  replies: many(replies),
}));

export const repliesRelations = relations(replies, ({ one }) => ({
  user: one(users, {
    fields: [replies.user_id],
    references: [users.id],
  }),
  comment: one(comments, { fields: [replies.comment_id], references: [comments.id] }),
}));

export const upvotesRelations = relations(upvotes, ({ one }) => ({
  user: one(users, {
    fields: [upvotes.user_id],
    references: [users.id],
  }),
  feedbacks: one(feedbacks, { fields: [upvotes.feedback_id], references: [feedbacks.id] }),
}));
