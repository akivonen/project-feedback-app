import { render, screen, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';
import Dropdown from '@/components/common/Dropdown';
import { sortOptions, type CategoryOption } from '@/lib/filter';

const mockLink = vi.fn(({ children, ...props }: React.ComponentProps<'a'>) => (
  <a {...props}>{children}</a>
));

vi.mock('next/link', () => {
  return {
    default: ({ children, ...props }: React.ComponentProps<'a'>) =>
      mockLink({ children, ...props }),
  };
});

describe('Dropdown', () => {
  const defaultProps = {
    dropdownOptions: sortOptions,
    selectedOption: 'most-upvotes',
    isFeedbackFormField: false,
    categoryFilterParam: 'all' as CategoryOption,
  };

  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(document, 'addEventListener');
    vi.spyOn(document, 'removeEventListener');
  });

  afterEach(() => {
    cleanup();
    vi.resetAllMocks();
  });

  it('renders closed dropdown with selected option and ArrowDown icon', () => {
    render(<Dropdown {...defaultProps} />);
    const button = screen.getByRole('button', { name: /sort options/i });
    expect(button).toBeInTheDocument();
    expect(screen.getByText(/sort by/i)).toBeInTheDocument();
    expect(screen.getByText(/most upvotes/i)).toBeInTheDocument();
    expect(button).toHaveAttribute('aria-expanded', 'false');
    expect(button).toHaveAttribute('aria-haspopup', 'listbox');
    expect(button).toHaveClass('text-light-100');
    expect(button).toContain(screen.getByTestId('arrow-down'));
    expect(screen.queryByTestId('arrow-up')).not.toBeInTheDocument();
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('opens dropdown with options and ArrowUp icon', async () => {
    render(<Dropdown {...defaultProps} />);
    const button = screen.getByRole('button', { name: /Sort options/i });

    await userEvent.click(button);
    expect(button).toHaveAttribute('aria-expanded', 'true');
    expect(button).toHaveClass('text-light-100/75');

    const listbox = screen.getByRole('listbox');
    expect(listbox).toBeInTheDocument();
    expect(listbox).toHaveClass('w-fit', 'top-[calc(100%+18px)]', 'min-w-[255px]');
    expect(button).toContain(screen.getByTestId('arrow-up'));
    expect(screen.queryByTestId('arrow-down')).not.toBeInTheDocument();

    await waitFor(() => {
      const options = screen.getAllByRole('option');
      expect(options).toHaveLength(sortOptions.length);
      const firstOption = options[0];
      expect(firstOption).toHaveTextContent('Most Upvotes');
      expect(firstOption).toHaveAttribute('aria-selected', 'true');
      expect(firstOption).toHaveAttribute('id', 'option-most-upvotes');
      expect(firstOption).toContain(screen.getByTestId('check'));
      expect(options[1]).not.toContain(screen.getByTestId('check'));
    });
  });

  it('closes dropdonw when clicking outside', async () => {
    render(<Dropdown {...defaultProps} />);
    const button = screen.getByRole('button', { name: /Sort options/i });

    await userEvent.click(button);
    expect(screen.getByRole('listbox')).toBeInTheDocument();
    await act(() => {
      const clickOutside = new MouseEvent('mousedown', { bubbles: true });
      document.dispatchEvent(clickOutside);
    });

    await waitFor(() => {
      expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
      expect(button).toHaveAttribute('aria-expanded', 'false');
      expect(button).toContain(screen.getByTestId('arrow-down'));
    });
  });

  it('adds and removes mousedown event listener when opening/closing', async () => {
    render(<Dropdown {...defaultProps} />);
    const button = screen.getByRole('button', { name: /Sort options/i });
    expect(document.addEventListener).not.toHaveBeenCalled();

    await userEvent.click(button);
    expect(document.addEventListener).toHaveBeenCalledWith('mousedown', expect.any(Function));

    await userEvent.click(button);
    expect(document.removeEventListener).toHaveBeenCalledWith('mousedown', expect.any(Function));
  });

  it('calls handleChange when selecting an option in form mode', async () => {
    const handleChange = vi.fn();

    render(
      <Dropdown
        dropdownOptions={['ui', 'ux', 'bug']}
        selectedOption="ui"
        isFeedbackFormField
        handleChange={handleChange}
      />
    );
    const button = screen.getByRole('button', { name: /select an option/i });
    expect(screen.getByText(/ui/i)).toBeInTheDocument();
    await userEvent.click(button);

    const option = screen.getByRole('option', { name: /bug/i });
    await userEvent.click(option);

    expect(handleChange).toHaveBeenCalledWith('bug');
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('renders Links with correct href in sorting mode', async () => {
    render(<Dropdown {...defaultProps} />);
    const button = screen.getByRole('button', { name: /sort options/i });

    await userEvent.click(button);
    await waitFor(() => {
      const option = screen.getByRole('option', { name: /least upvotes/i });
      expect(option).toHaveAttribute('href', '/all/least-upvotes');
      expect(mockLink).toHaveBeenCalledWith(
        expect.objectContaining({ href: '/all/least-upvotes' })
      );
    });
  });

  it('renders feedback form field styles correctly', async () => {
    render(
      <Dropdown dropdownOptions={['ui', 'ux', 'bug']} selectedOption="ui" isFeedbackFormField />
    );

    const button = screen.getByRole('button', { name: /select an option/i });
    expect(button).toHaveClass('border-transparent', 'w-full', 'bg-light-200');
    await userEvent.click(button);
    expect(button).toHaveClass('border-blue-300');
    expect(screen.getByRole('listbox')).toHaveClass('w-full');
  });

  it('handles keyboard navigation', async () => {
    render(
      <Dropdown dropdownOptions={['ui', 'ux', 'bug']} selectedOption="ui" isFeedbackFormField />
    );

    const button = screen.getByRole('button', { name: /select an option/i });
    await userEvent.click(button);
    await userEvent.keyboard('{ArrowDown}');
    expect(screen.getByRole('option', { name: /ux/i })).toHaveClass('text-purple-200');
  });
});
