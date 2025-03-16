import { getFeedbackByIdAction } from '@/app/actions/feedback-actions';
import LoadingSpinner from '@/components/LoadingSpinner';
import { FeedbackItem } from '@/components/suggestions/index';
import CommentList from '@/components/comments/CommentsList';
import AddComment from '@/components/comments/AddComment';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

type FeedbackDetailsPageProps = {
  params: Promise<{ feedbackId: string }>;
};

export default async function FeedbackDetailsPage({ params }: FeedbackDetailsPageProps) {
  const { feedbackId } = await params;
  const feedback = await getFeedbackByIdAction(feedbackId);

  if (!feedback) {
    notFound();
  }

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <main className="flex flex-col gap-y-6">
        <FeedbackItem feedback={feedback} />
        {feedback.comments && <CommentList comments={feedback.comments} />}
        <AddComment />
      </main>
    </Suspense>
  );
}
