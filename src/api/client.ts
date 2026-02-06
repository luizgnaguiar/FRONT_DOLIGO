import axios from 'axios';

/**
 * Central HTTP client instance for the Doligo Frontend.
 * 
 * According to Phase 2.1:
 * - Unique instance for the entire application.
 * - Base configuration (baseURL, common headers).
 * - Global timeout.
 * 
 * Interceptors and authentication will be implemented in future phases.
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';
const DEFAULT_TIMEOUT = 30000; // 30 seconds

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: DEFAULT_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

// For cases where manual cancellation is needed (e.g. polling, large jobs)
export const createAbortController = () => new AbortController();
