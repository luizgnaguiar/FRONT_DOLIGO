import React from 'react';
import styles from './Text.module.css';

interface TextProps {
  as?: 'p' | 'span' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'div';
  size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl';
  weight?: 'normal' | 'medium' | 'semibold' | 'bold';
  color?: 'primary' | 'neutral' | 'error' | 'success' | 'warning' | 'inherit';
  className?: string;
  children: React.ReactNode;
}

export const Text: React.FC<TextProps> = ({
  as: Component = 'span',
  size = 'base',
  weight = 'normal',
  color = 'neutral',
  className = '',
  children,
}) => {
  const textClasses = [
    styles.text,
    styles[`size-${size}`],
    styles[`weight-${weight}`],
    styles[`color-${color}`],
    className,
  ].join(' ');

  return <Component className={textClasses}>{children}</Component>;
};
