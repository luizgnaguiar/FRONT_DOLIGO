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

export const InvoiceItemSchema = z.object({
  description: z.string().min(1, 'Descrição é obrigatória'),
  quantity: z.number().min(1, 'Quantidade deve ser maior que zero'),
  unitPrice: z.number().min(0, 'Preço unitário não pode ser negativo'),
});

export const CreateInvoiceSchema = z.object({
  customerName: z.string().min(1, 'Nome do cliente é obrigatório'),
  issueDate: z.string().refine((val) => !isNaN(Date.parse(val)), 'Data de emissão inválida'),
  dueDate: z.string().refine((val) => !isNaN(Date.parse(val)), 'Data de vencimento inválida'),
  items: z.array(InvoiceItemSchema).min(1, 'Adicione pelo menos um item'),
});

export type CreateInvoiceSchemaType = z.infer<typeof CreateInvoiceSchema>;
