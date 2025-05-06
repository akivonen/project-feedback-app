import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';
import Burger from '@/components/common/Burger';

describe('Burger', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
  });

  it('renders burger button with three spans when closed', () => {
    render(<Burger>Testing Burger Menu</Burger>);
    const button = screen.getByRole('button', { name: /mobile menu/i });

    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('my-auto', 'ml-auto block', 'cursor-pointer', 'md:hidden');
    const spans = button.querySelectorAll('span');
    expect(spans).toHaveLength(3);
    expect(spans[0]).toHaveClass('bg-white', 'h-[3px]', 'w-[20px]');
    expect(spans[1]).toHaveClass('bg-white', 'h-[3px]', 'w-[20px]', 'opacity-100');
    expect(spans[2]).toHaveClass('bg-white', 'h-[3px]', 'w-[20px]');
    expect(screen.queryByText('Testing Burger Menu')).not.toBeInTheDocument();
  });

  it('toggles to open state and shows children when clicked', async () => {
    render(<Burger>Test Burger Menu</Burger>);
    const button = screen.getByRole('button', { name: /mobile menu/i });

    await userEvent.click(button);

    const spans = button.querySelectorAll('span');
    expect(spans[0]).toHaveClass('top-[7px]', 'rotate-45');
    expect(spans[1]).toHaveClass('opacity-0');
    expect(spans[2]).toHaveClass('-top-[7px]', '-rotate-45');
    expect(screen.getByText('Test Burger Menu')).toBeInTheDocument();
  });

  it('toggles back to closed state when clicked again', async () => {
    render(<Burger>Test Burger Menu</Burger>);
    const button = screen.getByRole('button', { name: /mobile menu/i });

    await userEvent.click(button);
    await userEvent.click(button);

    waitFor(() => {
      const spans = button.querySelectorAll('span');
      expect(spans[0]).not.toHaveClass('top-[7px]', 'rotate-45');
      expect(spans[1]).toHaveClass('opacity-100');
      expect(spans[2]).not.toHaveClass('-top-[7px]', '-rotate-45');
      expect(screen.getByText('Test Burger Menu')).not.toBeInTheDocument();
    });
  });

  it('renders without children', () => {
    render(<Burger />);
    const button = screen.getByRole('button', { name: /mobile menu/i });
    expect(button).toBeInTheDocument();
    const spans = button.querySelectorAll('span');
    expect(spans).toHaveLength(3);
  });

  it('has accessible attributes', () => {
    render(<Burger>Test Menu</Burger>);
    const button = screen.getByRole('button', { name: /mobile menu/i });
    expect(button).toHaveAttribute('aria-label', 'Toggle mobile menu');
    expect(button).toHaveAttribute('aria-expanded', 'false');
  });
});
