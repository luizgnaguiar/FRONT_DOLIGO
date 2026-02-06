import { z } from 'zod';

/**
 * Stock Domain Schemas.
 * 
 * PENDENTE: Sincronizar campos e enums com o backend.
 */

export const StockItemSchema = z.object({
  id: z.string().uuid(),
  // PENDENTE: sku, name, etc.
});

export const StockMovementTypeSchema = z.enum(['IN', 'OUT', 'ADJUSTMENT']);

export const StockMovementSchema = z.object({
  id: z.string().uuid(),
  type: StockMovementTypeSchema,
});
