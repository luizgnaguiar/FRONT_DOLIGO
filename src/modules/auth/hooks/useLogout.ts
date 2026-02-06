import { useSessionStore } from '@state/sessionStore';
import { queryClient } from '@state/queryClient';

/**
 * Hook for global logout functionality.
 * 
 * According to Phase 5.2:
 * - Clears session store.
 * - Invalidates/Clears TanStack Query cache.
 * - Immediate global effect.
 */
export const useLogout = () => {
  const clearSession = useSessionStore((state) => state.clearSession);

  const logout = () => {
    // 1. Clear Zustand Store
    clearSession();

    // 2. Clear Query Cache to prevent data leakage between sessions
    queryClient.clear();

    // PENDENTE: Redirecionar para página de login (Fase de Roteamento)
  };

  return { logout };
};
