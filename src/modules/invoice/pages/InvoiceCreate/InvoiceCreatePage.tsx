import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Text } from '@shared/ui';
import { useCreateInvoice } from '../../hooks/useCreateInvoice';
import { InvoiceForm } from '../../components/InvoiceForm';
import type { CreateInvoiceSchemaType } from '@api/schemas/invoice';
import { mapErrorCodeToMessage } from '@api/errors';

export const InvoiceCreatePage: React.FC = () => {
  const navigate = useNavigate();
  const { mutate, isPending, error } = useCreateInvoice();

  const handleSubmit = (data: CreateInvoiceSchemaType) => {
    mutate(data, {
      onSuccess: () => {
        // PENDENTE: Adicionar feedback visual (toast)
        navigate('/invoices');
      },
    });
  };

  return (
    <div style={{ padding: 'var(--spacing-6)' }}>
      <header style={{ marginBottom: 'var(--spacing-6)' }}>
        <Text size="2xl" weight="bold">Nova Invoice</Text>
      </header>

      {error && (
        <div style={{ marginBottom: 'var(--spacing-4)', padding: 'var(--spacing-4)', backgroundColor: '#fee2e2', borderRadius: 'var(--radius-md)' }}>
           {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
           <Text color="error">{mapErrorCodeToMessage((error as any)?.code)}</Text>
        </div>
      )}

      <InvoiceForm
        onSubmit={handleSubmit}
        isSubmitting={isPending}
        submitLabel="Criar Invoice"
      />
    </div>
  );
};
