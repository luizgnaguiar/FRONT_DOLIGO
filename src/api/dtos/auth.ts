/**
 * Auth Domain DTOs.
 * 
 * PENDENTE: Confirmar estrutura exata de claims e response de login.
 */

export interface LoginRequest {
  // PENDENTE: Confirmar se é email/username
  email: string; 
  password: string;
}

export interface LoginResponse {
  token: string;
  // PENDENTE: Verificar se retorna user info ou refresh token
  expiresIn?: number; 
}

export interface UserSession {
  // PENDENTE: Estrutura do usuário decodificada do token ou retornada
  id: string;
  name: string;
  roles: string[];
}
