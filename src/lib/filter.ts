import { Feedback, FilterCategory, Category } from '@/types';
import { notFound } from 'next/navigation';

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

export const filterCategoryNames: FilterCategory[] = Object.values(
  categoryNamesMap
) as FilterCategory[];

export const categoryNames: Category[] = filterCategoryNames.filter((c) => c !== 'All');

export const sortFunctionsMap = {
  'most-upvotes': (first: Feedback, second: Feedback) => second.upvotes_count - first.upvotes_count,
  'least-upvotes': (first: Feedback, second: Feedback) =>
    first.upvotes_count - second.upvotes_count,
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

export const parseFilterParams = (filter: string[] | undefined) => {
  const categoryParam = filter?.[0];
  const sortParam = filter?.[1];
  if (
    (categoryParam && !categoryOptions.includes(categoryParam as CategoryOption)) ||
    (sortParam && !sortOptions.includes(sortParam as SortOption))
  ) {
    notFound();
  }
  const category: CategoryOption = (categoryParam as CategoryOption) || 'all';
  const sort: SortOption = (sortParam as SortOption) || 'most-upvotes';
  return { category, sort };
};

export const getSortedSuggestionsByCategories = (
  suggestions: Feedback[],
  category: CategoryOption,
  sort: SortOption
) => {
  if (!suggestions) {
    return [];
  }

  const suggestionsByCategories =
    category === 'all'
      ? suggestions
      : suggestions?.filter((s) => s.category === categoryNamesMap[category]);
  return suggestionsByCategories.sort(sortFunctionsMap[sort]);
};
