import { QueryClient } from '@tanstack/react-query';

/**
 * Global TanStack Query Client configuration.
 * 
 * According to Phase 3.1:
 * - Central instance for server state management.
 * - Standardized policies for retries and caching.
 */

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Data remains fresh for 5 minutes by default
      staleTime: 1000 * 60 * 5,
      // Cache is kept for 30 minutes
      gcTime: 1000 * 60 * 30,
      // Retry policy for errors (429 and 5xx)
      retry: (failureCount, error: any) => {
        if (failureCount >= 3) return false;

        const status = error?.response?.status;
        
        // Retry for Rate Limit (429) or Server Errors (5xx)
        if (status === 429 || (status >= 500 && status <= 599)) {
          return true;
        }

        return false;
      },
      // Progressive backoff: 1s, 2s, 4s... capped at 10s
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 10000),
      refetchOnWindowFocus: false, // Prevents excessive calls in ERP context
    },
    mutations: {
      retry: false,
    },
  },
});
