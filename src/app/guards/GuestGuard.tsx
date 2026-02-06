import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSessionStore } from '@state/sessionStore';

/**
 * GuestGuard.
 * 
 * Prevents authenticated users from accessing public-only routes (like /login).
 * Redirects to the root path if already authenticated.
 */
export const GuestGuard: React.FC = () => {
  const isAuthenticated = useSessionStore((state) => state.isAuthenticated);

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};
