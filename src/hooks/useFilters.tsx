'use client';

import { useParams } from 'next/navigation';

export default function useFilter() {
  const params = useParams<{ filter?: string[] }>();
  const category = params.filter?.[0] ?? 'all';
  const sort = params.filter?.[1] ?? 'most-upvotes';
  return { category, sort };
}
