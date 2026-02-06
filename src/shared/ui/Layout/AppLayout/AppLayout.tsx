import React from 'react';
import styles from './AppLayout.module.css';
import { Header } from '../Header/Header';
import { Sidebar } from '../Sidebar/Sidebar';
import { MainContent } from '../MainContent/MainContent';

interface AppLayoutProps {
  children: React.ReactNode;
  renderHeaderActions?: () => React.ReactNode;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ children, renderHeaderActions }) => {
  return (
    <div className={styles.wrapper}>
      <a href="#main-content" className="skip-to-content">
        Pular para o conteúdo
      </a>
      <Header renderActions={renderHeaderActions} />
      <div className={styles.body}>
        <Sidebar />
        <MainContent>
          <div id="main-content" tabIndex={-1} style={{ outline: 'none' }}>
            {children}
          </div>
        </MainContent>
      </div>
    </div>
  );
};
