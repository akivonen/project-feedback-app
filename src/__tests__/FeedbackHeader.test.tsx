import FeedbackHeader from '@/components/feedback/FeedbackHeader';
import { cleanup, render, screen } from '@testing-library/react';
import { useParams, usePathname } from 'next/navigation';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { defaultFeedback } from '@/__fixtures__/feedback';
import { useSession } from 'next-auth/react';

vi.mock('@/components/buttons/Button', () => ({
  default: ({ href, children }: { href: string; children: React.ReactNode }) => (
    <a href={href} data-testid="edit-button">
      {children}
    </a>
  ),
}));

vi.mock('@/components/buttons/GoBackButton', () => ({
  default: () => <button data-testid="go-back-button">Go Back</button>,
}));

vi.mock('next/navigation', () => ({
  useParams: vi.fn(),
  usePathname: vi.fn(),
}));

const mockSessionFeedbackAuthor = {
  data: {
    user: {
      id: '1',
    },
  },
  status: 'authenticated',
} as const;

const mockSessionNotFeedbackAuthor = {
  data: {
    user: {
      id: '2',
    },
  },
  status: 'authenticated',
} as const;

const mockSessionUnauthenticated = {
  data: null,
  status: 'unauthenticated',
} as const;

const mockSessionLoading = {
  data: null,
  status: 'loading',
} as const;

vi.mock('next-auth/react', () => ({
  useSession: vi.fn(() => mockSessionFeedbackAuthor),
}));

describe('FeedbackHeader', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useParams).mockReturnValue({ feedbackId: defaultFeedback.id });
    vi.mocked(usePathname).mockReturnValue('/feedbacks/feedback1');
  });

  afterEach(() => {
    cleanup();
    vi.resetAllMocks();
  });

  it('renders FeedbackHeader correctly when it is feedbackDetails page', () => {
    render(<FeedbackHeader feedback={defaultFeedback} />);
    expect(screen.getByRole('button', { name: 'Go Back' }).parentElement).toHaveClass(
      'flex',
      'justify-between'
    );
    expect(screen.getByTestId('go-back-button')).toBeInTheDocument();
    expect(screen.queryByTestId('edit-button')).not.toBeInTheDocument();
  });

  it('shows edit button when it is feedbackDetails page', () => {
    const feedbackWithAuthorUserId = { ...defaultFeedback, user_id: '1' };
    render(<FeedbackHeader feedback={feedbackWithAuthorUserId} />);
    expect(screen.getByTestId('edit-button')).toBeInTheDocument();
  });

  it('doesn`t show edit button when it is not feedbackDetails page', () => {
    vi.mocked(useParams).mockReturnValue({});
    vi.mocked(usePathname).mockReturnValue('/feedbacks/add');
    render(<FeedbackHeader feedback={defaultFeedback} />);
    expect(screen.queryByTestId('edit-button')).not.toBeInTheDocument();
  });

  it('doesn`t show edit button when user is not the feedback author', () => {
    vi.mocked(useSession).mockReturnValue(
      mockSessionNotFeedbackAuthor as ReturnType<typeof useSession>
    );
    render(<FeedbackHeader feedback={defaultFeedback} />);
    expect(screen.queryByTestId('edit-button')).not.toBeInTheDocument();
  });

  it('doesn`t show edit button when user is unauthenticated', () => {
    vi.mocked(useSession).mockReturnValue(
      mockSessionUnauthenticated as ReturnType<typeof useSession>
    );
    render(<FeedbackHeader feedback={defaultFeedback} />);
    expect(screen.queryByTestId('edit-button')).not.toBeInTheDocument();
  });

  it('shows skeleton when session is loading', () => {
    vi.mocked(useSession).mockReturnValue(mockSessionLoading as ReturnType<typeof useSession>);
    render(<FeedbackHeader feedback={defaultFeedback} />);
    expect(screen.getByTestId('go-back-button')).toBeInTheDocument();
    expect(screen.getByTestId('skeleton-placeholder')).toHaveClass('animate-pulse');
  });
});
