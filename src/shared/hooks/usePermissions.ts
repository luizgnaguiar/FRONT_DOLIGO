import { useSessionStore } from '@state/sessionStore';

/**
 * Hook for Role-Based Access Control (RBAC) helpers.
 * 
 * According to Phase 5.4:
 * - Used for UX only (show/hide menus and buttons).
 * - Reads roles from the session store.
 */
export const usePermissions = () => {
  const user = useSessionStore((state) => state.user);
  const roles = user?.roles || [];

  /**
   * Checks if the user has a specific role.
   */
  const hasRole = (role: string) => {
    return roles.includes(role);
  };

  /**
   * Checks if the user has any of the provided roles.
   */
  const hasAnyRole = (requiredRoles: string[]) => {
    return requiredRoles.some((role) => roles.includes(role));
  };

  /**
   * Helper for domain-specific permissions (can be expanded).
   * Example: can('invoice:create')
   */
  const can = (permission: string) => {
    // PENDENTE: Implement explicit permission mapping if roles are not enough
    // For now, mapping admin to everything as an example
    if (hasRole('admin')) return true;
    
    // Example logic
    return roles.includes(permission);
  };

  return { roles, hasRole, hasAnyRole, can };
};
