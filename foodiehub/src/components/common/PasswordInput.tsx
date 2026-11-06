import { forwardRef, useId, useState, type InputHTMLAttributes, type ReactNode } from 'react';
import { Eye, EyeOff, AlertCircle } from 'lucide-react';

interface PasswordInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string | null;
  required?: boolean;
  icon?: ReactNode;
  hint?: string;
}

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ label, error, required, icon, hint, id, className = '', ...rest }, ref) => {
    const [show, setShow] = useState(false);
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
        <div className="fh-input-icon">
          {icon}
          <input
            ref={ref}
            id={inputId}
            type={show ? 'text' : 'password'}
            className={`fh-input ${error ? 'is-invalid' : ''} ${className}`}
            style={{ paddingRight: '2.5rem' }}
            aria-invalid={error ? true : undefined}
            aria-describedby={describedBy}
            {...rest}
          />
          <button
            type="button"
            className="fh-password-toggle"
            onClick={() => setShow((v) => !v)}
            aria-label={show ? 'Hide password' : 'Show password'}
          >
            {show ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
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
PasswordInput.displayName = 'PasswordInput';
