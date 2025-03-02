import React from 'react';
import { getFeedbackByIdAction } from '@/app/actions/feedback-actions';
import LoadingSpinner from '@/components/LoadingSpinner';
import SuggestionsListItem from '@/components/suggestions/SuggestionsListItem';
import CommentList from '@/components/comments/CommentsList';
import AddComment from '@/components/comments/AddComment';

type FeedbackDetailsPageProps = {
  params: Promise<{ feedbackId: string }>;
};

export default async function FeedbackDetailsPage({ params }: FeedbackDetailsPageProps) {
  const { feedbackId } = await params;
  const feedback = await getFeedbackByIdAction(feedbackId);

  if (!feedback) {
    return <LoadingSpinner />;
  }
  return (
    <main className="flex flex-col gap-y-6">
      <SuggestionsListItem feedback={feedback} />
      <CommentList comments={feedback.comments} />
      <AddComment />
    </main>
  );
}
