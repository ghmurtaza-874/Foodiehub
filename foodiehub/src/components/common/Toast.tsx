import { CheckCircle2, Info, X, XCircle } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

const iconFor = (type: 'success' | 'error' | 'info') => {
  if (type === 'success') return <CheckCircle2 size={18} aria-hidden="true" />;
  if (type === 'error') return <XCircle size={18} aria-hidden="true" />;
  return <Info size={18} aria-hidden="true" />;
};

export const ToastContainer = () => {
  const { toasts, dismissToast } = useToast();
  if (toasts.length === 0) return null;
  return (
    <div className="fh-toast-container" role="region" aria-label="Notifications" aria-live="polite">
      {toasts.map((t) => (
        <div key={t.id} className={`fh-toast ${t.type}`} role="status">
          <span className="fh-toast-icon">{iconFor(t.type)}</span>
          <span>{t.text}</span>
          <button
            type="button"
            className="fh-toast-close"
            onClick={() => dismissToast(t.id)}
            aria-label="Dismiss notification"
          >
            <X size={16} />
          </button>
        </div>
      ))}
    </div>
  );
};
