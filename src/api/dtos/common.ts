/**
 * Common DTOs shared across multiple domains.
 * 
 * PENDENTE: Sincronizar campos exatos de paginação e metadados com o backend.
 */

export interface PaginationMeta {
  // PENDENTE: Validar se o backend usa 'page', 'offset', 'cursor', etc.
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface PagedResponse<T> {
  data: T[];
  meta: PaginationMeta;
}

export interface ID {
  id: string; // UUID v4 expected
}
