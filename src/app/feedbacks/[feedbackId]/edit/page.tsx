import { Suspense } from 'react';
import FeedbackForm from '@/components/FeedbackForm';
import { getFeedbackByIdAction } from '@/app/actions/feedback-actions';
import { Feedback, FeedbackFormData } from '@/types';
import { notFound } from 'next/navigation';
import LoadingSpinner from '@/components/LoadingSpinner';

type FeedbackEditPage = {
  params: Promise<{ feedbackId: string }>;
};

export default async function FeedbackEditPage({ params }: FeedbackEditPage) {
  const { feedbackId } = await params;
  const currentFeedback: Feedback | null = await getFeedbackByIdAction(feedbackId);

  if (!currentFeedback) {
    return notFound();
  }

  const initialFeedbackData: FeedbackFormData = {
    id: currentFeedback.id,
    title: currentFeedback.title,
    category: currentFeedback.category,
    status: currentFeedback.status,
    description: currentFeedback.description,
  };
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <main className="flex flex-col gap-y-6">
        <FeedbackForm curFeedback={initialFeedbackData} />
      </main>
    </Suspense>
  );
}
