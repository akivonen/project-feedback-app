import { render, screen, fireEvent } from '@testing-library/react';
import Button from '@/components/buttons/Button'; // Adjust path as needed

jest.mock('next/link', () => {
  const MockedLink = ({ children, href, className }: any) => (
    <a href={href} className={className}>
      {children}
    </a>
  );
  MockedLink.displayName = 'Link';
  return MockedLink;
});

describe('Button', () => {
  it('renders button with text and default styles', () => {
    render(<Button variant="grey">Click Me</Button>);
    const button = screen.getByRole('button', { name: /click me/i });
    expect(button).toHaveTextContent('Click Me');
    expect(button).toHaveClass('bg-light-300 text-blue-300');
    expect(button).toHaveClass('px-[16px] py-[6px]'); // size: sm
    expect(button).toHaveAttribute('type', 'button');
  });

  it('renders as link when href is provided', () => {
    render(
      <Button variant="blue" href="/test">
        Go to Test
      </Button>
    );
    const link = screen.getByRole('link', { name: /go to test/i });
    expect(link).toHaveTextContent('Go to Test');
    expect(link).toHaveAttribute('href', '/test');
    expect(link).toHaveClass('bg-blue-300 text-light-100');
  });

  it('applies correct variant styles', () => {
    render(<Button variant="purple">Purple Button</Button>);
    const button = screen.getByRole('button', { name: /purple button/i });
    expect(button).toHaveClass('bg-purple-200 text-light-100');
    expect(button).toHaveClass('hover:bg-purple-100');
  });

  it('applies correct size styles', () => {
    render(
      <Button variant="grey" size="lg">
        Large Button
      </Button>
    );
    const button = screen.getByRole('button', { name: /large button/i });
    expect(button).toHaveClass('px-6 py-3');
  });

  it('applies active styles when isActive is true', () => {
    render(
      <Button variant="grey" isActive>
        Active Button
      </Button>
    );
    const button = screen.getByRole('button', { name: /active button/i });
    expect(button).toHaveClass('bg-blue-300 text-white');
  });

  it('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(
      <Button variant="grey" onClick={handleClick}>
        Click Me
      </Button>
    );
    const button = screen.getByRole('button', { name: /click me/i });
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('is disabled when disabled prop is true', () => {
    render(
      <Button variant="grey" disabled>
        Disabled Button
      </Button>
    );
    const button = screen.getByRole('button', { name: /disabled button/i });
    expect(button).toBeDisabled();
  });

  it('sets correct type attribute', () => {
    render(
      <Button variant="grey" type="submit">
        Submit Button
      </Button>
    );
    const button = screen.getByRole('button', { name: /submit button/i });
    expect(button).toHaveAttribute('type', 'submit');
  });
});
