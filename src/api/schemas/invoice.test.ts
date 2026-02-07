import { describe, it, expect } from 'vitest';
import { CreateInvoiceSchema } from './invoice';

describe('CreateInvoiceSchema', () => {
  it('should validate a correct invoice object', () => {
    const validInvoice = {
      customerName: 'Cliente Teste',
      issueDate: '2023-10-01',
      dueDate: '2023-10-15',
      items: [
        { description: 'Item 1', quantity: 2, unitPrice: 100 },
      ],
    };
    const result = CreateInvoiceSchema.safeParse(validInvoice);
    expect(result.success).toBe(true);
  });

  it('should fail validation if customerName is empty', () => {
    const invalidInvoice = {
      customerName: '',
      issueDate: '2023-10-01',
      dueDate: '2023-10-15',
      items: [{ description: 'Item 1', quantity: 1, unitPrice: 10 }],
    };
    const result = CreateInvoiceSchema.safeParse(invalidInvoice);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('Nome do cliente é obrigatório');
    }
  });

  it('should fail if items array is empty', () => {
    const invalidInvoice = {
      customerName: 'Cliente',
      issueDate: '2023-10-01',
      dueDate: '2023-10-15',
      items: [],
    };
    const result = CreateInvoiceSchema.safeParse(invalidInvoice);
    expect(result.success).toBe(false);
    if (!result.success) {
        expect(result.error.issues[0].message).toBe('Adicione pelo menos um item');
    }
  });
});
