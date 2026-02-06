import { apiClient } from '../client';
import type { InvoiceDTO, CreateInvoiceDTO } from '../dtos/invoice';
import type { PagedResponse } from '../dtos/common';

/**
 * Invoice Domain Service.
 * 
 * According to Phase 6.1:
 * - Functional calls to invoice endpoints.
 * - Server-driven pagination supported.
 */

export interface InvoiceFilters {
  page?: number;
  limit?: number;
  status?: string;
}

export const invoiceService = {
  /**
   * List invoices with pagination and filters.
   */
  list: async (params?: InvoiceFilters): Promise<PagedResponse<InvoiceDTO>> => {
    const response = await apiClient.get<PagedResponse<InvoiceDTO>>('/invoices', {
      params,
    });
    return response.data;
  },

  /**
   * Get a single invoice by ID.
   */
  getById: async (id: string): Promise<InvoiceDTO> => {
    const response = await apiClient.get<InvoiceDTO>(`/invoices/${id}`);
    return response.data;
  },

  /**
   * Create a new invoice.
   */
  create: async (data: CreateInvoiceDTO): Promise<InvoiceDTO> => {
    const response = await apiClient.post<InvoiceDTO>('/invoices', data);
    return response.data;
  },
};
