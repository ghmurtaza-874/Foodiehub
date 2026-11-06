import { forwardRef, useId, type InputHTMLAttributes, type ReactNode, type TextareaHTMLAttributes } from 'react';
import { AlertCircle } from 'lucide-react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string | null;
  hint?: string;
  required?: boolean;
  icon?: ReactNode;
  showPasswordToggle?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      hint,
      required,
      icon,
      id,
      className = '',
      children,
      ...rest
    },
    ref,
  ) => {
    const generatedId = useId();
    const inputId = id ?? generatedId;
    const errorId = `${inputId}-error`;
    const hintId = `${inputId}-hint`;
    const describedBy = [error ? errorId : null, hint ? hintId : null]
      .filter(Boolean)
      .join(' ') || undefined;

    return (
      <div className="fh-field">
        {label && (
          <label className="fh-label" htmlFor={inputId}>
            {label}
            {required && <span className="fh-req" aria-hidden="true">*</span>}
          </label>
        )}
        <div className={icon ? 'fh-input-icon' : undefined}>
          {icon}
          <input
            ref={ref}
            id={inputId}
            className={`fh-input ${error ? 'is-invalid' : ''} ${className}`}
            aria-invalid={error ? true : undefined}
            aria-describedby={describedBy}
            {...rest}
          />
          {children}
        </div>
        {hint && !error && (
          <p id={hintId} className="fh-text-muted" style={{ fontSize: '0.8rem', marginTop: '0.3rem' }}>
            {hint}
          </p>
        )}
        {error && (
          <p id={errorId} className="fh-error-msg" role="alert">
            <AlertCircle size={14} aria-hidden="true" />
            {error}
          </p>
        )}
      </div>
    );
  },
);
Input.displayName = 'Input';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string | null;
  required?: boolean;
  hint?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, required, hint, id, className = '', ...rest }, ref) => {
    const generatedId = useId();
    const inputId = id ?? generatedId;
    const errorId = `${inputId}-error`;
    const hintId = `${inputId}-hint`;
    const describedBy = [error ? errorId : null, hint ? hintId : null]
      .filter(Boolean)
      .join(' ') || undefined;
    return (
      <div className="fh-field">
        {label && (
          <label className="fh-label" htmlFor={inputId}>
            {label}
            {required && <span className="fh-req" aria-hidden="true">*</span>}
          </label>
        )}
        <textarea
          ref={ref}
          id={inputId}
          className={`fh-textarea ${error ? 'is-invalid' : ''} ${className}`}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          {...rest}
        />
        {hint && !error && (
          <p id={hintId} className="fh-text-muted" style={{ fontSize: '0.8rem', marginTop: '0.3rem' }}>
            {hint}
          </p>
        )}
        {error && (
          <p id={errorId} className="fh-error-msg" role="alert">
            <AlertCircle size={14} aria-hidden="true" />
            {error}
          </p>
        )}
      </div>
    );
  },
);
Textarea.displayName = 'Textarea';

interface SelectProps extends InputHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string | null;
  required?: boolean;
  children: ReactNode;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, required, id, className = '', children, ...rest }, ref) => {
    const generatedId = useId();
    const inputId = id ?? generatedId;
    const errorId = `${inputId}-error`;
    return (
      <div className="fh-field">
        {label && (
          <label className="fh-label" htmlFor={inputId}>
            {label}
            {required && <span className="fh-req" aria-hidden="true">*</span>}
          </label>
        )}
        <select
          ref={ref}
          id={inputId}
          className={`fh-select ${error ? 'is-invalid' : ''} ${className}`}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          {...rest}
        >
          {children}
        </select>
        {error && (
          <p id={errorId} className="fh-error-msg" role="alert">
            <AlertCircle size={14} aria-hidden="true" />
            {error}
          </p>
        )}
      </div>
    );
  },
);
Select.displayName = 'Select';
