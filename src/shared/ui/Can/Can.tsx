import React from 'react';
import { usePermissions } from '../../hooks/usePermissions';

interface CanProps {
  role?: string;
  anyRoles?: string[];
  permission?: string;
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

/**
 * Component for conditional rendering based on RBAC.
 * 
 * According to Phase 5.4:
 * - Purely for UX (show/hide elements).
 */
export const Can: React.FC<CanProps> = ({
  role,
  anyRoles,
  permission,
  children,
  fallback = null,
}) => {
  const { hasRole, hasAnyRole, can } = usePermissions();

  let allowed = true;

  if (role) allowed = hasRole(role);
  if (anyRoles) allowed = hasAnyRole(anyRoles);
  if (permission) allowed = can(permission);

  return allowed ? <>{children}</> : <>{fallback}</>;
};
