'use client';

import { useEffect } from 'react';

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    console.error('Page error:', error);
  }, [error]);

  return (
    <div className="mt-20 flex h-full w-full flex-col items-center justify-center">
      <h1 className="text-lg text-dark-400">Something went wrong</h1>
      <p className="text-base text-dark-400">{error.message}</p>
      <button className="text-base text-dark-400" onClick={reset}>
        Try again
      </button>
    </div>
  );
}
