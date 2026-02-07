import { useQuery } from '@tanstack/react-query';
import { jobService } from '@api/services/job';
import { useSessionStore } from '@state/sessionStore';
import type { JobDTO } from '@api/dtos/job';

export const JOB_QUERY_KEYS = {
  all: ['jobs'] as const,
  details: () => [...JOB_QUERY_KEYS.all, 'detail'] as const,
  detail: (id: string) => [...JOB_QUERY_KEYS.details(), id] as const,
};

export const useJob = (id: string, options: { interval?: number; enabled?: boolean } = {}) => {
  const { interval = 2000, enabled = true } = options;
  const { isAuthenticated } = useSessionStore();

  return useQuery({
    queryKey: JOB_QUERY_KEYS.detail(id),
    queryFn: () => jobService.getById(id),
    enabled: !!id && enabled && isAuthenticated,
    refetchInterval: (query) => {
      const data = query.state.data as JobDTO | undefined;
      
      if (!data) return interval;

      // Stop polling if final state reached
      if (['COMPLETED', 'FAILED', 'CANCELLED'].includes(data.status)) {
        return false;
      }

      return interval;
    },
    // Don't refetch on window focus for background jobs typically, unless user wants latest status immediately
    refetchOnWindowFocus: true, 
  });
};
