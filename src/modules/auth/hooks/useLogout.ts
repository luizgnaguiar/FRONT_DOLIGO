import { useNavigate } from 'react-router-dom';
import { useSessionStore } from '@state/sessionStore';
import { queryClient } from '@state/queryClient';

/**
 * Hook for global logout functionality.
 * 
 * According to Phase 5.2 & 10.2:
 * - Clears session store.
 * - Invalidates/Clears TanStack Query cache.
 * - Redirects to login page.
 */
export const useLogout = () => {
  const clearSession = useSessionStore((state) => state.clearSession);
  const navigate = useNavigate();

  const logout = () => {
    // 1. Clear Zustand Store
    clearSession();

    // 2. Clear Query Cache to prevent data leakage between sessions
    queryClient.clear();

    // 3. Redirect to login
    navigate('/login');
  };

  return { logout };
};
