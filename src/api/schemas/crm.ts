import { z } from 'zod';

/**
 * CRM Domain Schemas.
 * 
 * PENDENTE: Sincronizar campos e enums com o backend.
 */

export const CustomerSchema = z.object({
  id: z.string().uuid(),
});

export const LeadStatusSchema = z.enum(['NEW', 'CONTACTED', 'QUALIFIED', 'LOST']);

export const LeadSchema = z.object({
  id: z.string().uuid(),
  status: LeadStatusSchema,
});
