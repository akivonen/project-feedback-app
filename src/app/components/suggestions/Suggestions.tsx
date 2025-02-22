'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import SuggestionsList from './SuggestionsList';
import AddFeedbackButton from '../AddFeedbackButton';
import SuggestionsNoFeedback from './SuggestionsNoFeedback';
import SuggestionsSorting from './SuggestionsSorting';
import { Feedback } from '@/types';

type SuggestionsProps = {
  feedbacks: Feedback[];
};

type SortingFunction = (first: Feedback, second: Feedback) => number;

const sortingOptionsMap: Record<string, SortingFunction> = {
  'Most upvotes': (first: Feedback, second: Feedback) => second.upvotes - first.upvotes,
  'Least upvotes': (first: Feedback, second: Feedback) => first.upvotes - second.upvotes,
  'Most comments': (first: Feedback, second: Feedback) => first.commentCount - second.commentCount,
  'Least comments': (first: Feedback, second: Feedback) => second.commentCount - first.commentCount,
};

const Suggestions: React.FC<SuggestionsProps> = ({ feedbacks }) => {
  const sortingOptions = Object.keys(sortingOptionsMap);
  const [selectedSorting, setSelectedSorting] = useState<string>(sortingOptions[0]);
  const [sortedFeedback, setSortedFeedback] = useState<Feedback[]>(feedbacks);
  useEffect(() => {
    const sortedProducts = feedbacks.sort(sortingOptionsMap[selectedSorting]);
    setSortedFeedback(sortedProducts);
  }, [feedbacks, selectedSorting]);

  return (
    <section id="suggestions">
      <div className="flex items-center justify-between bg-dark-300 px-6 py-2 align-middle md:rounded-lg lg:w-full">
        <div id="sort-by" className="flex items-center">
          <div className="mr-[38px] hidden md:flex">
            <div>
              <Image
                width="23"
                height="24"
                src="./icons/icon-suggestions.svg"
                alt="icon-suggestions"
              />
            </div>
            <span className="ml-4 text-[18px] font-bold text-white">
              {feedbacks?.length || 0} Suggestions
            </span>
          </div>
          <SuggestionsSorting
            sortingOptions={sortingOptions}
            selectedOption={selectedSorting}
            handleChange={setSelectedSorting}
          />
        </div>
        <AddFeedbackButton />
      </div>
      {sortedFeedback ? (
        <SuggestionsList productRequests={sortedFeedback} />
      ) : (
        <SuggestionsNoFeedback />
      )}
    </section>
  );
};

export default Suggestions;
