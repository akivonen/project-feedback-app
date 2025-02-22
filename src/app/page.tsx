'use server';
import { getAllFeedbacks } from '@/db/queries/feedbacks';
import Suggestions from './components/suggestions/Suggestions';
import { Suspense } from 'react';
import { Feedback, Roadmap } from '@/types';
import Header from './components/Header';
import { getRoadmap } from '@/services/roadmap';

export default async function Home() {
  const feedbacks: Feedback[] = await getAllFeedbacks();
  const roadmap: Roadmap = getRoadmap(feedbacks);
  return (
    <Suspense fallback={<p>Loading feedbacks...</p>}>
      <Header roadmap={roadmap} />
      <main className="flex-1">
        <Suggestions feedbacks={feedbacks} />
      </main>
    </Suspense>
  );
}
