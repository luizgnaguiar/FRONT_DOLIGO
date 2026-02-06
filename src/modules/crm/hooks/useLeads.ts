import { useQuery } from '@tanstack/react-query';
import { crmService, type CrmFilters } from '@api/services/crm';

export const LEAD_QUERY_KEYS = {
  all: ['leads'] as const,
  lists: () => [...LEAD_QUERY_KEYS.all, 'list'] as const,
  list: (filters: CrmFilters) => [...LEAD_QUERY_KEYS.lists(), filters] as const,
  details: () => [...LEAD_QUERY_KEYS.all, 'detail'] as const,
  detail: (id: string) => [...LEAD_QUERY_KEYS.details(), id] as const,
};

export const useLeads = (filters: CrmFilters = { page: 1, limit: 10 }) => {
  return useQuery({
    queryKey: LEAD_QUERY_KEYS.list(filters),
    queryFn: () => crmService.leads.list(filters),
  });
};
