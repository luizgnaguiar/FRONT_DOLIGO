import { useQuery, type UseQueryOptions } from '@tanstack/react-query';
import { useSessionStore } from '@state/sessionStore';
import { apiClient } from '@api/client';

/**
 * Infrastructure for polling asynchronous jobs and PDFs.
 * 
 * According to Phase 3.5:
 * - Uses TanStack Query for polling.
 * - Supports cancellation via AbortController.
 * - Configurable intervals.
 * - Respects session status (does not run without token).
 */

interface PollingOptions<T> extends Omit<UseQueryOptions<T>, 'queryKey' | 'queryFn'> {
  interval?: number;
  enabled?: boolean;
}

/**
 * Hook helper for polling endpoints.
 * 
 * @param queryKey Unique key for the query
 * @param endpoint API endpoint to poll
 * @param options Polling configuration (interval, enabled, etc.)
 */
export const usePolling = <T>(
  queryKey: unknown[],
  endpoint: string,
  options: PollingOptions<T> = {}
) => {
  const { interval = 3000, enabled = true, ...queryOptions } = options;
  const { isAuthenticated } = useSessionStore();

  return useQuery<T>({
    queryKey,
    queryFn: async ({ signal }) => {
      const response = await apiClient.get<T>(endpoint, { signal });
      return response.data;
    },
    // Polling interval in ms
    refetchInterval: () => {
      // PENDENTE: Logic to stop polling based on response status (e.g., job completed)
      // For now, it's a generic interval if enabled and authenticated
      if (!enabled || !isAuthenticated) return false;
      
      // Example stop condition: if the job data indicates completion, return false
      // This will be refined in domain-specific hooks.
      return interval;
    },
    // Only run if authenticated and explicitly enabled
    enabled: isAuthenticated && enabled,
    // Ensure cancellation on unmount or key change
    ...queryOptions,
  });
};
