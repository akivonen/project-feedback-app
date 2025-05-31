import React from 'react';
import { FeedbackItem } from './index';
import { FeedbackItemSkeleton } from '../feedback/FeedbackItem';
import { Feedback } from '@/types';

export function SuggestionsListSkeleton() {
  return (
    <ul className="mx-6 mb-12 mt-8 flex flex-col items-center gap-y-4 md:mx-0 md:mt-6">
      {[...Array(5)].map((_, i) => (
        <li key={i} className="w-full">
          <FeedbackItemSkeleton />
        </li>
      ))}
    </ul>
  );
}

export default function SuggestionsList({ suggestions }: { suggestions: Feedback[] }) {
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
}
