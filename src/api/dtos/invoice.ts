/**
 * Invoice Domain DTOs.
 * 
 * PENDENTE: Sincronizar todos os campos com o backend.
 */

import type { ID } from './common';

export interface InvoiceDTO extends ID {
  // PENDENTE: Definir campos (number, date, customer, items, total, status)
  status: 'DRAFT' | 'ISSUED' | 'PAID' | 'CANCELLED'; // Exemplo provisório
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface CreateInvoiceDTO {
  // PENDENTE: Payload de criação
}
