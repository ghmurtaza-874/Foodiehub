import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Button } from './Button';

interface EmptyStateProps {
  icon: ReactNode;
  title: string;
  description: string;
  actionLabel?: string;
  actionTo?: string;
  onAction?: () => void;
}

export const EmptyState = ({
  icon,
  title,
  description,
  actionLabel,
  actionTo,
  onAction,
}: EmptyStateProps) => (
  <div className="fh-empty">
    <div className="fh-empty-icon" aria-hidden="true">
      {icon}
    </div>
    <h2 className="fh-empty-title">{title}</h2>
    <p className="fh-empty-desc">{description}</p>
    {actionLabel && actionTo && (
      <Link to={actionTo}>
        <Button variant="primary">{actionLabel}</Button>
      </Link>
    )}
    {actionLabel && onAction && !actionTo && (
      <Button variant="primary" onClick={onAction}>
        {actionLabel}
      </Button>
    )}
  </div>
);
