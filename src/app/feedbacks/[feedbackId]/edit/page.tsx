import { Suspense } from 'react';
import FeedbackForm from '@/components/forms/FeedbackForm';
import { getFeedbackByIdAction } from '@/app/actions/feedbackActions';
import { Feedback, FeedbackFormData } from '@/types';
import { notFound, redirect } from 'next/navigation';
import LoadingSpinner from '@/components/LoadingSpinner';
import FeedbackHeader from '@/components/feedback/FeedbackHeader';
import { auth } from '@/app/auth';

type FeedbackEditPage = {
  params: Promise<{ feedbackId: string }>;
};

export default async function FeedbackEditPage({ params }: FeedbackEditPage) {
  const session = await auth();

  if (!session) {
    redirect('/auth/signin');
  }

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
    user_id: currentFeedback.user.id,
  };
  return (
    <>
      <FeedbackHeader />
      <Suspense fallback={<LoadingSpinner />}>
        <main className="flex flex-col gap-y-6">
          <FeedbackForm curFeedback={initialFeedbackData} />
        </main>
      </Suspense>
    </>
  );
}
