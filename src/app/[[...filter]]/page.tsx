import React from 'react';
import { MainHeader } from '../../components/header/';
import {
  SuggestionsPanel,
  SuggestionsList,
  SuggestionsNoFeedback,
} from '@/components/suggestions/';
import { getAllFeedbacksAction } from '../actions/feedbackActions';
import {
  categoryOptions,
  sortOptions,
  getSortedSuggestionsByCategories,
  parseFilterParams,
} from '@/lib/filter';

type HomePageProps = {
  params: Promise<{ filter?: string[] }>;
};

export const revalidate = 3600;

export async function generateStaticParams() {
  const categories = categoryOptions;
  const sorts = sortOptions;

  return categories.flatMap((category) =>
    sorts.map((sort) => ({
      filter: [category, sort],
    }))
  );
}

export default async function Home({ params }: HomePageProps) {
  const { filter } = await params;
  const { category, sort } = parseFilterParams(filter);
  const feedbacks = await getAllFeedbacksAction();
  const suggestions = feedbacks?.filter((f) => f.status === 'Suggestion');
  const handledSuggestions = getSortedSuggestionsByCategories(suggestions, category, sort);

  return (
    <div className="flex flex-col gap-x-[30px] md:gap-y-10 md:px-10 md:pt-[56px] lg:flex-row lg:px-[min(165px,8%)] xl:pt-[94px]">
      <MainHeader />
      <main className="flex-1">
        <section id="suggestions">
          <SuggestionsPanel suggestionsCount={handledSuggestions.length} />
          {handledSuggestions.length > 0 ? (
            <SuggestionsList suggestions={handledSuggestions} />
          ) : (
            <SuggestionsNoFeedback />
          )}
        </section>
      </main>
    </div>
  );
}
