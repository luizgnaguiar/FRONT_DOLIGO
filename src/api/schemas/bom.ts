import { z } from 'zod';

/**
 * BOM Domain Schemas.
 * 
 * PENDENTE: Sincronizar campos com o backend.
 */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const BomComponentSchema: z.ZodType<any> = z.lazy(() => 
  z.object({
    id: z.string(),
    sku: z.string(),
    name: z.string(),
    quantity: z.number(),
    unit: z.string(),
    components: z.array(BomComponentSchema).optional(),
  })
);

export const BomSchema = z.object({
  id: z.string().uuid(),
  productSku: z.string(),
  productName: z.string(),
  version: z.string(),
  description: z.string().optional(),
  components: z.array(BomComponentSchema),
  createdAt: z.string().datetime(),
});
