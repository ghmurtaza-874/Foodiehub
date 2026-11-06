import type { ButtonHTMLAttributes, ReactNode } from 'react';

type Variant = 'primary' | 'outline' | 'ghost' | 'danger';
type Size = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  block?: boolean;
  children: ReactNode;
}

const variantClass: Record<Variant, string> = {
  primary: 'fh-btn-primary',
  outline: 'fh-btn-outline',
  ghost: 'fh-btn-ghost',
  danger: 'fh-btn-danger',
};

const sizeClass: Record<Size, string> = {
  sm: 'fh-btn-sm',
  md: '',
  lg: 'fh-btn-lg',
};

export const Button = ({
  variant = 'primary',
  size = 'md',
  block = false,
  className = '',
  children,
  type = 'button',
  ...rest
}: ButtonProps) => {
  const classes = [
    'fh-btn',
    variantClass[variant],
    sizeClass[size],
    block ? 'fh-btn-block' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');
  return (
    <button type={type} className={classes} {...rest}>
      {children}
    </button>
  );
};
