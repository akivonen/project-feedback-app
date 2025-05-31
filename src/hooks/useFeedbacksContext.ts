'use client';

import { useContext } from 'react';
import { FeedbacksContext } from '@/app/providers/FeedbacksContextProvider';

export default function useFeedbacksContext() {
  const context = useContext(FeedbacksContext);
  if (!context) {
    throw new Error('useFeedbacksContext must be used within FeedbacksContextProvider');
  }
  return context.feedbacksPromise;
}
