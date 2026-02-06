import axios from 'axios';
import { useSessionStore } from '@state/sessionStore';
import { queryClient } from '@state/queryClient';
import { mapErrorCodeToMessage, type ApiErrorResponse } from './errors';

/**
 * Central HTTP client instance for the Doligo Frontend.
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
    const { token } = useSessionStore.getState();
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => Promise.reject(error)
);

// RESPONSE INTERCEPTOR: Error Handling (401, 403, 429, 5xx)
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const { response } = error;
    const { clearSession } = useSessionStore.getState();

    if (response) {
      const data = response.data as ApiErrorResponse;
      const errorCode = data?.code;
      
      // Adiciona mensagem amigável ao objeto de erro para uso futuro na UI
      error.uiMessage = mapErrorCodeToMessage(errorCode);

      switch (response.status) {
        case 401:
          clearSession();
          queryClient.clear();
          break;
        case 403:
          // PENDENTE: Log ou tratamento específico de permissão se necessário
          break;
        case 429:
          // O retry é gerenciado pelo TanStack Query (Fase 3.2)
          break;
        case 500:
        case 502:
        case 503:
        case 504:
          // O retry é gerenciado pelo TanStack Query (Fase 3.2)
          break;
      }
    } else {
      error.uiMessage = mapErrorCodeToMessage(); // Fallback para erro de rede/timeout
    }

    return Promise.reject(error);
  }
);

// For cases where manual cancellation is needed (e.g. polling, large jobs)
export const createAbortController = () => new AbortController();
