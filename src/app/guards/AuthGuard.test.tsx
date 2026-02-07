import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@test/utils';
import { AuthGuard } from './AuthGuard';
import { useSessionStore } from '@state/sessionStore';
import { Navigate, Outlet } from 'react-router-dom';

// Mock session store
vi.mock('@state/sessionStore', () => ({
  useSessionStore: vi.fn(),
}));

// Mock Navigate and Outlet
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    Navigate: vi.fn(() => <div>Redirected</div>),
    Outlet: vi.fn(() => <div>Protected Content</div>),
  };
});

describe('AuthGuard', () => {
  it('renders Outlet when authenticated', () => {
    // @ts-expect-error mocking zustand selector
    vi.mocked(useSessionStore).mockImplementation((selector) => selector({ isAuthenticated: true }));

    render(<AuthGuard />);
    expect(screen.getByText('Protected Content')).toBeInTheDocument();
  });

  it('redirects to login when not authenticated', () => {
    // @ts-expect-error mocking zustand selector
    vi.mocked(useSessionStore).mockImplementation((selector) => selector({ isAuthenticated: false }));

    render(<AuthGuard />);
    expect(screen.getByText('Redirected')).toBeInTheDocument();
    expect(Navigate).toHaveBeenCalledWith({ to: '/login', replace: true }, undefined);
  });
});
