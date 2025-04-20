import React from 'react';
import { MainHeader, MainHeaderAuth } from '../../components/header/';
import { SuggestionsPanel, SuggestionsListSkeleton } from '@/components/suggestions/';
import { RoadmapHomeWidgetSkeleton } from '@/components/roadmap/';
import { sortOptions } from '@/lib/filter';
import { Burger, Dropdown } from '@/components/common/';
import { FeedbackCategories } from '@/components/feedback/';
import Link from 'next/link';

export default function HomeLoading() {
  return (
    <div className="flex flex-col gap-x-[30px] md:gap-y-10 md:px-10 md:pt-[56px] lg:flex-row lg:px-[min(165px,8%)] xl:pt-[94px]">
      <MainHeader>
        <div className="md:flex md:flex-1">
          <div className="flex w-full bg-[url('/images/header/mobile/background-header.png')] bg-[length:100%_100%] bg-no-repeat px-6 py-4 md:min-w-[223px] md:rounded-lg md:bg-[url('/images/header/tablet/background-header.png')] md:pb-6 lg:min-h-[137px] xl:max-w-[255px] xl:bg-[url('/images/header/desktop/background-header.png')]">
            <div className="flex w-full items-center justify-between pr-4 md:items-end md:p-0">
              <Link href="/" className="flex flex-col md:justify-end">
                <h1 className="text-[15px] text-white md:text-[20px]">Frontend Mentor</h1>
                <span className="text-sm text-white/75 md:text-[15px]">Feedback Board</span>
              </Link>
              <MainHeaderAuth />
            </div>
            <Burger>
              <div className="absolute right-0 top-[74px] flex h-[calc(100vh-74px)] max-w-[271] flex-col gap-y-6 bg-light-200 p-6 md:hidden">
                <FeedbackCategories sortFilterParam="most-upvotes" categoryFilterParam="all" />
                <RoadmapHomeWidgetSkeleton />
              </div>
            </Burger>
          </div>
        </div>

        <div className="hidden md:flex md:flex-1">
          <FeedbackCategories sortFilterParam="most-upvotes" categoryFilterParam="all" />
        </div>
        <div className="hidden md:flex md:flex-1">
          <RoadmapHomeWidgetSkeleton />
        </div>
      </MainHeader>
      <main className="flex-1">
        <section id="suggestions">
          <SuggestionsPanel suggestionsCount={0}>
            <Dropdown
              dropdownOptions={sortOptions}
              selectedOption="most-upvotes"
              categoryFilterParam="all"
            />
          </SuggestionsPanel>
          <SuggestionsListSkeleton />
        </section>
      </main>
    </div>
  );
}
