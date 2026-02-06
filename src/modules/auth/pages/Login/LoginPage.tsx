import React from 'react';
import { Button, Input, Text } from '@shared/ui';
import { useLogin } from '../../hooks/useLogin';
import styles from './Login.module.css';

export const LoginPage: React.FC = () => {
  const { register, handleSubmit, errors, isLoading, error } = useLogin();

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.header}>
          <Text as="h1" size="2xl" weight="bold" color="primary">
            DOLIGO
          </Text>
          <Text as="p" size="sm" color="neutral">
            Entre com suas credenciais para acessar o sistema
          </Text>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <Input
            label="E-mail"
            type="email"
            placeholder="seu@email.com"
            error={errors.email?.message}
            {...register('email')}
          />

          <Input
            label="Senha"
            type="password"
            placeholder="••••••••"
            error={errors.password?.message}
            {...register('password')}
          />

          {error && (
            <div className={styles.errorMessage}>
              <Text size="xs" color="error">
                {error}
              </Text>
            </div>
          )}

          <Button type="submit" isLoading={isLoading} className={styles.submitButton}>
            Acessar Sistema
          </Button>
        </form>
      </div>
    </div>
  );
};
