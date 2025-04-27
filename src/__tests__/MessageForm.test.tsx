import { render, screen, fireEvent, waitFor, act, cleanup } from '@testing-library/react';

import userEvent from '@testing-library/user-event';
import MessageForm from '@/components/forms/MessageForm';
import { useParams } from 'next/navigation';
import { toast } from 'react-toastify';
import { createCommentAction } from '@/app/actions/commentActions';
import { createReplyAction } from '@/app/actions/replyActions';

describe('MessageForm', () => {
  const userId = 'user1';
  const defaultProps = { user_id: userId };

  beforeEach(() => {
    jest.clearAllMocks();
    (useParams as jest.Mock).mockReturnValue({ feedbackId: 'feedback1' });
    (createCommentAction as jest.Mock).mockResolvedValue({});
    (createReplyAction as jest.Mock).mockResolvedValue({});
  });

  afterEach(() => {
    cleanup(); // Clean up DOM after each test
  });

  it('renders comment form with textarea, character count, and button', async () => {
    await act(async () => {
      render(<MessageForm {...defaultProps} />);
    });
    expect(screen.getByLabelText(/type your comment here/i)).toBeInTheDocument();
    expect(screen.getByText('250 characters left')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /post comment/i })).toBeInTheDocument();
    expect(screen.getByRole('form', { name: /comment form/i })).toBeInTheDocument();
  });

  it('renders reply form with correct styles and button text', async () => {
    await act(async () => {
      render(<MessageForm {...defaultProps} isReplyForm commentId="comment1" replyingTo="user2" />);
    });
    expect(screen.getByLabelText(/type your reply here/i)).toBeInTheDocument();
    expect(screen.queryByText(/characters left/i)).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: /post reply/i })).toBeInTheDocument();
    expect(screen.getByRole('form', { name: /reply form/i })).toHaveClass(
      'mt-6 flex flex-col items-end gap-4'
    );
  });

  it('submits comment successfully', async () => {
    await act(async () => {
      render(<MessageForm {...defaultProps} />);
    });
    const textarea = screen.getByLabelText(/type your comment here/i);
    const button = screen.getByRole('button', { name: /post comment/i });

    await act(async () => {
      await userEvent.type(textarea, 'Great feature!');
    });
    await act(async () => {
      fireEvent.submit(button);
    });

    await waitFor(() => {
      expect(createCommentAction).toHaveBeenCalledWith({
        feedback_id: 'feedback1',
        content: 'Great feature!',
        user_id: userId,
      });
      expect(toast.success).toHaveBeenCalledWith('Comment posted');
      expect(textarea).toHaveValue(''); // Form reset
    });
  });

  it('submits reply successfully', async () => {
    await act(async () => {
      render(<MessageForm {...defaultProps} isReplyForm commentId="comment1" replyingTo="user2" />);
    });
    const textarea = screen.getByLabelText(/type your reply here/i);
    const button = screen.getByRole('button', { name: /post reply/i });

    await act(async () => {
      await userEvent.type(textarea, 'Thanks for the feedback!');
    });
    await act(async () => {
      fireEvent.submit(button);
    });

    await waitFor(() => {
      expect(createReplyAction).toHaveBeenCalledWith({
        comment_id: 'comment1',
        replying_to: 'user2',
        content: 'Thanks for the feedback!',
        user_id: userId,
      });
      expect(toast.success).toHaveBeenCalledWith('Reply posted');
      expect(textarea).toHaveValue(''); // Form reset
    });
  });

  it('displays validation error for empty comment', async () => {
    await act(async () => {
      render(<MessageForm {...defaultProps} />);
    });
    const button = screen.getByRole('button', { name: /post comment/i });

    await act(async () => {
      fireEvent.submit(button);
    });

    await waitFor(
      () => {
        expect(screen.getByText('Can`t be empty')).toBeInTheDocument();
        expect(createCommentAction).not.toHaveBeenCalled();
      },
      { timeout: 2000 }
    );
  });

  it('displays error toast on submission failure', async () => {
    (createCommentAction as jest.Mock).mockRejectedValue(new Error('Submission failed'));
    await act(async () => {
      render(<MessageForm {...defaultProps} />);
    });
    const textarea = screen.getByLabelText(/type your comment here/i);
    const button = screen.getByRole('button', { name: /post comment/i });

    await act(async () => {
      await userEvent.type(textarea, 'Great feature!');
    });
    await act(async () => {
      fireEvent.submit(button);
    });

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('Submission failed');
      expect(textarea).toHaveValue('Great feature!'); // Form not reset
    });
  });

  it('disables button while submitting', async () => {
    // Mock a delayed submission to ensure isSubmitting is set
    (createCommentAction as jest.Mock).mockImplementation(
      () => new Promise((resolve) => setTimeout(resolve, 100))
    );
    await act(async () => {
      render(<MessageForm {...defaultProps} />);
    });
    const textarea = screen.getByLabelText(/type your comment here/i);
    const button = screen.getByRole('button', { name: /post comment/i });

    await act(async () => {
      await userEvent.type(textarea, 'Great feature!');
    });
    await act(async () => {
      fireEvent.submit(button);
    });

    await waitFor(
      () => {
        expect(button).toHaveTextContent('Posting...');
        expect(button).toBeDisabled();
      },
      { timeout: 2000 }
    );
  });

  it('updates character count as user types', async () => {
    await act(async () => {
      render(<MessageForm {...defaultProps} />);
    });
    const textarea = screen.getByLabelText(/type your comment here/i);

    await act(async () => {
      await userEvent.type(textarea, 'Hello');
    });

    await waitFor(() => {
      expect(screen.getByText('245 characters left')).toBeInTheDocument();
    });
  });

  // it('displays validation error for empty comment', async () => {
  //   await act(async () => {
  //     render(<MessageForm {...defaultProps} />);
  //   });
  //   const button = screen.getByRole('button', { name: /post comment/i });

  //   await act(async () => {
  //     fireEvent.submit(button);
  //   });

  //   await waitFor(
  //     () => {
  //       expect(screen.getByText('Comment is required')).toBeInTheDocument();
  //       expect(createCommentAction).not.toHaveBeenCalled();
  //       expect(button).toHaveTextContent('Post Comment');
  //       expect(button).not.toBeDisabled();
  //     },
  //     { timeout: 2000 }
  //   );
  // });
});
