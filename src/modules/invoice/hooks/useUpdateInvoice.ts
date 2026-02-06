import { useMutation, useQueryClient } from '@tanstack/react-query';
import { invoiceService } from '@api/services/invoice';
import type { CreateInvoiceDTO } from '@api/dtos/invoice';
import { INVOICE_QUERY_KEYS } from './useInvoices';

export const useUpdateInvoice = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<CreateInvoiceDTO> }) =>
      invoiceService.update(id, data),
    onSuccess: (updatedInvoice) => {
      // Invalidate list queries
      queryClient.invalidateQueries({ queryKey: INVOICE_QUERY_KEYS.lists() });
      
      // Update specific invoice in cache (optimistic update-like behavior for detail view)
      queryClient.setQueryData(
        INVOICE_QUERY_KEYS.detail(updatedInvoice.id),
        updatedInvoice
      );
    },
  });
};
