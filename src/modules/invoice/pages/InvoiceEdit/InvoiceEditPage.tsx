import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Text, FormSkeleton, ErrorState } from '@shared/ui';
import { useInvoice } from '../../hooks/useInvoice';
import { useUpdateInvoice } from '../../hooks/useUpdateInvoice';
import { InvoiceForm } from '../../components/InvoiceForm';
import type { CreateInvoiceSchemaType } from '@api/schemas/invoice';
import { mapErrorCodeToMessage } from '@api/errors';

export const InvoiceEditPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: invoice, isLoading, error: loadError } = useInvoice(id || '');
  const { mutate, isPending, error: updateError } = useUpdateInvoice();

  if (isLoading) {
    return <FormSkeleton />;
  }

  if (loadError || !invoice) {
    return (
      <ErrorState
        /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
        message={loadError ? mapErrorCodeToMessage((loadError as any)?.code) : 'Invoice não encontrada.'}
      />
    );
  }

  const handleSubmit = (data: CreateInvoiceSchemaType) => {
    if (!id) return;
    mutate({ id, data }, {
      onSuccess: () => {
        // PENDENTE: Adicionar feedback visual
        navigate('/invoices');
      },
    });
  };

  const initialValues: Partial<CreateInvoiceSchemaType> = {
    customerName: invoice.customerName,
    issueDate: invoice.issueDate ? new Date(invoice.issueDate).toISOString().split('T')[0] : '',
    dueDate: invoice.dueDate ? new Date(invoice.dueDate).toISOString().split('T')[0] : '',
    items: invoice.items,
  };

  return (
    <div style={{ padding: 'var(--spacing-6)' }}>
      <header style={{ marginBottom: 'var(--spacing-6)' }}>
        <Text size="2xl" weight="bold">Editar Invoice {invoice.invoiceNumber}</Text>
      </header>

      {updateError && (
        <div style={{ marginBottom: 'var(--spacing-4)', padding: 'var(--spacing-4)', backgroundColor: '#fee2e2', borderRadius: 'var(--radius-md)' }}>
           {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
           <Text color="error">{mapErrorCodeToMessage((updateError as any)?.code)}</Text>
        </div>
      )}

      <InvoiceForm
        initialValues={initialValues}
        onSubmit={handleSubmit}
        isSubmitting={isPending}
        submitLabel="Salvar Alterações"
      />
    </div>
  );
};
