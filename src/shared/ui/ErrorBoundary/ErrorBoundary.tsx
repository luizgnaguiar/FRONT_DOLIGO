import { Component, type ErrorInfo, type ReactNode } from 'react';
import { Text } from '../Text';
import { Button } from '../Button';
import styles from './ErrorBoundary.module.css';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
}

export class GlobalErrorBoundary extends Component<Props, State> {
  public override state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(_: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  public override componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public override render() {
    if (this.state.hasError) {
      return (
        <div className={styles.container}>
          <div className={styles.card}>
            <div className={styles.icon}>⚠️</div>
            <Text size="xl" weight="bold" className={styles.title}>
              Desculpe, algo deu muito errado.
            </Text>
            <Text color="neutral" className={styles.message}>
              A aplicação encontrou um erro inesperado e não pôde continuar.
            </Text>
            <Button
              onClick={() => window.location.assign('/')}
              className={styles.button}
            >
              Recarregar Aplicação
            </Button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
