import { Link } from 'react-router-dom';
import { Home, UtensilsCrossed } from 'lucide-react';
import { Button } from '../components/common/Button';

export const NotFoundPage = () => (
  <div className="fh-container fh-section fh-text-center" style={{ paddingTop: '6rem', paddingBottom: '6rem' }}>
    <div style={{ fontSize: '6rem', fontFamily: 'var(--fh-font-heading)', fontWeight: 800, color: 'var(--fh-primary)', lineHeight: 1 }}>
      404
    </div>
    <h1 className="fh-section-title" style={{ marginTop: '0.5rem' }}>Page Not Found</h1>
    <p className="fh-text-muted" style={{ maxWidth: 480, margin: '0.5rem auto 2rem' }}>
      Oops! The page you're looking for doesn't exist or has been moved. Let's get you back to something delicious.
    </p>
    <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
      <Link to="/">
        <Button variant="primary" size="lg">
          <Home size={18} /> Back to Home
        </Button>
      </Link>
      <Link to="/menu">
        <Button variant="outline" size="lg">
          <UtensilsCrossed size={18} /> Browse Menu
        </Button>
      </Link>
    </div>
  </div>
);
