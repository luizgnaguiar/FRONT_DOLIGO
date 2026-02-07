import { describe, it, expect, vi } from 'vitest';
import { render, screen, userEvent } from '@test/utils';
import { LoginPage } from './LoginPage';
import * as useLoginHook from '../../hooks/useLogin';

// Mock the hook
vi.mock('../../hooks/useLogin');

describe('LoginPage', () => {
  it('renders login form correctly', () => {
    // Mock return value
    vi.spyOn(useLoginHook, 'useLogin').mockReturnValue({
      register: vi.fn(),
      handleSubmit: vi.fn(),
      errors: {},
      isLoading: false,
      error: null,
    });

    render(<LoginPage />);

    expect(screen.getByRole('heading', { name: /doligo/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/e-mail/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/senha/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /acessar sistema/i })).toBeInTheDocument();
  });

  it('shows error message when error is present', () => {
    vi.spyOn(useLoginHook, 'useLogin').mockReturnValue({
      register: vi.fn(),
      handleSubmit: vi.fn(),
      errors: {},
      isLoading: false,
      error: 'Credenciais inválidas',
    });

    render(<LoginPage />);
    expect(screen.getByText('Credenciais inválidas')).toBeInTheDocument();
  });

  it('shows loading state on button', () => {
    vi.spyOn(useLoginHook, 'useLogin').mockReturnValue({
      register: vi.fn(),
      handleSubmit: vi.fn(),
      errors: {},
      isLoading: true, // Loading is true
      error: null,
    });

    render(<LoginPage />);
    // When loading, the button text is replaced by spinner, so we find by role only (assuming it's the only button or queryAll)
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });
});
