import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBoms } from '../../hooks/useBoms';
import { VirtualTable, type Column, Text, Button, TableSkeleton, ErrorState } from '@shared/ui';
import type { BomDTO } from '@api/dtos/bom';
import { mapErrorCodeToMessage } from '@api/errors';
import styles from './BomList.module.css';

export const BomListPage: React.FC = () => {
  const [page, setPage] = useState(1);
  const limit = 20;
  const navigate = useNavigate();

  const { data, isLoading, error, isPlaceholderData } = useBoms({
    page,
    limit,
  });

  const columns: Column<BomDTO>[] = useMemo(() => [
    {
      header: 'Produto SKU',
      accessor: 'productSku',
      width: '150px',
    },
    {
      header: 'Produto Nome',
      accessor: 'productName',
    },
    {
      header: 'Versão',
      accessor: 'version',
      width: '100px',
    },
    {
      header: 'Data Criação',
      accessor: (item) => new Date(item.createdAt).toLocaleDateString(),
      width: '150px',
    },
    {
      header: 'Ações',
      accessor: (item) => (
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate(`/boms/${item.id}`)}
        >
          Ver Estrutura
        </Button>
      ),
      width: '150px',
    },
  ], [navigate]);

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
        <Text size="2xl" weight="bold">Bill of Materials (BOM)</Text>
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
              emptyMessage="Nenhuma BOM encontrada."
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
