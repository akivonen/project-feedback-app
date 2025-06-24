'use client';
import React from 'react';
import Image from 'next/image';
import Button from '../buttons/Button';
import Dropdown from '../common/Dropdown';
import { CategoryOption, SortOption, sortOptions } from '@/lib/filter';
import useFilter from '@/hooks/useFilters';

export default function SuggestionsPanel({ suggestionsCount }: { suggestionsCount: number }) {
  const { category, sort } = useFilter();

  return (
    <div
      className="flex items-center justify-between bg-dark-300 px-6 py-2 align-middle md:rounded-lg lg:w-full"
      role="toolbar"
      aria-label="Suggestions controls"
    >
      <div id="sort-suggestions" className="flex items-center" aria-label="Sort suggestions">
        <div className="mr-[38px] hidden md:flex">
          <div>
            <Image
              width="23"
              height="24"
              src="/icons/icon-suggestions.svg"
              alt="Suggestion icon"
              loading="lazy"
            />
          </div>
          <span className="ml-4 text-[18px] font-bold text-white">
            {suggestionsCount || 0} Suggestions
          </span>
        </div>
        <Dropdown
          dropdownOptions={sortOptions}
          selectedOption={sort as SortOption}
          categoryFilterParam={category as CategoryOption}
        />
      </div>
      <Button size="lg" variant="purple" href="/feedbacks/add">
        + Add Feedback
      </Button>
    </div>
  );
}
