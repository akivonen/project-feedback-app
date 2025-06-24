import { Upvote } from '@/types';
export function isValidUUID(str: string): boolean {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  return uuidRegex.test(str);
}

export function handleError(error: unknown, context: string, type?: string): never {
  console.error(`${type ? type + ' ' : ''}Error in ${context}:`, error);
  throw error instanceof Error
    ? new Error(`${context}: ${error.message}`)
    : new Error(`Unexpected error in ${context}`);
}

export const isInUpvotedList = (upvoters: Upvote[], userId: string | undefined): boolean =>
  !!userId && upvoters.some((vote: Upvote) => vote.user_id === userId);

export const toCamelCase = (str: string): string =>
  str.includes(' ')
    ? str
        .split(' ')
        .map((word, i) => {
          return i === 0 ? word : `${word[0].toUpperCase()}${word.slice(1)}`;
        })
        .join('')
    : str;

export const toCapitalCaseWithSpaces = (str: string): string =>
  str.includes(' ')
    ? str
        .split(' ')
        .map((word) => `${word[0].toUpperCase()}${word.slice(1)}`)
        .join(' ')
    : `${str[0].toUpperCase()}${str.slice(1)}`;
