import React from 'react';
import styles from './Sidebar.module.css';

export const Sidebar: React.FC = () => {
  return (
    <aside className={styles.sidebar}>
      <nav className={styles.nav}>
        {/* PENDENTE: Links de navegação baseados em domínios */}
        <div className={styles.navPlaceholder}>
          Menu de Navegação
        </div>
      </nav>
    </aside>
  );
};
