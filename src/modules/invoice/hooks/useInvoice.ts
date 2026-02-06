import { useQuery } from '@tanstack/react-query';
import { invoiceService } from '@api/services/invoice';
import { INVOICE_QUERY_KEYS } from './useInvoices';

/**
 * Hook for fetching a single invoice by ID.
 * 
 * According to Phase 6.1:
 * - Uses TanStack Query.
 * - Cache by ID.
 */
export const useInvoice = (id: string) => {
  return useQuery({
    queryKey: INVOICE_QUERY_KEYS.detail(id),
    queryFn: () => invoiceService.getById(id),
    enabled: !!id,
  });
};
