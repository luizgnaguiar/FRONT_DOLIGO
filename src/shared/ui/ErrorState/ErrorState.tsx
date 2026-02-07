import React from 'react';
import { Text } from '../Text';
import { Button } from '../Button';
import styles from './ErrorState.module.css';

interface ErrorStateProps {
  message: string;
  onRetry?: () => void;
  title?: string;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  message,
  onRetry,
  title = 'Ops! Algo deu errado.',
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.icon}>✕</div>
      <Text size="xl" weight="bold" className={styles.title}>{title}</Text>
      <Text color="neutral" className={styles.message}>{message}</Text>
      {onRetry && (
        <Button variant="outline" onClick={onRetry} className={styles.button}>
          Tentar Novamente
        </Button>
      )}
    </div>
  );
};
