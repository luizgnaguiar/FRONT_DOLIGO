import { create } from 'zustand';
import type { UserSession } from '@api/dtos/auth';

/**
 * Global Session Store for the Doligo Frontend.
 * 
 * According to AGENT_CONTRACT_FRONTEND.txt and Phase 3.3:
 * - Minimal global state.
 * - Memory storage preferred (stateless).
 * - Stores JWT, claims (UserSession), and auth status.
 */

interface SessionState {
  token: string | null;
  user: UserSession | null;
  isAuthenticated: boolean;
  
  // Actions
  setSession: (token: string, user: UserSession) => void;
  clearSession: () => void;
}

export const useSessionStore = create<SessionState>((set) => ({
  token: null,
  user: null,
  isAuthenticated: false,

  setSession: (token, user) => set({
    token,
    user,
    isAuthenticated: true,
  }),

  clearSession: () => set({
    token: null,
    user: null,
    isAuthenticated: false,
  }),
}));
