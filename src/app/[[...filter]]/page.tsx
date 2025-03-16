import React, { Suspense } from 'react';
import MainHeader from '../../components/MainHeader';
import {
  SuggestionsPanel,
  SuggestionsList,
  SuggestionsNoFeedback,
} from '@/components/suggestions/index';
import LoadingSpinner from '@/components/LoadingSpinner';
import RoadmapHomeWidget from '@/components/roadmap/RoadmapHomeWidget';
import Burger from '@/components/Burger';
import FeedbackCategories from '@/components/feedback/FeedbackCategories';
import { getAllFeedbacksAction } from '../actions/feedback-actions';
import {
  CategoryOption,
  categoryOptions,
  categoryNamesMap,
  sortOptions,
  sortFunctionsMap,
  SortOption,
} from '@/lib/filter';
import { notFound } from 'next/navigation';
import Dropdown from '@/components/Dropdown';

type HomePageProps = {
  params: Promise<{ filter?: string[] }>;
};

export default async function Home({ params }: HomePageProps) {
  const { filter } = await params;
  const categoryParam = filter?.[0];
  const sortParam = filter?.[1];
  if (
    (categoryParam && !categoryOptions.includes(categoryParam as CategoryOption)) ||
    (sortParam && !sortOptions.includes(sortParam as SortOption))
  ) {
    notFound();
  }
  const currCategory: CategoryOption = (categoryParam as CategoryOption) || 'all';
  const currSort: SortOption = (sortParam as SortOption) || 'most-upvotes';
  const feedbacks = await getAllFeedbacksAction();

  const suggestions = feedbacks?.filter((f) => f.status === 'Suggestion');
  const suggestionsByCategories =
    currCategory === 'all'
      ? suggestions
      : suggestions?.filter((s) => s.category === categoryNamesMap[currCategory]);
  const sortedSuggestions = suggestionsByCategories?.sort(sortFunctionsMap[currSort]);

  return (
    <div className="flex flex-col gap-x-[30px] md:gap-y-10 md:px-10 md:pt-[56px] lg:flex-row lg:px-[min(165px,8%)] xl:pt-[94px]">
      <MainHeader>
        <div className="md:flex md:flex-1">
          <div className="flex w-full bg-[url('/images/header/mobile/background-header.png')] bg-[length:100%_100%] bg-no-repeat px-6 py-4 md:min-w-[223px] md:rounded-lg md:bg-[url('/images/header/tablet/background-header.png')] md:pb-6 lg:min-h-[137px] xl:max-w-[255px] xl:bg-[url('/images/header/desktop/background-header.png')]">
            <div className="flex flex-col justify-end">
              <h1 className="text-[15px] text-white md:text-[20px]">Frontend Mentor</h1>
              <span className="text-sm text-white/75 md:text-[15px]">Feedback Board</span>
            </div>
            <Burger>
              <div className="absolute right-0 top-[74px] flex h-[calc(100vh-74px)] max-w-[271] flex-col gap-y-6 bg-light-200 p-6 md:hidden">
                <FeedbackCategories sortFilterParam={currSort} categoryFilterParam={currCategory} />
                <RoadmapHomeWidget feedbacks={feedbacks} />
              </div>
            </Burger>
          </div>
        </div>

        <div className="hidden md:flex md:flex-1">
          <FeedbackCategories sortFilterParam={currSort} categoryFilterParam={currCategory} />
        </div>
        <div className="hidden md:flex md:flex-1">
          <RoadmapHomeWidget feedbacks={feedbacks} />
        </div>
      </MainHeader>
      <main className="flex-1">
        <section id="suggestions">
          <SuggestionsPanel suggestionsCount={sortedSuggestions?.length || 0}>
            <Dropdown
              dropdownOptions={sortOptions}
              selectedOption={currSort}
              categoryFilterParam={currCategory}
            />
          </SuggestionsPanel>
          {suggestions?.length > 0 ? (
            <Suspense fallback={<LoadingSpinner />}>
              <SuggestionsList suggestions={sortedSuggestions} />
            </Suspense>
          ) : (
            <SuggestionsNoFeedback />
          )}
        </section>
      </main>
    </div>
  );
}
