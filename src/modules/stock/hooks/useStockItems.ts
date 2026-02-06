import { useQuery } from '@tanstack/react-query';
import { stockService, type StockFilters } from '@api/services/stock';

/**
 * Hook for fetching a paginated list of stock items.
 * 
 * According to Phase 6.4:
 * - Uses TanStack Query.
 * - Server-driven pagination.
 * - Query key includes filters for precise caching.
 */

export const STOCK_QUERY_KEYS = {
  all: ['stock'] as const,
  lists: () => [...STOCK_QUERY_KEYS.all, 'list'] as const,
  list: (filters: StockFilters) => [...STOCK_QUERY_KEYS.lists(), filters] as const,
  details: () => [...STOCK_QUERY_KEYS.all, 'detail'] as const,
  detail: (id: string) => [...STOCK_QUERY_KEYS.details(), id] as const,
};

export const useStockItems = (filters: StockFilters = { page: 1, limit: 10 }) => {
  return useQuery({
    queryKey: STOCK_QUERY_KEYS.list(filters),
    queryFn: () => stockService.list(filters),
  });
};
