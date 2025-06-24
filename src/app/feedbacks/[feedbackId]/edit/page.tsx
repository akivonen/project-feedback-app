import { Suspense } from 'react';
import { FeedbackForm } from '@/components/forms/';
import { getFeedbackByIdAction } from '@/app/actions/feedbackActions';
import { Feedback, FeedbackFormData } from '@/types';
import { notFound, redirect } from 'next/navigation';
import { LoadingSpinner } from '@/components/common';
import { FeedbackHeader } from '@/components/feedback/';
import { auth } from '@/app/auth';
import { Metadata } from 'next';

type FeedbackEditPage = {
  params: Promise<{ feedbackId: string }>;
};

export async function generateMetadata({ params }: FeedbackEditPage): Promise<Metadata> {
  const { feedbackId } = await params;
  const feedback = await getFeedbackByIdAction(feedbackId);

  return {
    title: `${feedback?.title} - Feedback Edit Page`,
    description: `${feedback?.description}`,
  };
}

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
