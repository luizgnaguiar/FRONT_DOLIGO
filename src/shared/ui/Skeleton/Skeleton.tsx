import React from 'react';
import styles from './Skeleton.module.css';

interface SkeletonProps {
  variant?: 'text' | 'rect' | 'circle';
  width?: string | number;
  height?: string | number;
  className?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  variant = 'rect',
  width,
  height,
  className = '',
}) => {
  const skeletonClasses = [
    styles.skeleton,
    styles[variant],
    className,
  ].join(' ');

  const style: React.CSSProperties = {
    width: width,
    height: height,
  };

  return <div className={skeletonClasses} style={style} />;
};
