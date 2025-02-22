import React from 'react';
import Button from './Button';

const FeedbackCategories: React.FC = () => {
  const categories = ['All', 'UI', 'UX', 'Enhancement', 'Bug', 'Feature'];

  return (
    <div className="flex min-w-[223px] flex-wrap gap-x-[8px] gap-y-[14px] rounded-lg bg-white p-6">
      {categories.map((categoryName, index) => (
        <Button key={index} variant="grey">
          {categoryName}
        </Button>
      ))}
    </div>
  );
};

export default FeedbackCategories;
