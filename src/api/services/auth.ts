import { apiClient } from '../client';
import type { LoginRequest, LoginResponse } from '../dtos/auth';

/**
 * Auth Service.
 * 
 * According to Phase 5.1:
 * - Pure API call using apiClient.
 * - Functional login flow.
 */

export const authService = {
  login: async (credentials: LoginRequest): Promise<LoginResponse> => {
    const response = await apiClient.post<LoginResponse>('/auth/login', credentials);
    return response.data;
  },
};
