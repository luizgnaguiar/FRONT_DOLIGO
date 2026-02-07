import React from 'react';
import { Skeleton } from './Skeleton';

interface FormSkeletonProps {
  fields?: number;
}

export const FormSkeleton: React.FC<FormSkeletonProps> = ({ fields = 3 }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-6)', padding: 'var(--spacing-6)' }}>
      <Skeleton height="40px" width="300px" />
      <div style={{ display: 'flex', gap: 'var(--spacing-4)' }}>
        {Array.from({ length: fields }).map((_, i) => (
          <Skeleton key={i} height="60px" style={{ flex: 1 }} />
        ))}
      </div>
      <Skeleton height="200px" width="100%" />
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--spacing-4)' }}>
        <Skeleton height="40px" width="100px" />
        <Skeleton height="40px" width="150px" />
      </div>
    </div>
  );
};
