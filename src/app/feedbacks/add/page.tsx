import React, { Suspense } from 'react';
import CreateFeedback from '@/components/forms/FeedbackForm';
import { LoadingSpinner } from '@/components/common';
import FeedbackHeader from '@/components/feedback/FeedbackHeader';
import { auth } from '@/app/auth';
import { redirect } from 'next/navigation';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Feedback Add Page',
  description: 'Add your product feedback',
};

export default async function FeedbackAddPage() {
  const session = await auth();

  if (!session) {
    redirect('/auth/signin');
  }

  return (
    <>
      <FeedbackHeader />
      <Suspense fallback={<LoadingSpinner />}>
        <main className="flex flex-col gap-y-6">
          <CreateFeedback />
        </main>
      </Suspense>
    </>
  );
}
