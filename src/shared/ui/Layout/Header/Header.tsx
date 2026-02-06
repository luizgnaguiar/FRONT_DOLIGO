import React from 'react';
import styles from './Header.module.css';
import { Text } from '../../Text';

interface HeaderProps {
  renderActions?: () => React.ReactNode;
}

export const Header: React.FC<HeaderProps> = ({ renderActions }) => {
  return (
    <header className={styles.header} aria-label="Cabeçalho da aplicação">
      <div className={styles.logo}>
        <Text weight="bold" size="lg" color="primary">DOLIGO</Text>
      </div>
      <div className={styles.actions}>
        {renderActions?.()}
      </div>
    </header>
  );
};
