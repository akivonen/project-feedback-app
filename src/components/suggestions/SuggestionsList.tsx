import React from 'react';
import { FeedbackItem } from './index';
import { Feedback } from '@/types';

type SuggestionsListProps = {
  suggestions: Feedback[];
};

const SuggestionsList: React.FC<SuggestionsListProps> = ({ suggestions }) => {
  return (
    <ul className="mx-6 mb-12 mt-8 flex flex-col items-center gap-y-4 md:mx-0 md:mt-6">
      {suggestions &&
        suggestions.map((feedback) => (
          <li className="w-full" key={feedback.id}>
            <FeedbackItem feedback={feedback} isLink />
          </li>
        ))}
    </ul>
  );
};

export default SuggestionsList;
