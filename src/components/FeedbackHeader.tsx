'use client';
import React from 'react';
import Button from './buttons/Button';
import GoBack from './buttons/GoBack';
import { usePathname } from 'next/navigation';

const FeedbackHeader: React.FC = () => {
  const pathname = usePathname();
  const isFeedbackDetailsPage =
    pathname.split('/').length === 3 && pathname.split('/')[2] !== 'add';
  return (
    <header className="flex justify-between">
      <GoBack />
      {isFeedbackDetailsPage && (
        <Button variant="blue" size="lg">
          Edit Feedback
        </Button>
      )}
    </header>
  );
};
export default FeedbackHeader;
