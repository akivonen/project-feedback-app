import React from 'react';
import Button from './buttons/Button';
import GoBack from './buttons/GoBack';

const FeedbackHeader: React.FC = () => {
  return (
    <header className="flex justify-between">
      <GoBack />
      <Button variant="blue" size="lg">
        Edit Feedback
      </Button>
    </header>
  );
};
export default FeedbackHeader;
