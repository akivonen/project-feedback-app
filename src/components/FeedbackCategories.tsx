'use client';
import React from 'react';
import Button from './buttons/Button';
import useFilter from '@/hooks/useFilter';
import { Category } from '@/types';

const FeedbackCategories: React.FC = () => {
  const { categories, currCategory, setCurrCategory } = useFilter();

  return (
    <div className="flex min-w-[223px] flex-wrap gap-x-[8px] gap-y-[14px] rounded-lg bg-white p-6">
      {categories.map((categoryName: Category, index) => (
        <Button
          key={index}
          variant="grey"
          isActive={categoryName === currCategory}
          onClick={() => setCurrCategory(categoryName)}
        >
          {categoryName}
        </Button>
      ))}
    </div>
  );
};

export default FeedbackCategories;
