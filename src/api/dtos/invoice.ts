/**
 * Invoice Domain DTOs.
 * 
 * PENDENTE: Sincronizar todos os campos com o backend.
 */

import type { ID } from './common';

export interface InvoiceDTO extends ID {
  // PENDENTE: Sincronizar campos com o backend
  invoiceNumber: string;
  customerName: string;
  issueDate: string;
  totalAmount: number;
  status: 'DRAFT' | 'ISSUED' | 'PAID' | 'CANCELLED';
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface CreateInvoiceDTO {
  // PENDENTE: Payload de criação
}
