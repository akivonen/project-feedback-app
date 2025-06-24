import { render, screen, waitFor, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FeedbackForm from '@/components/forms/FeedbackForm';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import {
  createFeedbackAction,
  updateFeedbackAction,
  deleteFeedbackAction,
} from '@/app/actions/feedbackActions';
import { toast } from 'react-toastify';
import { statusOptions } from '@/lib/status';
import { FeedbackFormData } from '@/types';

const mockRouter = {
  push: vi.fn(),
  refresh: vi.fn(),
  replace: vi.fn(),
} as unknown as ReturnType<typeof useRouter>;
vi.mock('next/navigation', () => ({
  useRouter: vi.fn(() => mockRouter as ReturnType<typeof useRouter>),
}));

// eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
const mockImage = vi.fn(({ ...props }: React.ComponentProps<'img'>) => <img {...props} />);
vi.mock('next/image', () => {
  return {
    default: ({ ...props }: React.ComponentProps<'img'>) => mockImage({ ...props }),
  };
});

const mockSessionAuthenticated = {
  data: {
    user: {
      id: '1',
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
  useSession: vi.fn(() => mockSessionAuthenticated),
}));

vi.mock('@/app/actions/feedbackActions', () => ({
  createFeedbackAction: vi.fn(() => Promise.resolve('1')),
  updateFeedbackAction: vi.fn(() => Promise.resolve()),
  deleteFeedbackAction: vi.fn(() => Promise.resolve()),
}));

vi.mock('react-toastify', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

vi.mock('@/components/common/Dropdown', () => ({
  default: ({
    dropdownOptions,
    selectedOption,
    handleChange,
    isFeedbackFormField,
  }: {
    dropdownOptions: string[];
    selectedOption: string;
    handleChange?: (value: string) => void;
    isFeedbackFormField?: boolean;
  }) => (
    <select
      name={dropdownOptions === statusOptions ? 'status' : 'category'}
      id={dropdownOptions === statusOptions ? 'status' : 'category'}
      data-testid="dropdown"
      value={selectedOption}
      onChange={(e) => handleChange?.(e.target.value)}
      className={isFeedbackFormField ? 'w-full border p-2' : ''}
    >
      {dropdownOptions.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  ),
}));

vi.mock('@/components/common/LoadingSpinner', () => ({
  default: () => <div data-testid="loading-spinner">Loading...</div>,
}));

vi.mock('@/components/buttons/Button', () => ({
  default: ({
    children,
    type,
    onClick,
    disabled,
    variant,
    size,
  }: {
    children: React.ReactNode;
    type: 'submit' | 'button';
    onClick?: () => void;
    disabled?: boolean;
    variant: string;
    size: string;
  }) => (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`button-${variant} button-${size}`}
      data-testid={`button-${children?.toString().toLowerCase().replace(/\s/g, '-')}`}
    >
      {children}
    </button>
  ),
}));

vi.mock('@/components/feedback/FeedbackDeleteModal', () => ({
  default: ({
    modalIsOpen,
    setModalIsOpen,
    handleRemoveFeedback,
    isDeleting,
  }: {
    modalIsOpen: boolean;
    setModalIsOpen: (open: boolean) => void;
    handleRemoveFeedback: (e: React.FormEvent) => void;
    isDeleting: boolean;
  }) =>
    modalIsOpen ? (
      <form onSubmit={handleRemoveFeedback} data-testid="feedback-delete-modal">
        <button disabled={isDeleting} data-testid="modal-confirm-delete" type="submit">
          Delete
        </button>
        <button onClick={() => setModalIsOpen(false)} data-testid="modal-cancel" type="button">
          Cancel
        </button>
      </form>
    ) : null,
}));

describe('FeedbackForm', () => {
  const defaultProps = {};
  const mockFeedback: FeedbackFormData = {
    id: '1',
    title: 'Test feedback',
    category: 'Feature',
    status: 'Suggestion',
    description: 'Test description',
    user_id: '1',
  };

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useSession).mockReturnValue(
      mockSessionAuthenticated as ReturnType<typeof useSession>
    );
  });

  afterEach(() => {
    cleanup();
    vi.resetAllMocks();
  });

  it('renders create form with correct initial state', () => {
    render(<FeedbackForm {...defaultProps} />);
    expect(screen.getByText('Create New Feedback')).toBeInTheDocument();
    expect(mockImage).toHaveBeenCalledWith(
      expect.objectContaining({ src: '/icons/icon-new-feedback.svg' })
    );
    expect(screen.getByLabelText(/feedback title/i)).toHaveValue('');
    expect(screen.getByLabelText(/category/i)).toHaveValue('Feature');
    expect(screen.queryByLabelText(/update status/i)).not.toBeInTheDocument();
    expect(screen.getByLabelText(/feedback detail/i)).toHaveValue('');
    expect(screen.getByTestId('button-add-feedback')).toBeInTheDocument();
    expect(screen.getByTestId('button-cancel')).toBeInTheDocument();
    expect(screen.queryByTestId('button-delete')).not.toBeInTheDocument();
  });

  it('renders edit form with correct inital state', () => {
    render(<FeedbackForm curFeedback={mockFeedback} />);
    expect(screen.getByText(`Editing ’${mockFeedback.title}’`));
    expect(mockImage).toHaveBeenCalledWith(
      expect.objectContaining({ src: '/icons/icon-edit-feedback.svg' })
    );
    expect(screen.getByLabelText(/feedback title/i)).toHaveValue(mockFeedback.title);
    expect(screen.getByLabelText(/category/i)).toHaveValue(mockFeedback.category);
    expect(screen.queryByLabelText(/update status/i)).toHaveValue(mockFeedback.status);
    expect(screen.getByLabelText(/feedback detail/i)).toHaveValue(mockFeedback.description);
    expect(screen.queryByTestId('button-add-feedback')).not.toBeInTheDocument();
    expect(screen.getByTestId('button-save-changes')).toBeInTheDocument();
    expect(screen.getByTestId('button-cancel')).toBeInTheDocument();
    expect(screen.queryByTestId('button-delete')).toBeInTheDocument();
  });

  it('shows loading spinner during session loading', () => {
    vi.mocked(useSession).mockReturnValue(mockSessionLoading as ReturnType<typeof useSession>);
    render(<FeedbackForm {...defaultProps} />);
    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
  });

  it('redirects signin if unauthenticated', () => {
    vi.mocked(useSession).mockReturnValue(
      mockSessionUnauthenticated as ReturnType<typeof useSession>
    );
    render(<FeedbackForm {...defaultProps} />);
    expect(mockRouter.push).toHaveBeenCalledWith('/auth/signin');
  });

  it('redirects signin if unauthenticated', () => {
    const unauthorizedFeedback = { ...mockFeedback, user_id: '2' };
    vi.mocked(useSession).mockReturnValue(
      mockSessionAuthenticated as ReturnType<typeof useSession>
    );
    render(<FeedbackForm curFeedback={unauthorizedFeedback} />);
    expect(mockRouter.push).toHaveBeenCalledWith('/');
  });

  it('submits new feedback successfully', async () => {
    render(<FeedbackForm {...defaultProps} />);
    await userEvent.type(screen.getByLabelText(/feedback title/i), 'New feedback');
    await userEvent.selectOptions(screen.getByLabelText(/category/i), 'UX');
    await userEvent.type(screen.getByLabelText(/feedback detail/i), 'New feedback test details');
    await userEvent.click(screen.getByTestId('button-add-feedback'));

    await waitFor(() => {
      expect(createFeedbackAction).toHaveBeenCalledWith({
        title: 'New feedback',
        category: 'UX',
        status: 'Suggestion',
        description: 'New feedback test details',
        user_id: '1',
      });
      expect(toast.success).toHaveBeenCalledWith('Feedback created successfully');
      expect(mockRouter.push).toHaveBeenCalledWith('/feedbacks/1/');
    });
  });

  it('submits updated feedback successfully', async () => {
    render(<FeedbackForm curFeedback={mockFeedback} />);
    const title = screen.getByLabelText(/feedback title/i);
    const category = screen.getByLabelText(/category/i);
    const status = screen.getByLabelText(/status/i);
    const detail = screen.getByLabelText(/feedback detail/i);
    await userEvent.clear(title);
    await userEvent.type(title, 'Updated feedback');
    await userEvent.selectOptions(category, 'Bug');
    await userEvent.selectOptions(status, 'Planned');
    await userEvent.clear(detail);
    await userEvent.type(detail, 'Updated feedback test details');
    await userEvent.click(screen.getByTestId('button-save-changes'));

    await waitFor(() => {
      expect(updateFeedbackAction).toHaveBeenCalledWith({
        ...mockFeedback,
        title: 'Updated feedback',
        category: 'Bug',
        status: 'Planned',
        description: 'Updated feedback test details',
      });
      expect(toast.success).toHaveBeenCalledWith('Feedback updated successfully');
      expect(mockRouter.refresh).toHaveBeenCalled();
    });
  });

  it('displays validation errors on title', async () => {
    render(<FeedbackForm {...defaultProps} />);
    await userEvent.type(screen.getByLabelText(/feedback title/i), 'New feedback');
    await userEvent.click(screen.getByTestId('button-add-feedback'));
    await waitFor(() => {
      expect(screen.getByText('Can`t be empty'));
      expect(createFeedbackAction).not.toHaveBeenCalled();
    });
  });
  it('displays validation errors on description', async () => {
    render(<FeedbackForm {...defaultProps} />);
    await userEvent.type(screen.getByLabelText(/feedback detail/i), 'New feedback test details');
    await userEvent.click(screen.getByTestId('button-add-feedback'));
    await waitFor(() => {
      expect(screen.getByText('Can`t be empty'));
      expect(createFeedbackAction).not.toHaveBeenCalled();
    });
  });

  it('displays server error on new feedback submission failure', async () => {
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    vi.mocked(createFeedbackAction).mockRejectedValue(new Error('Error creating feedback'));
    render(<FeedbackForm {...defaultProps} />);
    await userEvent.type(screen.getByLabelText(/feedback title/i), 'New feedback');
    await userEvent.type(screen.getByLabelText(/feedback detail/i), 'New feedback test details');
    await userEvent.click(screen.getByTestId('button-add-feedback'));

    await waitFor(() => {
      expect(toast.error('Error creating feedback'));
      expect(screen.getByText('Error creating feedback'));
      expect(consoleErrorSpy).toHaveBeenCalledWith('Form submission error:', expect.any(Error));
    });
    consoleErrorSpy.mockRestore();
  });

  it('navigates back on cancel', async () => {
    render(<FeedbackForm {...defaultProps} />);
    await userEvent.click(screen.getByTestId('button-cancel'));
    expect(mockRouter.push).toHaveBeenCalledWith('/');
  });

  it('opens and closes delete modal', async () => {
    render(<FeedbackForm curFeedback={mockFeedback} />);
    await userEvent.click(screen.getByTestId('button-delete'));
    expect(screen.getByTestId('feedback-delete-modal')).toBeInTheDocument();

    await userEvent.click(screen.getByTestId('modal-cancel'));
    expect(screen.queryByTestId('feedback-delete-modal')).not.toBeInTheDocument();
  });

  it('deletes feedback successfully', async () => {
    render(<FeedbackForm curFeedback={mockFeedback} />);
    await userEvent.click(screen.getByTestId('button-delete'));
    expect(screen.getByTestId('modal-confirm-delete')).toBeInTheDocument();

    await userEvent.click(screen.getByTestId('modal-confirm-delete'));
    expect(deleteFeedbackAction).toHaveBeenCalledWith('1', '1');
    expect(toast.success).toHaveBeenCalledWith('Feedback deleted successfully');
    expect(mockRouter.replace).toHaveBeenCalledWith('/');
  });

  it('displays server error on feedback deleting failure', async () => {
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    vi.mocked(deleteFeedbackAction).mockRejectedValue(new Error('Error deleting feedback'));
    render(<FeedbackForm curFeedback={mockFeedback} />);
    await userEvent.click(screen.getByTestId('button-delete'));
    await userEvent.click(screen.getByTestId('modal-confirm-delete'));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('Error deleting feedback');
      expect(screen.getByText('Error deleting feedback'));
      expect(consoleErrorSpy).toHaveBeenCalledWith('Delete error:', expect.any(Error));
    });
    consoleErrorSpy.mockRestore();
  });

  it('renders form fields with correct accessibility attrs', async () => {
    render(<FeedbackForm {...defaultProps} />);
    expect(screen.getByLabelText(/feedback title/i)).toHaveAttribute('aria-invalid', 'false');
    await userEvent.click(screen.getByTestId('button-add-feedback'));
    await waitFor(() => {
      const title = screen.getByLabelText(/feedback title/i);
      expect(title).toHaveAttribute('aria-invalid', 'true');
      expect(title).toHaveAttribute('aria-describedBy', 'title-error');
    });
  });
});
