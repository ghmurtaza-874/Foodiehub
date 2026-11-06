import { useEffect, type ReactNode } from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  footer?: ReactNode;
  size?: 'sm' | 'md' | 'lg';
}

export const Modal = ({ open, onClose, title, children, footer, size = 'md' }: ModalProps) => {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  if (!open) return null;

  const maxWidth = size === 'sm' ? 420 : size === 'lg' ? 720 : 540;

  return (
    <div
      className="fh-modal-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={title ?? 'Dialog'}
    >
      <div
        className="fh-modal"
        style={{ maxWidth }}
        onClick={(e) => e.stopPropagation()}
      >
        {title && (
          <div className="fh-modal-header">
            <h3 className="fh-modal-title">{title}</h3>
            <button
              type="button"
              className="fh-modal-close"
              onClick={onClose}
              aria-label="Close dialog"
            >
              <X size={20} />
            </button>
          </div>
        )}
        <div className="fh-modal-body">{children}</div>
        {footer && <div className="fh-modal-footer">{footer}</div>}
      </div>
    </div>
  );
};
