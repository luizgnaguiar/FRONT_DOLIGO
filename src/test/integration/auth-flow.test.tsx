import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, userEvent, waitFor } from '../utils';
import { apiClient } from '@api/client';
import { useSessionStore } from '@state/sessionStore';
import { router } from '@app/router';
import { RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Mock apiClient
vi.mock('@api/client', async () => {
  const actual = await vi.importActual('@api/client');
  return {
    ...actual,
    apiClient: {
      post: vi.fn(),
      get: vi.fn(),
      interceptors: {
        request: { use: vi.fn() },
        response: { use: vi.fn() },
      },
    },
  };
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

describe('Auth Flow Integration', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    useSessionStore.getState().clearSession();
    queryClient.clear();
  });

  it('redirects to login when accessing private route without session', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    );

    // Initial navigation is /, which is private
    // Should redirect to /login
    await waitFor(() => {
      expect(screen.getByRole('heading', { name: /doligo/i })).toBeInTheDocument();
      expect(screen.getByLabelText(/e-mail/i)).toBeInTheDocument();
    });
  });

  it('allows login and redirects to home', async () => {
    const user = userEvent.setup();
    // Setup API mock
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (apiClient.post as any).mockResolvedValueOnce({
      data: {
        token: 'fake-token',
      },
    });

    render(
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    );

    // Wait for login page
    await waitFor(() => expect(screen.getByLabelText(/e-mail/i)).toBeInTheDocument());

    // Fill form
    await user.type(screen.getByLabelText(/e-mail/i), 'admin@doligo.com');
    await user.type(screen.getByLabelText(/senha/i), '123456');
    await user.click(screen.getByRole('button', { name: /acessar sistema/i }));

    // Expect API call
    expect(apiClient.post).toHaveBeenCalledWith('/auth/login', {
      email: 'admin@doligo.com',
      password: '123456',
    });

    // Expect redirection to home (Dashboard)
    // Note: The router redirects to / which renders "Dashboard / Home (PENDENTE)"
    await waitFor(() => {
      expect(screen.getByText(/dashboard \/ home/i)).toBeInTheDocument();
    });
  });

  it('allows logout', async () => {
    // Set initial session
    useSessionStore.getState().setSession('fake-token', {
      id: '123',
      name: 'Admin User',
      roles: ['admin'],
    });

    const user = userEvent.setup();
    render(
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    );

    // Should be on dashboard
    await waitFor(() => expect(screen.getByText(/dashboard \/ home/i)).toBeInTheDocument());

    // Click logout
    const logoutButton = screen.getByRole('button', { name: /sair/i });
    await user.click(logoutButton);

    // Should redirect to login
    await waitFor(() => {
      expect(screen.getByRole('heading', { name: /doligo/i })).toBeInTheDocument();
    });
  });
});
