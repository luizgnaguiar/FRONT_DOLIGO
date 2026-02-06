import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useInvoices } from '../../hooks/useInvoices';
import { VirtualTable, type Column, Text, Skeleton, Button, Can } from '@shared/ui';
import type { InvoiceDTO } from '@api/dtos/invoice';
import { mapErrorCodeToMessage } from '@api/errors';
import styles from './InvoiceList.module.css';

/**
 * InvoiceListPage.
 * 
 * According to Phase 6.2 & 6.7:
 * - Table with mandatory virtualization.
 * - RBAC integration for actions.
 */

export const InvoiceListPage: React.FC = () => {
  const [page, setPage] = useState(1);
  const limit = 20;
  const navigate = useNavigate();

  const { data, isLoading, error, isPlaceholderData } = useInvoices({
    page,
    limit,
  });

  const columns: Column<InvoiceDTO>[] = [
    {
      header: 'Número',
      accessor: 'invoiceNumber',
      width: '150px',
    },
    {
      header: 'Cliente',
      accessor: 'customerName',
    },
    {
      header: 'Data',
      accessor: (item) => new Date(item.issueDate).toLocaleDateString(),
      width: '120px',
    },
    {
      header: 'Total',
      accessor: (item) =>
        new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }).format(item.totalAmount),
      width: '150px',
    },
    {
      header: 'Status',
      accessor: (item) => (
        <span className={`${styles.status} ${styles[item.status.toLowerCase()]}`}>
          {item.status}
        </span>
      ),
      width: '120px',
    },
    {
      header: 'Ações',
      accessor: (item) => (
        <Can anyRoles={['admin', 'manager']}>
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate(`/invoices/${item.id}/edit`)}
          >
            Editar
          </Button>
        </Can>
      ),
      width: '100px',
    },
  ];

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <Text color="error">{mapErrorCodeToMessage((error as any)?.code)}</Text>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Text size="2xl" weight="bold">Invoices</Text>
        <Can anyRoles={['admin', 'manager']}>
          <Button size="sm" onClick={() => navigate('/invoices/new')}>
            Nova Invoice
          </Button>
        </Can>
      </header>

      <main className={styles.content}>
        {isLoading ? (
          <div className={styles.skeletonWrapper}>
            <Skeleton height="40px" width="100%" className={styles.skeletonRow} />
            <Skeleton height="600px" width="100%" />
          </div>
        ) : (
          <>
            <VirtualTable
              columns={columns}
              data={data?.data || []}
              height="600px"
              emptyMessage="Nenhuma invoice encontrada."
            />

            <footer className={styles.pagination}>
              <button
                className={styles.pageButton}
                onClick={() => setPage((old) => Math.max(old - 1, 1))}
                disabled={page === 1 || isPlaceholderData}
              >
                Anterior
              </button>
              <Text size="sm">
                Página {page} de {data?.meta.totalPages || 1}
              </Text>
              <button
                className={styles.pageButton}
                onClick={() => setPage((old) => (data?.meta && page < data.meta.totalPages ? old + 1 : old))}
                disabled={!data?.meta || page >= data.meta.totalPages || isPlaceholderData}
              >
                Próxima
              </button>
            </footer>
          </>
        )}
      </main>
    </div>
  );
};
