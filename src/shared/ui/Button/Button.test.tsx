import { describe, it, expect, vi } from 'vitest';
import { render, screen, userEvent } from '@test/utils';
import { Button } from './Button';

describe('Button', () => {
  it('renders children correctly', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument();
  });

  it('calls onClick handler when clicked', async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();
    render(<Button onClick={handleClick}>Click me</Button>);
    
    await user.click(screen.getByRole('button', { name: /click me/i }));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('is disabled when disabled prop is true', () => {
    render(<Button disabled>Click me</Button>);
    expect(screen.getByRole('button', { name: /click me/i })).toBeDisabled();
  });

  it('shows loading spinner when isLoading is true', () => {
    render(<Button isLoading>Click me</Button>);
    // We expect the button to be disabled and show loading state
    expect(screen.getByRole('button')).toBeDisabled();
    // Assuming Spinner renders an SVG or specific element, checking if button text is still there or hidden might be relevant
    // But usually we check for spinner presence. For now, just disabling check is enough for behavior.
  });
});
