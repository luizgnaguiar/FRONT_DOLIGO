import { z } from 'zod';

/**
 * Common Zod Schemas.
 * 
 * PENDENTE: Validar tipos exatos com o backend.
 */

export const PaginationMetaSchema = z.object({
  page: z.number(),
  limit: z.number(),
  total: z.number(),
  totalPages: z.number(),
});

export const IDSchema = z.object({
  id: z.string().uuid(),
});
