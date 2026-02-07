import React from 'react';
import type { JobDTO } from '@api/dtos/job';
import { Spinner, Text } from '@shared/ui';
import styles from './JobStatusBadge.module.css';

interface JobStatusBadgeProps {
  job: JobDTO;
  label?: string;
}

export const JobStatusBadge: React.FC<JobStatusBadgeProps> = ({ job, label }) => {
  if (job.status === 'PENDING' || job.status === 'PROCESSING') {
    return (
      <div className={`${styles.badge} ${styles.processing}`}>
        <Spinner size="sm" />
        <Text size="xs" weight="medium">
          {label || 'Processando...'} {job.progress ? `${job.progress}%` : ''}
        </Text>
      </div>
    );
  }

  if (job.status === 'COMPLETED') {
    return (
      <div className={`${styles.badge} ${styles.completed}`}>
        <span className={styles.icon}>✓</span>
        <Text size="xs" weight="medium">{label || 'Concluído'}</Text>
      </div>
    );
  }

  if (job.status === 'FAILED' || job.status === 'CANCELLED') {
    return (
      <div className={`${styles.badge} ${styles.failed}`}>
        <span className={styles.icon}>✕</span>
        <Text size="xs" weight="medium">Erro</Text>
      </div>
    );
  }

  return null;
};
