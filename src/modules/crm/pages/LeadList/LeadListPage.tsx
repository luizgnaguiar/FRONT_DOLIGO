import React, { useState } from 'react';
import { useLeads } from '../../hooks/useLeads';
import { VirtualTable, type Column, Text, Input, TableSkeleton } from '@shared/ui';
import type { LeadDTO } from '@api/dtos/crm';
import { mapErrorCodeToMessage } from '@api/errors';
import styles from './LeadList.module.css';

export const LeadListPage: React.FC = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const limit = 20;

  const { data, isLoading, error, isPlaceholderData } = useLeads({
    page,
    limit,
    search: search || undefined,
  });

  const columns: Column<LeadDTO>[] = [
    {
      header: 'Nome',
      accessor: 'name',
    },
    {
      header: 'Email',
      accessor: 'email',
    },
    {
      header: 'Empresa',
      accessor: 'company',
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
      header: 'Origem',
      accessor: 'source',
      width: '120px',
    },
  ];

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage(1);
  };

  if (error) {
    return (
      <div className={styles.errorContainer}>
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        <Text color="error">{mapErrorCodeToMessage((error as any)?.code)}</Text>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Text size="2xl" weight="bold">Leads</Text>
        <div className={styles.filters}>
          <Input
            placeholder="Buscar leads..."
            value={search}
            onChange={handleSearchChange}
          />
        </div>
      </header>

      <main className={styles.content}>
        {isLoading ? (
          <TableSkeleton />
        ) : (
          <>
            <VirtualTable
              columns={columns}
              data={data?.data || []}
              height="600px"
              emptyMessage="Nenhum lead encontrado."
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
