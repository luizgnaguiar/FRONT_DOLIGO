import { z } from 'zod';

/**
 * Auth Domain Schemas.
 * 
 * PENDENTE: Sincronizar regras de validação com o backend.
 */

export const LoginRequestSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export const LoginResponseSchema = z.object({
  token: z.string(),
  expiresIn: z.number().optional(),
});

export const UserSessionSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  roles: z.array(z.string()),
});
