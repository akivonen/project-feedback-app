import { cleanup, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { createUpvoteAction, deleteUpvoteAction } from '@/app/actions/upvoteActions';
import UpvoteButton from '@/components/buttons/UpvoteButton';
import { NextRouter } from 'next/router';
import { Upvote } from '@/types';

const mockSessionAuthenticated = {
  data: {
    user: {
      id: '1',
    },
  },
  status: 'authenticated',
} as const;

const mockSessionUnauthenticated = {
  data: {
    user: null,
  },
  status: 'authenticated',
} as const;

const mockSessionLoading = {
  data: { user: null },
  status: 'loading',
} as const;

const mockUpvoters: Upvote[] = [
  { user_id: '1', feedback_id: '1', created_at: new Date(Date.now()) },
];

const mockRouter: Partial<NextRouter> = {
  push: vi.fn(),
};

vi.mock('next-auth/react', () => ({
  useSession: vi.fn(() => mockSessionAuthenticated),
}));

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(() => mockRouter as NextRouter),
}));

vi.mock('react-toastify', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
    warn: vi.fn(),
  },
}));

vi.mock('@/app/actions/upvoteActions', () => ({
  createUpvoteAction: vi.fn(() => Promise.resolve()),
  deleteUpvoteAction: vi.fn(() => Promise.resolve()),
}));

describe('UpvoteButton', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useSession).mockReturnValue(mockSessionAuthenticated as any);
    vi.mocked(useRouter).mockReturnValue(mockRouter as any);
    vi.mocked(toast.success).mockClear();
    vi.mocked(toast.error).mockClear();
    vi.mocked(toast.warn).mockClear();
    vi.mocked(createUpvoteAction).mockResolvedValue(undefined);
    vi.mocked(deleteUpvoteAction).mockResolvedValue(undefined);
  });

  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  it('renders button when not upvoted', () => {
    render(<UpvoteButton feedbackId="1" upvoters={[]} />);
    const button = screen.getByRole('button', { name: /Upvote \(0\)/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('0');
    expect(button).toHaveClass('bg-light-300', 'text-blue-300');
    const arrow = screen.getByTestId('arrow-up');
    expect(button).toContainElement(arrow);
  });

  it('renders button when upvoted', () => {
    render(<UpvoteButton feedbackId="1" upvoters={mockUpvoters} />);
    const button = screen.getByRole('button', { name: /Upvote \(1\)/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('1');
    expect(button).toHaveClass('bg-blue-300', 'text-white');
  });

  it('renders with roadmap styles when isRoadmap is true', () => {
    render(<UpvoteButton feedbackId="1" upvoters={[]} isRoadmap />);
    const button = screen.getByRole('button', { name: /Upvote \(0\)/i });
    expect(button).toHaveClass('lg:py-2.5');
    expect(button).not.toHaveClass(
      'md:pb-2',
      'md:pt-3',
      'md:max-w-10',
      'md:order-first',
      'md:h-fit',
      'md:flex-col'
    );
  });

  it('toggles upvote when clicked and authenticated', async () => {
    render(<UpvoteButton feedbackId="1" upvoters={[]} />);
    const button = screen.getByRole('button', { name: /Upvote \(0\)/i });

    await userEvent.click(button);
    expect(createUpvoteAction).toHaveBeenCalledWith('1', '1');
    expect(button).toHaveTextContent('1');
    expect(button).toHaveClass('bg-blue-300', 'text-white');
    expect(button).toHaveAttribute('aria-label', 'Remove upvote (1)');

    await userEvent.click(button);
    expect(deleteUpvoteAction).toHaveBeenCalledWith('1', '1');
    expect(button).toHaveTextContent('0');
    expect(button).toHaveClass('bg-light-300', 'text-blue-300');
    expect(button).not.toHaveClass('bg-blue-300', 'text-white');
    expect(button).toHaveAttribute('aria-label', 'Upvote (0)');
  });

  it('redirects and shows toast when clicked and unauthenticated', async () => {
    vi.mocked(useSession).mockReturnValue(mockSessionUnauthenticated as any);
    render(<UpvoteButton feedbackId="1" upvoters={[]} />);
    const button = screen.getByRole('button', { name: /Upvote \(0\)/i });

    await userEvent.click(button);
    expect(toast.warn).toHaveBeenCalledWith('Please signin or signup to upvote.');
    expect(mockRouter.push).toHaveBeenCalled();
    expect(button).toHaveTextContent('0');
    expect(createUpvoteAction).not.toHaveBeenCalled();
  });

  it('disables button when status is loading', () => {
    vi.mocked(useSession).mockReturnValue(mockSessionLoading as any);
    render(<UpvoteButton feedbackId="1" upvoters={[]} />);
    const button = screen.getByRole('button', { name: /Upvote \(0\)/i });
    expect(button).toBeDisabled();
    expect(button).toHaveClass('opacity-50', 'cursor-not-allowed');
    expect(button).not.toHaveClass('hover:bg-light-400');
  });

  it('updates state when upvoters prop changes', () => {
    const { rerender } = render(<UpvoteButton feedbackId="1" upvoters={[]} />);
    let button = screen.getByRole('button', { name: /Upvote \(0\)/i });
    expect(button).toHaveTextContent('0');
    expect(button).toHaveClass('bg-light-300', 'text-blue-300');

    rerender(<UpvoteButton feedbackId="1" upvoters={mockUpvoters} />);
    button = screen.getByRole('button', { name: /Remove upvote \(1\)/i });
    expect(button).toHaveTextContent('1');
    expect(button).toHaveClass('bg-blue-300', 'text-white');
  });

  it('reverts state and shows error on upvote failure', async () => {
    vi.mocked(createUpvoteAction).mockRejectedValue(new Error('Upvote failed'));
    render(<UpvoteButton feedbackId="1" upvoters={[]} />);
    const button = screen.getByRole('button', { name: /Upvote \(0\)/i });

    await userEvent.click(button);

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('Upvote failed');
      expect(button).toHaveTextContent('0');
      expect(button).toHaveClass('bg-light-300', 'text-blue-300');
    });
  });

  it('reverts state and shows error on downvote failure', async () => {
    vi.mocked(deleteUpvoteAction).mockRejectedValue(new Error('Downvote failed'));
    render(<UpvoteButton feedbackId="1" upvoters={mockUpvoters} />);
    const button = screen.getByRole('button', { name: /Remove upvote \(1\)/i });

    await userEvent.click(button);

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('Downvote failed');
      expect(button).toHaveTextContent('1');
      expect(button).toHaveClass('bg-blue-300', 'text-white');
    });
  });

  it('has correct accessibility attributes', () => {
    render(<UpvoteButton feedbackId="1" upvoters={[]} />);
    const button = screen.getByRole('button', { name: /Upvote \(0\)/i });
    expect(button).toHaveAttribute('aria-label', 'Upvote (0)');
    const arrow = screen.getByTestId('arrow-up');
    expect(arrow).toHaveAttribute('aria-hidden', 'true');
  });
});
