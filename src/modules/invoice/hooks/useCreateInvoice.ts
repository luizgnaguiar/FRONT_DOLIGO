import { useMutation, useQueryClient } from '@tanstack/react-query';
import { invoiceService } from '@api/services/invoice';
import { INVOICE_QUERY_KEYS } from './useInvoices';
import type { CreateInvoiceDTO } from '@api/dtos/invoice';

/**
 * Hook for creating a new invoice.
 * 
 * According to Phase 6.1:
 * - Uses TanStack Query Mutation.
 * - Invalidates invoice lists on success.
 */
export const useCreateInvoice = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateInvoiceDTO) => invoiceService.create(data),
    onSuccess: () => {
      // Invalidate all invoice lists to force a refresh
      queryClient.invalidateQueries({ queryKey: INVOICE_QUERY_KEYS.lists() });
    },
  });
};
