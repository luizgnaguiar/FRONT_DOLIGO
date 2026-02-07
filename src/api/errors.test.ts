import { describe, it, expect } from 'vitest';
import { mapErrorCodeToMessage, ErrorCode } from './errors';

describe('mapErrorCodeToMessage', () => {
  it('should return the correct message for known error codes', () => {
    expect(mapErrorCodeToMessage(ErrorCode.UNAUTHORIZED)).toBe('Sessão expirada. Por favor, faça login novamente.');
    expect(mapErrorCodeToMessage(ErrorCode.NOT_FOUND)).toBe('O recurso solicitado não foi encontrado.');
  });

  it('should return the default message for unknown error codes', () => {
    expect(mapErrorCodeToMessage('UNKNOWN_CODE')).toBe('Ocorreu um erro inesperado.');
  });

  it('should return the default message when code is undefined', () => {
    expect(mapErrorCodeToMessage(undefined)).toBe('Ocorreu um erro inesperado.');
  });
});
