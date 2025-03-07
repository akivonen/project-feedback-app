import React, { Suspense } from 'react';
import CreateFeedback from '@/components/FeedbackForm';
import LoadingSpinner from '@/components/LoadingSpinner';

export default async function FeedbackAddPage() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <main className="flex flex-col gap-y-6">
        <CreateFeedback />
      </main>
    </Suspense>
  );
}
