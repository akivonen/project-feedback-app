import React from 'react';
import CreateFeedback from '@/components/CreateFeedback';

export default async function FeedbackAddPage() {
  return (
    <main className="flex flex-col gap-y-6">
      <CreateFeedback />
    </main>
  );
}
