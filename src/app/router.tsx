import { createBrowserRouter, Navigate } from 'react-router-dom';
import { LoginPage } from '@modules/auth';
import { AppLayout } from '@shared/ui';
import { AuthGuard } from './guards/AuthGuard';
import { GuestGuard } from './guards/GuestGuard';

/**
 * Main Application Router.
 * 
 * According to Phase 5.3:
 * - Protects private routes via AuthGuard.
 * - Handles guest-only routes via GuestGuard.
 */
export const router = createBrowserRouter([
  {
    element: <GuestGuard />,
    children: [
      {
        path: '/login',
        element: <LoginPage />,
      },
    ],
  },
  {
    element: <AuthGuard />,
    children: [
      {
        path: '/',
        element: (
          <AppLayout>
            <div>Dashboard / Home (PENDENTE)</div>
          </AppLayout>
        ),
      },
      {
        path: '*',
        element: <Navigate to="/" replace />,
      },
    ],
  },
]);
