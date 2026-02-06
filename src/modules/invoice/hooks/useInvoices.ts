import { useQuery } from '@tanstack/react-query';
import { invoiceService, type InvoiceFilters } from '@api/services/invoice';

/**
 * Hook for fetching a paginated list of invoices.
 * 
 * According to Phase 6.1:
 * - Uses TanStack Query.
 * - Server-driven pagination.
 * - Query key includes filters for precise caching.
 */

export const INVOICE_QUERY_KEYS = {
  all: ['invoices'] as const,
  lists: () => [...INVOICE_QUERY_KEYS.all, 'list'] as const,
  list: (filters: InvoiceFilters) => [...INVOICE_QUERY_KEYS.lists(), filters] as const,
  details: () => [...INVOICE_QUERY_KEYS.all, 'detail'] as const,
  detail: (id: string) => [...INVOICE_QUERY_KEYS.details(), id] as const,
};

export const useInvoices = (filters: InvoiceFilters = { page: 1, limit: 10 }) => {
  return useQuery({
    queryKey: INVOICE_QUERY_KEYS.list(filters),
    queryFn: () => invoiceService.list(filters),
  });
};
