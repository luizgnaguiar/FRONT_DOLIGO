import React from 'react';
import { Skeleton } from './Skeleton';

interface TableSkeletonProps {
  height?: string | number;
}

export const TableSkeleton: React.FC<TableSkeletonProps> = ({
  height = '600px',
}) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)' }}>
      <Skeleton height="40px" width="100%" />
      <Skeleton height={height} width="100%" />
    </div>
  );
};
