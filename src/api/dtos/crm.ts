/**
 * CRM Domain DTOs.
 * 
 * PENDENTE: Sincronizar todos os campos com o backend.
 */

import type { ID } from './common';

export interface CustomerDTO extends ID {
  name: string;
  email: string;
  phone?: string;
  taxId?: string; // CNPJ/CPF
  type: 'COMPANY' | 'INDIVIDUAL';
  status: 'ACTIVE' | 'INACTIVE';
  createdAt: string;
}

export interface LeadDTO extends ID {
  name: string;
  email: string;
  company?: string;
  source?: string;
  status: 'NEW' | 'CONTACTED' | 'QUALIFIED' | 'LOST';
  createdAt: string;
}
