'use client';
import React from 'react';
import Button from '../buttons/Button';
import GoBackButton from '../buttons/GoBackButton';
import { useParams, usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { Feedback } from '@/types';

type FeedbackHeaderProps = {
  feedback?: Feedback;
};

export const FeedbackHeaderSkeleton = () => {
  return (
    <header role="banner" className="flex justify-between">
      <GoBackButton />
      <div
        data-testid="skeleton-placeholder"
        className="h-10 w-32 animate-pulse rounded bg-light-200"
      ></div>
    </header>
  );
};

const FeedbackHeader: React.FC<FeedbackHeaderProps> = ({ feedback }) => {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const isFeedbackDetailsPage =
    pathname.split('/').length === 3 && pathname.split('/')[2] !== 'add';
  const { feedbackId } = useParams<{ feedbackId: string }>();
  if (status === 'loading') {
    return <FeedbackHeaderSkeleton />;
  }

  return (
    <header className="flex justify-between">
      <GoBackButton />
      {isFeedbackDetailsPage && session?.user?.id === feedback?.user_id && (
        <Button variant="blue" size="lg" href={`/feedbacks/${feedbackId}/edit`}>
          Edit Feedback
        </Button>
      )}
    </header>
  );
};

export default FeedbackHeader;
