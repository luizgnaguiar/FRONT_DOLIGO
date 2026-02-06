import React from 'react';
import { NavLink } from 'react-router-dom';
import { Can } from '../../Can';
import styles from './Sidebar.module.css';

export const Sidebar: React.FC = () => {
  return (
    <aside className={styles.sidebar} aria-label="Barra lateral de navegação">
      <nav className={styles.nav} aria-label="Menu principal">
        <Can anyRoles={['admin', 'manager', 'user']}>
          <NavLink 
            to="/invoices" 
            className={({ isActive }) => isActive ? `${styles.navLink} ${styles.active}` : styles.navLink}
          >
            Invoices
          </NavLink>
        </Can>
        
        <Can anyRoles={['admin', 'manager', 'stock_manager']}>
          <NavLink 
            to="/stock" 
            className={({ isActive }) => isActive ? `${styles.navLink} ${styles.active}` : styles.navLink}
          >
            Estoque
          </NavLink>
        </Can>

        <Can anyRoles={['admin', 'manager', 'engineer']}>
          <NavLink 
            to="/boms" 
            className={({ isActive }) => isActive ? `${styles.navLink} ${styles.active}` : styles.navLink}
          >
            BOM
          </NavLink>
        </Can>

        <Can anyRoles={['admin', 'manager', 'sales']}>
          <NavLink 
            to="/customers" 
            className={({ isActive }) => isActive ? `${styles.navLink} ${styles.active}` : styles.navLink}
          >
            Clientes
          </NavLink>
          <NavLink 
            to="/leads" 
            className={({ isActive }) => isActive ? `${styles.navLink} ${styles.active}` : styles.navLink}
          >
            Leads
          </NavLink>
        </Can>
      </nav>
    </aside>
  );
};
