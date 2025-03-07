'use client';
import React from 'react';
import Button from './buttons/Button';
import GoBack from './buttons/GoBack';
import { useParams, usePathname } from 'next/navigation';

const FeedbackHeader: React.FC = () => {
  const pathname = usePathname();
  const isFeedbackDetailsPage =
    pathname.split('/').length === 3 && pathname.split('/')[2] !== 'add';
  const { feedbackId } = useParams<{ feedbackId: string }>();

  return (
    <header className="flex justify-between">
      <GoBack />
      {isFeedbackDetailsPage && (
        <Button variant="blue" size="lg" href={`/feedbacks/${feedbackId}/edit`}>
          Edit Feedback
        </Button>
      )}
    </header>
  );
};
export default FeedbackHeader;
