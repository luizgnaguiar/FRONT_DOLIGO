/**
 * Stock Domain DTOs.
 * 
 * PENDENTE: Sincronizar todos os campos com o backend.
 */

import type { ID } from './common';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface StockItemDTO extends ID {
  // PENDENTE: Definir campos (sku, name, quantity, location)
}

export interface StockMovementDTO extends ID {
  // PENDENTE: Definir campos (type, quantity, reason, date)
  type: 'IN' | 'OUT' | 'ADJUSTMENT';
}
