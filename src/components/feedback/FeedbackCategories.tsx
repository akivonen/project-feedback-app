'use client';
import React from 'react';
import { categoryOptions, categoryNamesMap, CategoryOption, SortOption } from '@/lib/filter';
import Button from '../buttons/Button';

type FeedbackCategoriesProps = {
  sortFilterParam: SortOption;
  categoryFilterParam: CategoryOption;
};

const FeedbackCategories: React.FC<FeedbackCategoriesProps> = ({
  sortFilterParam,
  categoryFilterParam,
}) => {
  return (
    <div className="flex min-w-[223px] flex-wrap gap-x-[8px] gap-y-[14px] rounded-lg bg-white p-6">
      {categoryOptions.map((categoryOption, index) => (
        <Button
          key={index}
          href={`/${categoryOption}/${sortFilterParam}`}
          variant="grey"
          isActive={categoryOption === categoryFilterParam}
        >
          {categoryNamesMap[categoryOption]}
        </Button>
      ))}
    </div>
  );
};

export default FeedbackCategories;
