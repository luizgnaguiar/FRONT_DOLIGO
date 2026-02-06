import { z } from 'zod';

/**
 * BOM Domain Schemas.
 * 
 * PENDENTE: Sincronizar campos com o backend.
 */

export const BomSchema = z.object({
  id: z.string().uuid(),
});

export const BomComponentSchema = z.object({
  // PENDENTE
});
