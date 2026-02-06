import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useBom } from '../../hooks/useBoms';
import { BomTree } from '../../components/BomTree/BomTree';
import { Text, Skeleton, Button } from '@shared/ui';
import { mapErrorCodeToMessage } from '@api/errors';
import styles from './BomDetail.module.css';

export const BomDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data, isLoading, error } = useBom(id!);

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <Text color="error">{mapErrorCodeToMessage((error as any)?.code)}</Text>
        <Button onClick={() => navigate('/boms')} className={styles.backButton}>
          Voltar para Lista
        </Button>
      </div>
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
          <div className={styles.skeletonWrapper}>
            <Skeleton height="40px" width="300px" />
            <Skeleton height="400px" width="100%" />
          </div>
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
                <BomTree components={data.components} />
              </div>
            </div>
          </div>
        ) : null}
      </main>
    </div>
  );
};
