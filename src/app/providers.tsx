'use client';
import getQueryClient from '@/services/getQueryClient';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryStreamedHydration } from '@tanstack/react-query-next-experimental';
import FilterContextProvider from '@/contexts/FilterContext';

const queryClient = getQueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryStreamedHydration>
        <FilterContextProvider>{children}</FilterContextProvider>
      </ReactQueryStreamedHydration>
    </QueryClientProvider>
  );
}
