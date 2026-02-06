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

// REQUEST INTERCEPTOR: Authorization
apiClient.interceptors.request.use(
  (config) => {
    // PENDENTE: Recuperar JWT do storage (Phase 2.3+)
    // const token = null; 
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => Promise.reject(error)
);

// RESPONSE INTERCEPTOR: Error Handling (401, 403, 429, 5xx)
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const { response } = error;

    if (response) {
      switch (response.status) {
        case 401:
          // PENDENTE: Logout global (Phase 2.3+)
          // console.warn('Não autorizado - redirecionando para login');
          break;
        case 403:
          // PENDENTE: Fallback de permissão
          // console.warn('Sem permissão para esta ação');
          break;
        case 429:
          // PENDENTE: Retry com backoff
          // console.warn('Muitas requisições - aguardando retry');
          break;
        case 500:
        case 502:
        case 503:
        case 504:
          // PENDENTE: Retry limitado
          // console.warn('Erro de servidor - aguardando retry');
          break;
      }
    }

    return Promise.reject(error);
  }
);

// For cases where manual cancellation is needed (e.g. polling, large jobs)
export const createAbortController = () => new AbortController();
