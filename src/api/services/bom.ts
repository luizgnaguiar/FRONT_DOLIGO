import { apiClient } from '../client';
import type { BomDTO } from '../dtos/bom';
import type { PagedResponse } from '../dtos/common';

/**
 * BOM Domain Service.
 * 
 * According to Phase 6.5:
 * - Read-only queries.
 * - Hierarchical visualization (tree).
 */

export interface BomFilters {
  page?: number;
  limit?: number;
  search?: string;
}

export const bomService = {
  /**
   * List BOMs with pagination.
   */
  list: async (params?: BomFilters): Promise<PagedResponse<BomDTO>> => {
    const response = await apiClient.get<PagedResponse<BomDTO>>('/boms', {
      params,
    });
    return response.data;
  },

  /**
   * Get a single BOM by ID (includes components tree).
   */
  getById: async (id: string): Promise<BomDTO> => {
    const response = await apiClient.get<BomDTO>(`/boms/${id}`);
    return response.data;
  },
};
