import { apiClient } from '../client';
import type { CustomerDTO, LeadDTO } from '../dtos/crm';
import type { PagedResponse } from '../dtos/common';

/**
 * CRM Domain Service.
 * 
 * According to Phase 6.6:
 * - List and detail operations for Customers and Leads.
 */

export interface CrmFilters {
  page?: number;
  limit?: number;
  search?: string;
  type?: 'COMPANY' | 'INDIVIDUAL';
  status?: string;
}

export const crmService = {
  customers: {
    list: async (params?: CrmFilters): Promise<PagedResponse<CustomerDTO>> => {
      const response = await apiClient.get<PagedResponse<CustomerDTO>>('/crm/customers', {
        params,
      });
      return response.data;
    },
    getById: async (id: string): Promise<CustomerDTO> => {
      const response = await apiClient.get<CustomerDTO>(`/crm/customers/${id}`);
      return response.data;
    },
  },
  leads: {
    list: async (params?: CrmFilters): Promise<PagedResponse<LeadDTO>> => {
      const response = await apiClient.get<PagedResponse<LeadDTO>>('/crm/leads', {
        params,
      });
      return response.data;
    },
    getById: async (id: string): Promise<LeadDTO> => {
      const response = await apiClient.get<LeadDTO>(`/crm/leads/${id}`);
      return response.data;
    },
  },
};
