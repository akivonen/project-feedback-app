'use client';
import React from 'react';
import Button from '../buttons/Button';
import GoBack from '../buttons/GoBack';
import { useParams, usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { Feedback } from '@/types';

type FeedbackHeaderProps = {
  feedback?: Feedback;
};

const FeedbackHeader: React.FC<FeedbackHeaderProps> = ({ feedback }) => {
  const { data: session } = useSession();
  const pathname = usePathname();
  const isFeedbackDetailsPage =
    pathname.split('/').length === 3 && pathname.split('/')[2] !== 'add';
  const { feedbackId } = useParams<{ feedbackId: string }>();
  return (
    <header className="flex justify-between">
      <GoBack />
      {isFeedbackDetailsPage && session?.user?.id === feedback?.user_id && (
        <Button variant="blue" size="lg" href={`/feedbacks/${feedbackId}/edit`}>
          Edit Feedback
        </Button>
      )}
    </header>
  );
};

export default FeedbackHeader;
