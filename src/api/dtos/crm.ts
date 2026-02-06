/**
 * CRM Domain DTOs.
 * 
 * PENDENTE: Sincronizar todos os campos com o backend.
 */

import type { ID } from './common';

export interface CustomerDTO extends ID {
  // PENDENTE: Definir campos (name, email, phone, address, taxId)
}

export interface LeadDTO extends ID {
  // PENDENTE: Definir campos (name, source, status, notes)
  status: 'NEW' | 'CONTACTED' | 'QUALIFIED' | 'LOST';
}
