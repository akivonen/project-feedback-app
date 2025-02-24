import { relations } from 'drizzle-orm';
import { pgEnum, pgTable, uuid, text, integer, timestamp } from 'drizzle-orm/pg-core';

export const categoryType = pgEnum('category', ['Feature', 'UI', 'UX', 'Enhancement', 'Bug']);

export const statusType = pgEnum('status', ['Suggestion', 'Planned', 'In-Progress', 'Live']);

export const feedbacks = pgTable('feedbacks', {
  id: uuid('id').primaryKey(),
  category: categoryType('category').notNull(),
  title: text('title').notNull(),
  upvotes: integer('upvotes').notNull().default(0),
  status: statusType('status').notNull(),
  description: text('description').notNull(),
  user_id: uuid('user_id').notNull(),
  created_at: timestamp('created_at').notNull().defaultNow(),
});

export const feedbacksRelations = relations(feedbacks, ({ many }) => ({
  comments: many(comments),
}));

export const comments = pgTable('comments', {
  id: uuid('id').primaryKey(),
  feedback_id: uuid('feedback_id').notNull(),
  content: text('content').notNull(),
  user_id: uuid('user_id').notNull(),
  created_at: timestamp('created_at').notNull().defaultNow(),
});

export const commentsRelations = relations(comments, ({ one }) => ({
  feedback: one(feedbacks, { fields: [comments.feedback_id], references: [feedbacks.id] }),
}));
