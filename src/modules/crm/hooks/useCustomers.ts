import { useQuery } from '@tanstack/react-query';
import { crmService, type CrmFilters } from '@api/services/crm';

export const CUSTOMER_QUERY_KEYS = {
  all: ['customers'] as const,
  lists: () => [...CUSTOMER_QUERY_KEYS.all, 'list'] as const,
  list: (filters: CrmFilters) => [...CUSTOMER_QUERY_KEYS.lists(), filters] as const,
  details: () => [...CUSTOMER_QUERY_KEYS.all, 'detail'] as const,
  detail: (id: string) => [...CUSTOMER_QUERY_KEYS.details(), id] as const,
};

export const useCustomers = (filters: CrmFilters = { page: 1, limit: 10 }) => {
  return useQuery({
    queryKey: CUSTOMER_QUERY_KEYS.list(filters),
    queryFn: () => crmService.customers.list(filters),
  });
};

export const useCustomer = (id: string) => {
  return useQuery({
    queryKey: CUSTOMER_QUERY_KEYS.detail(id),
    queryFn: () => crmService.customers.getById(id),
    enabled: !!id,
  });
};
