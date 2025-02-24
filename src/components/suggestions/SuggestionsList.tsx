import React from 'react';
import SuggestionListItem from './SuggestionsListItem';
import { Feedback } from '@/types';

type SuggestionsListProps = {
  productRequests: Feedback[];
};

const SuggestionsList: React.FC<SuggestionsListProps> = ({ productRequests }) => {
  return (
    <ul className="mx-6 mb-12 mt-8 flex flex-col items-center gap-y-4 md:mx-0 md:mt-6">
      {productRequests &&
        productRequests.map((feedback) => (
          <li className="w-full" key={feedback.id}>
            <SuggestionListItem feedback={feedback} />
          </li>
        ))}
    </ul>
  );
};

export default SuggestionsList;
