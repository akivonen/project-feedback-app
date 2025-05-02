import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { cleanup } from '@testing-library/react';
import MessageForm from '@/components/forms/MessageForm';
import { useParams } from 'next/navigation';
import { toast } from 'react-toastify';
import { createCommentAction } from '@/app/actions/commentActions';
import { createReplyAction } from '@/app/actions/replyActions';

vi.mock('next/navigation', () => ({
  useParams: vi.fn(),
}));

vi.mock('react-toastify', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

vi.mock('@/app/actions/commentActions', () => ({
  createCommentAction: vi.fn(() => Promise.resolve()),
}));

vi.mock('@/app/actions/replyActions', () => ({
  createReplyAction: vi.fn(() => Promise.resolve()),
}));

describe('MessageForm', () => {
  const userId = 'user1';
  const defaultProps = { user_id: userId };

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useParams).mockReturnValue({ feedbackId: 'feedback1' });
    vi.mocked(createCommentAction).mockResolvedValue(undefined);
    vi.mocked(createReplyAction).mockResolvedValue(undefined);
    vi.mocked(toast.success).mockClear();
    vi.mocked(toast.error).mockClear();
  });

  afterEach(() => {
    cleanup();
  });

  it('renders comment form with textarea, character count, and submit button', () => {
    render(<MessageForm {...defaultProps} />);
    expect(screen.getByRole('textbox', { name: /type your comment here/i })).toBeInTheDocument();
    expect(screen.getByText('250 characters left')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /post comment/i })).toBeInTheDocument();
    expect(screen.getByRole('form', { name: /comment form/i })).toBeInTheDocument();
  });

  it('renders reply form with correct styles and button text', () => {
    render(<MessageForm {...defaultProps} isReplyForm commentId="comment1" replyingTo="user2" />);
    const form = screen.getByRole('form', { name: /reply form/i });
    expect(screen.getByRole('textbox', { name: /type your reply here/i })).toBeInTheDocument();
    expect(screen.queryByText(/characters left/i)).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: /post reply/i })).toBeInTheDocument();
    expect(form).toHaveClass('mt-6 flex flex-col items-end gap-4');
  });

  it('applies correct id to form when provided', () => {
    render(<MessageForm {...defaultProps} id="custom-form-id" />);
    expect(screen.getByRole('form', { name: /comment form/i })).toHaveAttribute(
      'id',
      'custom-form-id'
    );
  });

  it('submits comment successfully', async () => {
    render(<MessageForm {...defaultProps} />);
    const textarea = screen.getByRole('textbox', { name: /type your comment here/i });
    const button = screen.getByRole('button', { name: /post comment/i });

    await userEvent.type(textarea, 'Great feature!');
    await userEvent.click(button);

    await waitFor(() => {
      expect(createCommentAction).toHaveBeenCalledWith({
        feedback_id: 'feedback1',
        content: 'Great feature!',
        user_id: userId,
      });
      expect(toast.success).toHaveBeenCalledWith('Comment posted');
      expect(textarea).toHaveValue('');
    });
  });

  it('submits reply successfully', async () => {
    render(<MessageForm {...defaultProps} isReplyForm commentId="comment1" replyingTo="user2" />);
    const textarea = screen.getByRole('textbox', { name: /type your reply here/i });
    const button = screen.getByRole('button', { name: /post reply/i });

    await userEvent.type(textarea, 'Thanks for the feedback!');
    await userEvent.click(button);

    await waitFor(() => {
      expect(createReplyAction).toHaveBeenCalledWith({
        comment_id: 'comment1',
        replying_to: 'user2',
        content: 'Thanks for the feedback!',
        user_id: userId,
      });
      expect(toast.success).toHaveBeenCalledWith('Reply posted');
      expect(textarea).toHaveValue('');
    });
  });

  it('displays validation error for empty comment', async () => {
    render(<MessageForm {...defaultProps} />);
    const button = screen.getByRole('button', { name: /post comment/i });

    await userEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText('Can`t be empty')).toBeInTheDocument();
      expect(screen.getByRole('textbox')).toHaveAttribute('aria-describedby', 'body-error');
      expect(createCommentAction).not.toHaveBeenCalled();
      expect(button).not.toBeDisabled();
    });
  });

  it('displays error toast on submission failure', async () => {
    vi.mocked(createCommentAction).mockRejectedValue(new Error('Submission failed'));
    render(<MessageForm {...defaultProps} />);
    const textarea = screen.getByRole('textbox', { name: /type your comment here/i });
    const button = screen.getByRole('button', { name: /post comment/i });

    await userEvent.type(textarea, 'Great feature!');
    await userEvent.click(button);

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('Submission failed');
      expect(textarea).toHaveValue('Great feature!');
    });
  });

  it('disables button while submitting', async () => {
    vi.mocked(createCommentAction).mockImplementation(
      () => new Promise((resolve) => setTimeout(resolve, 500))
    );
    render(<MessageForm {...defaultProps} />);
    const textarea = screen.getByRole('textbox', { name: /type your comment here/i });
    const button = screen.getByRole('button', { name: /post comment/i });

    await userEvent.type(textarea, 'Great feature!');
    await userEvent.click(button);

    expect(button).toHaveTextContent('Posting...');
    expect(button).toBeDisabled();

    await waitFor(() => {
      expect(button).toHaveTextContent('Post Comment');
      expect(button).not.toBeDisabled();
    });
  });

  it('updates character count as user types', async () => {
    render(<MessageForm {...defaultProps} />);
    const textarea = screen.getByRole('textbox', { name: /type your comment here/i });

    await userEvent.type(textarea, 'Hello');

    expect(screen.getByText('245 characters left')).toBeInTheDocument();
  });

  it('prevents typing beyond maxLength', async () => {
    render(<MessageForm {...defaultProps} />);
    const textarea = screen.getByRole('textbox', { name: /type your comment here/i });

    const longText = 'a'.repeat(251);
    await userEvent.type(textarea, longText);

    expect(textarea).toHaveValue('a'.repeat(250));
    expect(screen.getByText('0 characters left')).toBeInTheDocument();
  });

  it('handles non-string feedbackId gracefully', async () => {
    vi.mocked(useParams).mockReturnValue({ feedbackId: ['feedback1'] });
    render(<MessageForm {...defaultProps} />);
    const textarea = screen.getByRole('textbox', { name: /type your comment here/i });
    const button = screen.getByRole('button', { name: /post comment/i });

    await userEvent.type(textarea, 'Great feature!');
    await userEvent.click(button);

    await waitFor(() => {
      expect(createCommentAction).not.toHaveBeenCalled();
      expect(toast.error).toHaveBeenCalledWith('Invalid feedback_id');
    });
  });
});
