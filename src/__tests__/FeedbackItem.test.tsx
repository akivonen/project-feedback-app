import { cleanup, render, screen } from '@testing-library/react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import FeedbackItem, { FeedbackItemSkeleton } from '@/components/feedback/FeedbackItem';
import { defaultFeedback } from '@/__fixtures__/feedback';

const mockLink = vi.fn(({ children, ...props }: React.ComponentProps<'a'>) => (
  <a {...props}>{children}</a>
));

vi.mock('next/link', () => {
  return {
    default: ({ children, ...props }: React.ComponentProps<'a'>) =>
      mockLink({ children, ...props }),
  };
});

vi.mock('@/components/buttons/UpvoteButton', () => ({
  default: vi.fn(({ feedbackId, upvoters, isRoadmap }) => (
    <button aria-label={`Upvote (${feedbackId})`} data-testid="upvote-button">
      {upvoters.length} upvotes {isRoadmap ? 'roadmap' : ''}
    </button>
  )),
}));

vi.mock('@/components/roadmap/RoadmapHomeWidgetItem', () => ({
  default: vi.fn(({ state, color }) => (
    <div data-testid="roadmap-widget" aria-label={`Status: ${state}`}>
      {state} ({color})
    </div>
  )),
}));

describe('FeedbackItem', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
    vi.resetAllMocks();
  });

  it('renders feedback details correctly', () => {
    render(<FeedbackItem feedback={defaultFeedback} />);

    expect(screen.getByText('Test feedback')).toBeInTheDocument();
    expect(screen.getByText('Test description')).toHaveAttribute(
      'aria-describedby',
      'feedback-feedback1'
    );
    expect(screen.getByText('Feature')).toHaveClass('bg-light-200', 'text-blue-300');
    expect(screen.getByTestId('upvote-button')).toHaveTextContent('1 upvotes');
    expect(screen.getByTestId('comments-icon')).toBeInTheDocument();
    expect(screen.getByText('3')).toHaveClass('text-dark-400');
  });

  it('renders feedback as a link when isLink is true', () => {
    render(<FeedbackItem feedback={defaultFeedback} isLink />);
    expect(screen.getByRole('link', { name: /Test feedback/ })).toHaveAttribute(
      'href',
      '/feedbacks/feedback1'
    );
  });

  it('doesn`t render feedback as a link when isLink is false', () => {
    render(<FeedbackItem feedback={defaultFeedback} />);
    expect(screen.queryByRole('link')).not.toBeInTheDocument();
  });

  it('applies default styles when isRoadmap is false', () => {
    render(<FeedbackItem feedback={defaultFeedback} />);
    const container = screen.getByText('Test feedback').parentElement?.parentElement;
    expect(container).toHaveClass('md:px-8', 'md:py-7', 'md:flex-nowrap');
    expect(container).not.toHaveClass('md:p-5', 'md:h-[250px]', 'border-t-[6px]');
    expect(screen.queryByTestId('roadmap-widget')).not.toBeInTheDocument();
  });

  it('applies roadmap styles when isRoadmap is true', () => {
    render(<FeedbackItem feedback={defaultFeedback} isRoadmap />);
    const container = screen.getByText('Test feedback').parentElement?.parentElement;
    expect(container).toHaveClass(
      'md:p-5',
      'md:h-[250px]',
      'border-t-[6px]',
      'border-t-orange-200'
    );
    expect(container).not.toHaveClass('md:px-8', 'md:py-7', 'md:flex-nowrap');
    expect(screen.getByTestId('roadmap-widget')).toHaveTextContent('Suggestion (orange-200)');
  });

  it('displays zero comments with light-500 color', () => {
    const feedbackWithZeroComments = { ...defaultFeedback, comments: [] };
    render(<FeedbackItem feedback={feedbackWithZeroComments} />);
    expect(screen.getByText('0')).toHaveClass('text-light-500');
  });

  it('displays with empty upvotes correctly', () => {
    const feedbackWithZeroUpvotes = { ...defaultFeedback, upvotes_count: 0, upvotes: [] };
    render(<FeedbackItem feedback={feedbackWithZeroUpvotes} />);
    expect(screen.getByTestId('upvote-button')).toHaveTextContent('0 upvotes');
  });

  it('has correct accesibility attrs', () => {
    render(<FeedbackItem feedback={defaultFeedback} />);
    const commentsSpan = screen.getByText('3').closest('span');
    expect(commentsSpan).toHaveAttribute('aria-label', 'Comments: 3');
  });

  it('uses memo to prevent unnecessary re-renders', () => {
    const { rerender } = render(<FeedbackItem feedback={defaultFeedback} />);
    const initialContainer = screen.getByText('Test feedback').parentElement?.parentElement;
    rerender(<FeedbackItem feedback={defaultFeedback} />);
    expect(screen.getByText('Test feedback').parentElement?.parentElement).toBe(initialContainer);
  });
});

describe('FeedbackItemSkeleton', () => {
  it('renders skeleton with default styles', () => {
    render(<FeedbackItemSkeleton />);
    const skeleton = screen.getByTestId('feedback-item-skeleton');
    expect(skeleton).toHaveClass('animate-pulse', 'bg-white', 'p-6');
    expect(skeleton).not.toHaveClass('border-t-[6px]', 'border-t-orange-200');
  });

  it('renders skeleton with roadmap styles', () => {
    render(<FeedbackItemSkeleton isRoadmap roadmapColor="purple-200" />);
    const skeleton = screen.getByTestId('feedback-item-skeleton');
    expect(skeleton).toHaveClass('animate-pulse', 'border-t-purple-200', 'md:h-[250px]', 'md:p-5');
    expect(skeleton).not.toHaveClass('md:flex-nowrap', 'md:px-8', 'md:py-7');
  });
});
