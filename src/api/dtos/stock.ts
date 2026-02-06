/**
 * Stock Domain DTOs.
 * 
 * PENDENTE: Sincronizar todos os campos com o backend.
 */

import type { ID } from './common';

export interface StockItemDTO extends ID {
  sku: string;
  name: string;
  quantity: number;
  unit: string;
  location?: string;
  minStock?: number;
  updatedAt: string;
}

export interface StockMovementDTO extends ID {
  // PENDENTE: Definir campos (type, quantity, reason, date)
  type: 'IN' | 'OUT' | 'ADJUSTMENT';
}
