import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Text, Skeleton, Button } from '@shared/ui';
import { useInvoice } from '../../hooks/useInvoice';
import { useUpdateInvoice } from '../../hooks/useUpdateInvoice';
import { InvoiceForm } from '../../components/InvoiceForm';
import type { CreateInvoiceSchemaType } from '@api/schemas/invoice';
import { mapErrorCodeToMessage } from '@api/errors';

export const InvoiceEditPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: invoice, isLoading, error: loadError } = useInvoice(id!);
  const { mutate, isPending, error: updateError } = useUpdateInvoice();

  if (isLoading) {
    return (
      <div style={{ padding: 'var(--spacing-6)' }}>
         <Skeleton height="40px" width="200px" style={{ marginBottom: 'var(--spacing-6)' }} />
         <Skeleton height="400px" width="100%" />
      </div>
    );
  }

  if (loadError || !invoice) {
    return (
       <div style={{ padding: 'var(--spacing-6)', display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)' }}>
        <Text color="error">
          {loadError ? mapErrorCodeToMessage((loadError as any)?.code) : 'Invoice não encontrada.'}
        </Text>
        <div style={{ width: 'fit-content' }}>
            <Button variant="outline" onClick={() => navigate('/invoices')}>Voltar</Button>
        </div>
      </div>
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
