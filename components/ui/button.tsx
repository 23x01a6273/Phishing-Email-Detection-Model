'use client';

import type { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline';
  className?: string;
}

const variantStyles: Record<NonNullable<ButtonProps['variant']>, string> = {
  default: 'inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition hover:bg-primary/90 disabled:pointer-events-none disabled:opacity-50',
  outline: 'inline-flex items-center justify-center rounded-md border border-border bg-transparent px-4 py-2 text-sm font-medium transition hover:bg-muted disabled:pointer-events-none disabled:opacity-50',
};

export function Button({ className = '', variant = 'default', ...props }: ButtonProps) {
  return (
    <button className={`${variantStyles[variant]} ${className ?? ''}`.trim()} {...props} />
  );
}
