import React from 'react';
import styles from './Spinner.module.css';

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'white' | 'neutral';
  className?: string;
}

export const Spinner: React.FC<SpinnerProps> = ({
  size = 'md',
  color = 'primary',
  className = '',
}) => {
  const spinnerClasses = [
    styles.spinner,
    styles[size],
    styles[color],
    className,
  ].join(' ');

  return <div className={spinnerClasses} role="status" aria-label="loading" />;
};
