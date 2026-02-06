import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Sidebar.module.css';

export const Sidebar: React.FC = () => {
  return (
    <aside className={styles.sidebar} aria-label="Barra lateral de navegação">
      <nav className={styles.nav} aria-label="Menu principal">
        <NavLink 
          to="/invoices" 
          className={({ isActive }) => isActive ? `${styles.navLink} ${styles.active}` : styles.navLink}
        >
          Invoices
        </NavLink>
        <NavLink 
          to="/stock" 
          className={({ isActive }) => isActive ? `${styles.navLink} ${styles.active}` : styles.navLink}
        >
          Estoque
        </NavLink>
        {/* PENDENTE: Outros links de domínios */}
      </nav>
    </aside>
  );
};
