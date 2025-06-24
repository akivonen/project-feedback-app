import React, { Suspense } from 'react';
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
import { LoadingSpinner } from '@/components/common';

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
  const handledSuggestions = getSortedSuggestionsByCategories(feedbacks, category, sort);

  return (
    <div className="flex flex-col gap-x-[30px] md:gap-y-10 md:px-10 md:pt-[56px] lg:flex-row lg:px-[min(165px,8%)] xl:pt-[94px]">
      <MainHeader />
      <main id="main-content" aria-labelledby="suggestions-heading" className="flex-1">
        <Suspense fallback={<LoadingSpinner />}>
          <section id="suggestions" aria-labelledby="suggestions-heading">
            <SuggestionsPanel suggestionsCount={handledSuggestions.length} />
            {handledSuggestions.length > 0 ? (
              <SuggestionsList suggestions={handledSuggestions} />
            ) : (
              <SuggestionsNoFeedback />
            )}
          </section>
        </Suspense>
      </main>
    </div>
  );
}
