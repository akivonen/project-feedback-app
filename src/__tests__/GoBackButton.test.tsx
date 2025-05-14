import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';
import GoBackButton from '@/components/buttons/GoBackButton';
import { useRouter } from 'next/navigation';

const mockRouter = {
  back: vi.fn(),
  push: vi.fn(),
} as unknown as ReturnType<typeof useRouter>;

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(() => mockRouter),
}));

describe('GoBackButton', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(window, 'history', 'get').mockReturnValue({ length: 2 } as History);
    vi.mocked(useRouter).mockReturnValue(mockRouter as ReturnType<typeof useRouter>);
  });

  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  it('renders button with default styles', () => {
    render(<GoBackButton />);
    const button = screen.getByRole('button', { name: /go back to the previous page/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('Go Back');
    expect(button).toHaveClass(
      'text-dark-200',
      'text-sm',
      'font-bold',
      'flex',
      'items-center',
      'gap-4'
    );
    expect(button).toHaveAttribute('type', 'button');
    const arrow = screen.getByTestId('arrow-left');
    const arrowContainer = screen.getByTestId('arrow-left-container');
    expect(arrowContainer).toContainElement(arrow);
  });

  it('applies custom textColorStyle', () => {
    render(<GoBackButton textColorStyle="text-white" />);
    const button = screen.getByRole('button', { name: /go back to the previous page/i });
    expect(button).toHaveClass('text-white');
  });

  it('applies custom arrowColorStyle', () => {
    render(<GoBackButton arrowColorStyle="text-light-500" />);
    const arrowContainer = screen.getByTestId('arrow-left-container');
    expect(arrowContainer).toHaveClass('text-light-500');
  });

  it('calls router.back when hasHistory is true', async () => {
    vi.spyOn(window, 'history', 'get').mockReturnValue({ length: 2 } as History);
    render(<GoBackButton />);
    const button = screen.getByRole('button', { name: /go back to the previous page/i });

    await userEvent.click(button);

    expect(mockRouter.back).toHaveBeenCalled();
    expect(mockRouter.push).not.toHaveBeenCalled();
  });

  it('calls router.push with "/" when hasHistory is false', async () => {
    vi.spyOn(window, 'history', 'get').mockReturnValue({ length: 1 } as History);
    render(<GoBackButton />);
    const button = screen.getByRole('button', { name: /go to the main page/i });

    await userEvent.click(button);

    expect(mockRouter.push).toHaveBeenCalledWith('/');
    expect(mockRouter.back).not.toHaveBeenCalled();
  });

  it('sets correct aria-label based on hasHistory', () => {
    vi.spyOn(window, 'history', 'get').mockReturnValue({ length: 2 } as History);
    render(<GoBackButton />);
    expect(screen.getByRole('button')).toHaveAttribute(
      'aria-label',
      'Go back to the previous page'
    );

    cleanup();
    vi.spyOn(window, 'history', 'get').mockReturnValue({ length: 1 } as History);
    render(<GoBackButton />);
    expect(screen.getByRole('button')).toHaveAttribute('aria-label', 'Go to the main page');
  });

  it('renders Icons.ArrowLeft with correct attributes', () => {
    render(<GoBackButton />);
    const arrow = screen.getByTestId('arrow-left');
    expect(arrow).toHaveAttribute('width', '7');
    expect(arrow).toHaveAttribute('height', '10');
    expect(arrow).toHaveAttribute('xmlns', 'http://www.w3.org/2000/svg');
    expect(arrow).toHaveAttribute('aria-hidden', 'true');
    expect(arrow.querySelector('path')).toHaveAttribute('d', 'M6 9L2 5l4-4');
  });

  it('applies hover styles on mouseover', async () => {
    render(<GoBackButton />);
    const button = screen.getByRole('button', { name: /go back to the previous page/i });

    await userEvent.hover(button);
    expect(button).toHaveClass('hover:underline');
  });

  it('sets hasHistory correctly on mount', async () => {
    vi.spyOn(window, 'history', 'get').mockReturnValue({ length: 2 } as History);
    render(<GoBackButton />);
    const button = screen.getByRole('button', { name: /go back to the previous page/i });

    await waitFor(() => {
      expect(button).toHaveAttribute('aria-label', 'Go back to the previous page');
    });

    cleanup();
    vi.spyOn(window, 'history', 'get').mockReturnValue({ length: 1 } as History);
    render(<GoBackButton />);
    await waitFor(() => {
      expect(screen.getByRole('button')).toHaveAttribute('aria-label', 'Go to the main page');
    });
  });

  it('disables button and does not call router when router is null', async () => {
    vi.mocked(useRouter).mockReturnValue(null as unknown as ReturnType<typeof useRouter>);
    render(<GoBackButton />);
    const button = screen.getByRole('button', { name: /go back to the previous page/i });

    expect(button).toBeDisabled();

    await userEvent.click(button);

    expect(mockRouter.back).not.toHaveBeenCalled();
    expect(mockRouter.push).not.toHaveBeenCalled();
  });

  it('matches snapshot', () => {
    const { container } = render(<GoBackButton />);
    expect(container).toMatchSnapshot();
  });
});
