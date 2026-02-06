import React from 'react';
import styles from './Header.module.css';
import { Text } from '../../Text';

export const Header: React.FC = () => {
  return (
    <header className={styles.header} aria-label="Cabeçalho da aplicação">
      <div className={styles.logo}>
        <Text weight="bold" size="lg" color="primary">DOLIGO</Text>
      </div>
      <div className={styles.actions}>
        {/* PENDENTE: Perfil do usuário e notificações */}
      </div>
    </header>
  );
};
