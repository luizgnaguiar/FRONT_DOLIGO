/**
 * Bill of Materials (BOM) Domain DTOs.
 * 
 * PENDENTE: Sincronizar todos os campos com o backend.
 */

import type { ID } from './common';

export interface BomComponentDTO {
  id: string;
  sku: string;
  name: string;
  quantity: number;
  unit: string;
  components?: BomComponentDTO[]; // Recursive for tree visualization
}

export interface BomDTO extends ID {
  productSku: string;
  productName: string;
  version: string;
  description?: string;
  components: BomComponentDTO[];
  createdAt: string;
}
