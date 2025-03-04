'use client';
import React from 'react';
import Image from 'next/image';
import Button from '../buttons/Button';

type SuggestionsProps = {
  suggestionsCount: number;
  children: React.ReactNode;
};
const SuggestionsPanel: React.FC<SuggestionsProps> = ({ suggestionsCount, children }) => {
  return (
    <div className="flex items-center justify-between bg-dark-300 px-6 py-2 align-middle md:rounded-lg lg:w-full">
      <div id="sort-by" className="flex items-center" aria-label="Sort by">
        <div className="mr-[38px] hidden md:flex">
          <div>
            <Image width="23" height="24" src="/icons/icon-suggestions.svg" alt="icon-suggestions" />
          </div>
          <span className="ml-4 text-[18px] font-bold text-white">
            {suggestionsCount || 0} Suggestions
          </span>
        </div>
        {children}
      </div>
      <Button size="lg" variant="purple" href="/feedbacks/add">
        + Add Feedback
      </Button>
    </div>
  );}


export default SuggestionsPanel;