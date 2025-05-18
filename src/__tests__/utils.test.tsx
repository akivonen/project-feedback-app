import { describe, it, expect, vi } from 'vitest';
import { isValidUUID, handleError, isInUpvotedList } from '@/lib/utils';
import { Upvote } from '@/types';

const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

describe('Utility functions', () => {
  describe('isValidUUID', () => {
    it('returns true for valid UUID', () => {
      expect(isValidUUID('12085673-bc6e-4753-b753-358d9b2bf90d')).toBe(true);
    });
    it('returns true for valid UUID', () => {
      expect(isValidUUID('12085673-BC6E-4753-B753-358D9B2BF90D')).toBe(true);
    });
    it('returns false for invalid UUID(wrong format)', () => {
      expect(isValidUUID('12085673-bc6e-4753-b753-358d9b2bf90')).toBe(false);
    });
    it('returns false for invalid UUID(non-hex chars)', () => {
      expect(isValidUUID('12085673-bc6e-4753-b753-358d9b2bf90g')).toBe(false);
    });
    it('returns false for invalid UUID(empty string)', () => {
      expect(isValidUUID('')).toBe(false);
    });
    it('returns false for non-string input', () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect(isValidUUID(null as any)).toBe(false);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect(isValidUUID(undefined as any)).toBe(false);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect(isValidUUID(123 as any)).toBe(false);
    });
  });

  describe('handleError', () => {
    it('logs and rethrows Error with context', () => {
      const error = new Error('Test error');
      const context = 'Test context';
      expect(() => handleError(error, context)).toThrow('Test context: Test error');
      expect(consoleErrorSpy).toHaveBeenCalledWith('Error in Test context:', error);
    });

    it('logs with type if provided', () => {
      const error = new Error('Test error');
      const context = 'Test context';
      const type = 'Custom';
      expect(() => handleError(error, context, type)).toThrow('Test context: Test error');
      expect(consoleErrorSpy).toHaveBeenCalledWith('Custom Error in Test context:', error);
    });
  });

  describe('isInUpvotedList', () => {
    const upvoters: Upvote[] = [
      { user_id: 'user1', feedback_id: 'feedback1', created_at: new Date(Date.now()) },
      { user_id: 'user2', feedback_id: 'feedback1', created_at: new Date(Date.now()) },
    ];

    it('returns true when userId is it upvoters', () => {
      expect(isInUpvotedList(upvoters, 'user1')).toBe(true);
    });
    it('returns false when userId is it upvoters', () => {
      expect(isInUpvotedList(upvoters, 'user3')).toBe(false);
    });
    it('returns false when userId is undefined', () => {
      expect(isInUpvotedList(upvoters, undefined)).toBe(false);
    });
    it('returns false when upvoters is empty array', () => {
      expect(isInUpvotedList([], 'user1')).toBe(false);
    });
  });
});
