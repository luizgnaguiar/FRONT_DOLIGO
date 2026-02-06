import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginRequestSchema } from '@api/schemas/auth';
import type { LoginRequest } from '@api/dtos/auth';
import { authService } from '@api/services/auth';
import { useSessionStore } from '@state/sessionStore';

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const setSession = useSessionStore((state) => state.setSession);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginRequest>({
    resolver: zodResolver(LoginRequestSchema),
  });

  const onSubmit = async (data: LoginRequest) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await authService.login(data);
      
      // PENDENTE: In a real scenario, we would decode the user info from the token 
      // or get it from the response. For now, using a placeholder user.
      setSession(response.token, {
        id: 'placeholder-id',
        name: 'Usuário Logado',
        roles: ['admin'],
      });
      
    } catch (err: unknown) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      setError((err as any).uiMessage || 'Falha ao realizar login');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    isLoading,
    error,
  };
};
