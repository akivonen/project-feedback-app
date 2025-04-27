import '@testing-library/jest-dom';
import { TextEncoder, TextDecoder } from 'util';

// Polyfill TextEncoder and TextDecoder for jsdom
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder as any;

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useParams: jest.fn(() => ({ feedbackId: 'feedback1' })),
}));

jest.mock('next/navigation', () => ({
  useParams: jest.fn(() => ({ feedbackId: 'feedback1' })),
}));

jest.mock('react-toastify', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

jest.mock('next/cache', () => ({
  revalidatePath: jest.fn(),
  revalidateTag: jest.fn(),
  unstable_cache: jest.fn((fn) => fn),
}));

jest.mock('@/app/actions/commentActions', () => ({
  createCommentAction: jest.fn(() => Promise.resolve({})),
}));

jest.mock('@/app/actions/replyActions', () => ({
  createReplyAction: jest.fn(() => Promise.resolve({})),
}));

jest.mock('@/validation', () => ({
  commentSchema: {
    validate: jest.fn(async (values) => {
      const errors: { body?: string } = {};
      const { body } = values;
      if (!body) {
        errors.body = 'Can’t be empty';
      }
      if (body && body.length > 250) {
        errors.body = 'Comment must be 250 characters or less';
      }
      if (Object.keys(errors).length > 0) {
        const error = new Error('Validation failed');
        (error as any).errors = errors;
        throw error;
      }
      return values;
    }),
  },
}));
