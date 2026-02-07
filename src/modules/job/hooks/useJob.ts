import { useQuery } from '@tanstack/react-query';
import { jobService } from '@api/services/job';
import { useSessionStore } from '@state/sessionStore';
import type { JobDTO } from '@api/dtos/job';
import { shouldPollJob } from '../utils';

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
    queryFn: ({ signal }) => jobService.getById(id, signal),
    enabled: !!id && enabled && isAuthenticated,
    refetchInterval: (query) => {
      const data = query.state.data as JobDTO | undefined;
      
      // If no data yet, keep polling. If has data, check status.
      if (!data || shouldPollJob(data.status)) {
        return interval;
      }

      return false;
    },
    refetchOnWindowFocus: true, 
  });
};
