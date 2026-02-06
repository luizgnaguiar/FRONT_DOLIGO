import { apiClient } from '../client';
import type { StockItemDTO } from '../dtos/stock';
import type { PagedResponse } from '../dtos/common';

/**
 * Stock Domain Service.
 * 
 * According to Phase 6.4:
 * - Consultation and visualization.
 * - Server-driven pagination supported.
 * - Simple filters supported.
 */

export interface StockFilters {
  page?: number;
  limit?: number;
  search?: string;
  sku?: string;
}

export const stockService = {
  /**
   * List stock items with pagination and filters.
   */
  list: async (params?: StockFilters): Promise<PagedResponse<StockItemDTO>> => {
    const response = await apiClient.get<PagedResponse<StockItemDTO>>('/stock', {
      params,
    });
    return response.data;
  },

  /**
   * Get a single stock item by ID.
   */
  getById: async (id: string): Promise<StockItemDTO> => {
    const response = await apiClient.get<StockItemDTO>(`/stock/${id}`);
    return response.data;
  },
};
