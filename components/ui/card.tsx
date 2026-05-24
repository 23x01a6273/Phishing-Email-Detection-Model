'use client';

import type { HTMLAttributes } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export function Card({ className = '', ...props }: CardProps) {
  return <div className={`rounded-3xl border border-border bg-card shadow-sm ${className}`.trim()} {...props} />;
}

export function CardHeader({ className = '', ...props }: CardProps) {
  return <div className={`space-y-2 p-6 ${className}`.trim()} {...props} />;
}

export function CardTitle({ className = '', ...props }: CardProps) {
  return <h2 className={`text-lg font-semibold text-foreground ${className}`.trim()} {...props} />;
}

export function CardDescription({ className = '', ...props }: CardProps) {
  return <p className={`text-sm text-muted-foreground ${className}`.trim()} {...props} />;
}

export function CardContent({ className = '', ...props }: CardProps) {
  return <div className={`p-6 ${className}`.trim()} {...props} />;
}
