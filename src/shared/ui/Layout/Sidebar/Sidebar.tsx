import React from 'react';
import styles from './Sidebar.module.css';

export const Sidebar: React.FC = () => {
  return (
    <aside className={styles.sidebar} aria-label="Barra lateral de navegação">
      <nav className={styles.nav} aria-label="Menu principal">
        {/* PENDENTE: Links de navegação baseados em domínios */}
        <div className={styles.navPlaceholder}>
          Menu de Navegação
        </div>
      </nav>
    </aside>
  );
};
