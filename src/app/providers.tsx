'use client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import FilterContextProvider from '@/contexts/FilterContext';

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <FilterContextProvider>{children}</FilterContextProvider>
    </QueryClientProvider>
  );
}
