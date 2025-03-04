import { Feedback, Category } from '@/types';

export const categoryNamesMap = {
  all: 'All',
  ui: 'UI',
  ux: 'UX',
  enhancement: 'Enhancement',
  bug: 'Bug',
  feature: 'Feature',
} as const;

export type CategoryOption = keyof typeof categoryNamesMap;

export const categoryOptions: CategoryOption[] = Object.keys(categoryNamesMap) as CategoryOption[];

export const categoryNames: Category[] = Object.values(categoryNamesMap) as Category[];

export const sortFunctionsMap = {
  'most-upvotes': (first: Feedback, second: Feedback) => second.upvotes - first.upvotes,
  'least-upvotes': (first: Feedback, second: Feedback) => first.upvotes - second.upvotes,
  'most-comments': (first: Feedback, second: Feedback) =>
    (first.comments?.length || 0) - (second.comments?.length || 0),
  'least-comments': (first: Feedback, second: Feedback) =>
    (second.comments?.length || 0) - (first.comments?.length || 0),
} as const;

export type SortOption = keyof typeof sortFunctionsMap;

export const sortNamesMap: Record<string, string> = {
  'most-upvotes': 'Most Upvotes',
  'least-upvotes': 'Least Upvotes',
  'most-comments': 'Most Comments',
  'least-comments': 'Least Comments',
};

export const sortOptions: SortOption[] = Object.keys(sortNamesMap) as SortOption[];
