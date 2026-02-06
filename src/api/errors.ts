/**
 * API Error Mapping and Types for the Doligo Frontend.
 * 
 * According to Phase 2.3:
 * - Central mapping from ErrorCode to UIMessage.
 * - Standardized API error types.
 * - Decoupled from React and UI components.
 */

/**
 * Standard API error response structure from the backend.
 */
export interface ApiErrorResponse {
  code: string;
  message: string;
  details?: Record<string, string[]>;
}

/**
 * Known error codes from the backend.
 * These should match the ErrorCodes defined in the Go backend.
 */
export const ErrorCode = {
  UNAUTHORIZED: 'UNAUTHORIZED',
  FORBIDDEN: 'FORBIDDEN',
  NOT_FOUND: 'NOT_FOUND',
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  INTERNAL_ERROR: 'INTERNAL_ERROR',
  RATE_LIMIT_EXCEEDED: 'RATE_LIMIT_EXCEEDED',
  CONFLICT: 'CONFLICT',
} as const;

export type ErrorCode = (typeof ErrorCode)[keyof typeof ErrorCode];

/**
 * Central mapping from ErrorCode to a generic UI message.
 * Specific messages for forms or domain-specific errors will be 
 * handled in future phases.
 */
export const ERROR_MAP: Record<string, string> = {
  [ErrorCode.UNAUTHORIZED]: 'Sessão expirada. Por favor, faça login novamente.',
  [ErrorCode.FORBIDDEN]: 'Você não tem permissão para realizar esta ação.',
  [ErrorCode.NOT_FOUND]: 'O recurso solicitado não foi encontrado.',
  [ErrorCode.VALIDATION_ERROR]: 'Verifique os dados informados.',
  [ErrorCode.INTERNAL_ERROR]: 'Ocorreu um erro interno no servidor. Tente novamente mais tarde.',
  [ErrorCode.RATE_LIMIT_EXCEEDED]: 'Muitas requisições. Por favor, aguarde um momento.',
  [ErrorCode.CONFLICT]: 'Este registro já existe ou está em conflito.',
  DEFAULT: 'Ocorreu um erro inesperado.',
};

/**
 * Helper function to map an error code to a UI message.
 */
export const mapErrorCodeToMessage = (code?: string): string => {
  if (!code) return ERROR_MAP.DEFAULT;
  return ERROR_MAP[code] || ERROR_MAP.DEFAULT;
};
