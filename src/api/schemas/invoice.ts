import { z } from 'zod';

/**
 * Invoice Domain Schemas.
 * 
 * PENDENTE: Sincronizar campos e enums com o backend.
 */

export const InvoiceStatusSchema = z.enum(['DRAFT', 'ISSUED', 'PAID', 'CANCELLED']);

export const InvoiceSchema = z.object({
  id: z.string().uuid(),
  status: InvoiceStatusSchema,
});

export const CreateInvoiceSchema = z.object({
  // PENDENTE: Definir campos obrigatórios de criação
});
