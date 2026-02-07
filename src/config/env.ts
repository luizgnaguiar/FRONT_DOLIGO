/**
 * Centralized Environment Configuration.
 * 
 * According to Phase 10.3:
 * - Validates mandatory environment variables.
 * - Provides type-safe access to configuration.
 */

const getEnv = (key: string, defaultValue?: string): string => {
  const value = import.meta.env[key];
  if (!value && defaultValue === undefined) {
    throw new Error(`Environment variable ${key} is required but missing.`);
  }
  return value || defaultValue || '';
};

export const config = {
  apiUrl: getEnv('VITE_API_URL', 'http://localhost:8080'),
  isProduction: import.meta.env.PROD,
  isDevelopment: import.meta.env.DEV,
} as const;
