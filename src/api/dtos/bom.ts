/**
 * Bill of Materials (BOM) Domain DTOs.
 * 
 * PENDENTE: Sincronizar todos os campos com o backend.
 */

import type { ID } from './common';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface BomDTO extends ID {
  // PENDENTE: Definir campos (product, components, quantity, version)
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface BomComponentDTO {
  // PENDENTE: Definir campos (item, quantity, unit)
}
