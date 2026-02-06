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
  dueDate: string;
  totalAmount: number;
  status: 'DRAFT' | 'ISSUED' | 'PAID' | 'CANCELLED';
  items: InvoiceItemDTO[];
}

export interface InvoiceItemDTO {
  description: string;
  quantity: number;
  unitPrice: number;
}

export interface CreateInvoiceDTO {
  customerName: string;
  issueDate: string; // YYYY-MM-DD
  dueDate: string;   // YYYY-MM-DD
  items: InvoiceItemDTO[];
}
