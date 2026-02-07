import React, { lazy, Suspense } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useBom } from '../../hooks/useBoms';
import { Text, Button, Spinner, FormSkeleton, ErrorState } from '@shared/ui';
import { mapErrorCodeToMessage } from '@api/errors';
import styles from './BomDetail.module.css';

const BomTree = lazy(() => import('../../components/BomTree/BomTree').then(m => ({ default: m.BomTree })));

/**
 * BomDetailPage.
 * 
 * According to Phase 6.5 & 8.2:
 * - Hierarchical visualization.
 * - Lazy loading of the heavy recursive tree component.
 */
export const BomDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data, isLoading, error } = useBom(id || '');

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
        <div className={styles.titleArea}>
          <Button variant="outline" size="sm" onClick={() => navigate('/boms')}>
            ← Voltar
          </Button>
          <Text size="2xl" weight="bold">Estrutura de Produto (BOM)</Text>
        </div>
      </header>

      <main className={styles.content}>
        {isLoading ? (
          <FormSkeleton />
        ) : data ? (
          <div className={styles.card}>
            <div className={styles.bomInfo}>
              <div className={styles.infoGroup}>
                <Text size="sm" color="neutral" weight="medium">PRODUTO</Text>
                <Text size="lg" weight="bold">{data.productName}</Text>
                <Text size="sm" color="primary">{data.productSku}</Text>
              </div>
              <div className={styles.infoGroup}>
                <Text size="sm" color="neutral" weight="medium">VERSÃO</Text>
                <Text size="lg" weight="bold">{data.version}</Text>
              </div>
            </div>

            <div className={styles.treeSection}>
              <Text size="base" weight="bold" className={styles.sectionTitle}>Componentes</Text>
              <div className={styles.treeWrapper}>
                <Suspense fallback={<Spinner size="sm" />}>
                  <BomTree components={data.components} />
                </Suspense>
              </div>
            </div>
          </div>
        ) : null}
      </main>
    </div>
  );
};
