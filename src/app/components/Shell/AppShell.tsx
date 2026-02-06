import React from 'react';
import { Outlet } from 'react-router-dom';
import { AppLayout, Button, Text } from '@shared/ui';
import { useSessionStore } from '@state/sessionStore';
import { useLogout } from '@modules/auth';

/**
 * AppShell.
 * 
 * According to Phase 5.5:
 * - Connects layout to auth state.
 * - Displays basic user info.
 * - Integrates logout action.
 */
export const AppShell: React.FC = () => {
  const user = useSessionStore((state) => state.user);
  const { logout } = useLogout();

  const renderHeaderActions = () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-4)' }}>
      {user && (
        <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column' }}>
          <Text size="sm" weight="medium">{user.name}</Text>
          <Text size="xs" color="neutral">{user.roles[0]}</Text>
        </div>
      )}
      <Button variant="outline" size="sm" onClick={logout}>
        Sair
      </Button>
    </div>
  );

  return (
    <AppLayout renderHeaderActions={renderHeaderActions}>
      <Outlet />
    </AppLayout>
  );
};
