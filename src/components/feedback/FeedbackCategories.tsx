'use client';
import React from 'react';
import { categoryOptions, categoryNamesMap } from '@/lib/filter';
import Button from '../buttons/Button';
import useFilter from '@/hooks/useFilters';

export default function FeedbackCategories() {
  const { category, sort } = useFilter();

  return (
    <div className="flex min-w-[223px] flex-wrap gap-x-[8px] gap-y-[14px] rounded-lg bg-white p-6">
      {categoryOptions.map((categoryOption, index) => (
        <Button
          key={index}
          href={`/${categoryOption}/${sort}`}
          variant="grey"
          isActive={categoryOption === category}
        >
          {categoryNamesMap[categoryOption]}
        </Button>
      ))}
    </div>
  );
}
