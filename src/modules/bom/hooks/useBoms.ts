import { useQuery } from '@tanstack/react-query';
import { bomService, type BomFilters } from '@api/services/bom';

/**
 * Hook for fetching a paginated list of BOMs.
 */

export const BOM_QUERY_KEYS = {
  all: ['boms'] as const,
  lists: () => [...BOM_QUERY_KEYS.all, 'list'] as const,
  list: (filters: BomFilters) => [...BOM_QUERY_KEYS.lists(), filters] as const,
  details: () => [...BOM_QUERY_KEYS.all, 'detail'] as const,
  detail: (id: string) => [...BOM_QUERY_KEYS.details(), id] as const,
};

export const useBoms = (filters: BomFilters = { page: 1, limit: 10 }) => {
  return useQuery({
    queryKey: BOM_QUERY_KEYS.list(filters),
    queryFn: () => bomService.list(filters),
  });
};

export const useBom = (id: string) => {
  return useQuery({
    queryKey: BOM_QUERY_KEYS.detail(id),
    queryFn: () => bomService.getById(id),
    enabled: !!id,
  });
};
