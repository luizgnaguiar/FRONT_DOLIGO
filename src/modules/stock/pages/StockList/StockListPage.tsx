import React, { useState, useMemo } from 'react';
import { useStockItems } from '../../hooks/useStockItems';
import { VirtualTable, type Column, Text, Input, TableSkeleton, ErrorState } from '@shared/ui';
import type { StockItemDTO } from '@api/dtos/stock';
import { mapErrorCodeToMessage } from '@api/errors';
import styles from './StockList.module.css';

/**
 * StockListPage.
 * 
 * According to Phase 6.4 & 8.6:
 * - Table with mandatory virtualization.
 * - Memoized columns for performance.
 */
export const StockListPage: React.FC = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const limit = 20;

  const { data, isLoading, error, isPlaceholderData } = useStockItems({
    page,
    limit,
    search: search || undefined,
  });

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage(1); // Reset to first page on search
  };

  const columns: Column<StockItemDTO>[] = useMemo(() => [
    {
      header: 'SKU',
      accessor: 'sku',
      width: '120px',
    },
    {
      header: 'Nome',
      accessor: 'name',
    },
    {
      header: 'Quantidade',
      accessor: (item) => (
        <span className={`${styles.quantity} ${item.minStock && item.quantity <= item.minStock ? styles.lowStock : ''}`}>
          {item.quantity} {item.unit}
        </span>
      ),
      width: '150px',
    },
    {
      header: 'Localização',
      accessor: 'location',
      width: '150px',
    },
    {
      header: 'Última Atualização',
      accessor: (item) => new Date(item.updatedAt).toLocaleDateString(),
      width: '150px',
    },
  ], []);

  if (error) {
    return (
      <ErrorState
        /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
        message={mapErrorCodeToMessage((error as any)?.code)}
      />
    );
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Text size="2xl" weight="bold">Estoque</Text>
        <div className={styles.filters}>
          <Input
            placeholder="Buscar por nome ou SKU..."
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
              emptyMessage="Nenhum item de estoque encontrado."
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
