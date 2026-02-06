import { z } from 'zod';

/**
 * CRM Domain Schemas.
 * 
 * PENDENTE: Sincronizar campos e enums com o backend.
 */

export const CustomerSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional(),
  taxId: z.string().optional(),
  type: z.enum(['COMPANY', 'INDIVIDUAL']),
  status: z.enum(['ACTIVE', 'INACTIVE']),
  createdAt: z.string().datetime(),
});

export const LeadStatusSchema = z.enum(['NEW', 'CONTACTED', 'QUALIFIED', 'LOST']);

export const LeadSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1),
  email: z.string().email(),
  company: z.string().optional(),
  source: z.string().optional(),
  status: LeadStatusSchema,
  createdAt: z.string().datetime(),
});
