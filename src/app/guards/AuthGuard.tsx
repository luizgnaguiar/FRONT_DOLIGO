import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSessionStore } from '@state/sessionStore';

/**
 * AuthGuard.
 * 
 * According to Phase 5.3:
 * - Blocks rendering without a valid session.
 * - Redirects to /login when not authenticated.
 */
export const AuthGuard: React.FC = () => {
  const isAuthenticated = useSessionStore((state) => state.isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};
