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
      // Retry policy for errors (429 and 5xx are handled by Axios interceptors in future phases,
      // but Query provides a safety layer).
      retry: (failureCount, error: any) => {
        // Do not retry for 4xx errors except 429
        const status = error?.response?.status;
        if (status && status >= 400 && status < 500 && status !== 429) {
          return false;
        }
        return failureCount < 3;
      },
      refetchOnWindowFocus: false, // Prevents excessive calls in ERP context
    },
    mutations: {
      retry: false,
    },
  },
});
