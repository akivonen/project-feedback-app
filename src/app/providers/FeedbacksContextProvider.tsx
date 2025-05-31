'use client';

import { Feedback } from '@/types';
import { createContext, ReactNode } from 'react';

interface FeedbacksContextType {
  feedbacksPromise: Promise<Feedback[]>;
}

export const FeedbacksContext = createContext<FeedbacksContextType | null>(null);

export default function FeedbacksContextProvider({
  children,
  feedbacksPromise,
}: {
  children: ReactNode;
  feedbacksPromise: Promise<Feedback[]>;
}) {
  return (
    <FeedbacksContext.Provider value={{ feedbacksPromise }}>{children}</FeedbacksContext.Provider>
  );
}
