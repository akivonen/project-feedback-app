'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import SuggestionsList from './SuggestionsList';
import AddFeedbackButton from '../AddFeedbackButton';
import SuggestionsNoFeedback from './SuggestionsNoFeedback';
import SuggestionsSorting from './SuggestionsSorting';
import { Feedback } from '@/types';
import { useQuery } from '@tanstack/react-query';
import { getFeedbacksHandler } from '@/services/feedbacks';
import useFilter from '@/hooks/useFilter';

type SortingFunction = (first: Feedback, second: Feedback) => number;

const sortingOptionsMap: Record<string, SortingFunction> = {
  'Most upvotes': (first: Feedback, second: Feedback) => second.upvotes - first.upvotes,
  'Least upvotes': (first: Feedback, second: Feedback) => first.upvotes - second.upvotes,
  'Most comments': (first: Feedback, second: Feedback) => first.commentCount - second.commentCount,
  'Least comments': (first: Feedback, second: Feedback) => second.commentCount - first.commentCount,
};

const Suggestions: React.FC = () => {
  const sortingOptions = Object.keys(sortingOptionsMap);
  const [selectedSorting, setSelectedSorting] = useState<string>(sortingOptions[0]);
  const { currCategory } = useFilter();
  const { data: feedbacks, isLoading } = useQuery<Feedback[]>({
    queryKey: ['feedbacks'],
    queryFn: () => getFeedbacksHandler(),
  });
  const suggestions = feedbacks?.filter((f) => f.status === 'suggestion');
  const suggestionsByCategories =
    currCategory === 'All' ? suggestions : suggestions?.filter((s) => s.category === currCategory);
  const sortedSuggestions = suggestionsByCategories?.sort(sortingOptionsMap[selectedSorting]);

  if (isLoading || !sortedSuggestions) {
    return <p>Loading...</p>;
  }

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
      {feedbacks ? (
        <SuggestionsList productRequests={sortedSuggestions} />
      ) : (
        <SuggestionsNoFeedback />
      )}
    </section>
  );
};

export default Suggestions;
