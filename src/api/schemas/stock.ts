import { z } from 'zod';

/**
 * Stock Domain Schemas.
 * 
 * PENDENTE: Sincronizar campos e enums com o backend.
 */

export const StockItemSchema = z.object({
  id: z.string().uuid(),
  sku: z.string().min(1),
  name: z.string().min(1),
  quantity: z.number(),
  unit: z.string(),
  location: z.string().optional(),
  minStock: z.number().optional(),
  updatedAt: z.string().datetime(),
});

export const StockMovementTypeSchema = z.enum(['IN', 'OUT', 'ADJUSTMENT']);

export const StockMovementSchema = z.object({
  id: z.string().uuid(),
  type: StockMovementTypeSchema,
});
