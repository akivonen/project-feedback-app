import React from 'react';
import Suggestions from '../components/suggestions/Suggestions';
import Header from '../components/MainHeader';
import { Suspense } from 'react';
import LoadingSpinner from '@/components/LoadingSpinner';

export default async function Home() {
  return (
    <div className="flex flex-col gap-x-[30px] md:gap-y-10 md:px-10 md:pt-[56px] lg:flex-row lg:px-[min(165px,8%)] xl:pt-[94px]">
      <Header />
      <main className="flex-1">
        <Suspense fallback={<LoadingSpinner />}>
          <Suggestions />
        </Suspense>
      </main>
    </div>
  );
}
