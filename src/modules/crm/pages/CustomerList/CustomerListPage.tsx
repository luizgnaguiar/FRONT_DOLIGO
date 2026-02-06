import React, { useState } from 'react';
import { useCustomers } from '../../hooks/useCustomers';
import { VirtualTable, type Column, Text, Skeleton, Input } from '@shared/ui';
import type { CustomerDTO } from '@api/dtos/crm';
import { mapErrorCodeToMessage } from '@api/errors';
import styles from './CustomerList.module.css';

export const CustomerListPage: React.FC = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const limit = 20;

  const { data, isLoading, error, isPlaceholderData } = useCustomers({
    page,
    limit,
    search: search || undefined,
  });

  const columns: Column<CustomerDTO>[] = [
    {
      header: 'Nome',
      accessor: 'name',
    },
    {
      header: 'Email',
      accessor: 'email',
    },
    {
      header: 'Tipo',
      accessor: (item) => item.type === 'COMPANY' ? 'Empresa' : 'Pessoa Física',
      width: '120px',
    },
    {
      header: 'Status',
      accessor: (item) => (
        <span className={`${styles.status} ${styles[item.status.toLowerCase()]}`}>
          {item.status === 'ACTIVE' ? 'Ativo' : 'Inativo'}
        </span>
      ),
      width: '100px',
    },
  ];

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage(1);
  };

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
        <Text size="2xl" weight="bold">Clientes</Text>
        <div className={styles.filters}>
          <Input
            placeholder="Buscar clientes..."
            value={search}
            onChange={handleSearchChange}
          />
        </div>
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
              emptyMessage="Nenhum cliente encontrado."
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
