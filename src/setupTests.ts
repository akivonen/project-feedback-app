import { expect, afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';

afterEach(() => {
  cleanup();
});

expect.extend({
  toBeInTheDocument(received) {
    const pass = received instanceof HTMLElement && document.body.contains(received);
    return {
      pass,
      message: () => (pass ? 'Element is in the document' : 'Element is not in the document'),
    };
  },
  // Add other custom matchers if needed
});
