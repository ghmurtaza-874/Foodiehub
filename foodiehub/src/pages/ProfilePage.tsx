import { Link, useNavigate } from 'react-router-dom';
import {
  Award,
  Heart,
  LogOut,
  Mail,
  Phone,
  ShoppingBag,
  UtensilsCrossed,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useOrders } from '../context/OrdersContext';
import { useFavorites } from '../context/FavoritesContext';
import { useToast } from '../context/ToastContext';
import { Button } from '../components/common/Button';
import { EmptyState } from '../components/common/EmptyState';
import { formatPKR } from '../utils/formatCurrency';

export const ProfilePage = () => {
  const { user, logout } = useAuth();
  const { orders } = useOrders();
  const { count: favCount } = useFavorites();
  const { showToast } = useToast();
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="fh-container fh-section">
        <EmptyState
          icon={<ShoppingBag size={40} />}
          title="You're not signed in"
          description="Sign in to view your profile, order history and saved favourites."
          actionLabel="Sign In"
          actionTo="/login"
        />
      </div>
    );
  }

  const initials = user.fullName
    .split(' ')
    .map((p) => p[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  const totalSpent = orders.reduce((sum, o) => sum + o.total, 0);

  return (
    <>
      <div className="fh-container fh-section">
        <div className="fh-profile-header">
          <div className="fh-profile-avatar" aria-hidden="true">{initials}</div>
          <div style={{ flex: 1 }}>
            <h1 style={{ color: '#fff', marginBottom: '0.25rem' }}>{user.fullName}</h1>
            <div style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap', color: 'rgba(255,255,255,0.9)' }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                <Mail size={15} /> {user.email}
              </span>
              {user.phone && (
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                  <Phone size={15} /> {user.phone}
                </span>
              )}
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                <Award size={15} /> Member since {new Date(user.joinedAt).toLocaleDateString()}
              </span>
            </div>
          </div>
          <Button
            variant="outline"
            onClick={() => {
              logout();
              showToast('info', 'Signed out.');
              navigate('/');
            }}
            style={{ background: 'rgba(255,255,255,0.15)', color: '#fff', borderColor: 'rgba(255,255,255,0.4)' }}
          >
            <LogOut size={16} /> Logout
          </Button>
        </div>

        <div className="fh-grid-3 mt-3">
          <div className="fh-stat-card">
            <div className="fh-stat-card-value">{orders.length}</div>
            <div className="fh-stat-card-label">Total Orders</div>
          </div>
          <div className="fh-stat-card">
            <div className="fh-stat-card-value">{favCount}</div>
            <div className="fh-stat-card-label">Saved Favorites</div>
          </div>
          <div className="fh-stat-card">
            <div className="fh-stat-card-value">{formatPKR(totalSpent)}</div>
            <div className="fh-stat-card-label">Total Spent (Demo)</div>
          </div>
        </div>

        <div className="fh-card mt-3">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
            <h2 className="fh-feature-title" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', margin: 0 }}>
              <ShoppingBag size={18} /> Recent Orders
            </h2>
            <Link to="/orders" className="fh-btn fh-btn-outline fh-btn-sm">
              View All
            </Link>
          </div>
          {orders.length === 0 ? (
            <div className="fh-text-muted" style={{ textAlign: 'center', padding: '2rem 0' }}>
              <Heart size={32} style={{ marginBottom: '0.75rem', color: 'var(--fh-text-muted)' }} />
              <p>No orders yet. Time to treat yourself!</p>
              <Link to="/menu" className="fh-btn fh-btn-primary fh-btn-sm mt-2" style={{ display: 'inline-flex' }}>
                <UtensilsCrossed size={15} /> Browse Menu
              </Link>
            </div>
          ) : (
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {orders.slice(0, 5).map((o) => (
                <li
                  key={o.id}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '0.75rem 0',
                    borderBottom: '1px dashed var(--fh-border)',
                    flexWrap: 'wrap',
                    gap: '0.5rem',
                  }}
                >
                  <div>
                    <div style={{ fontWeight: 700, fontFamily: 'monospace' }}>{o.id}</div>
                    <div className="fh-text-muted" style={{ fontSize: '0.82rem' }}>
                      {new Date(o.createdAt).toLocaleString()} · {o.items.reduce((s, i) => s + i.quantity, 0)} items
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <b>{formatPKR(o.total)}</b>
                    <Link to={`/order/${o.id}`} className="fh-btn fh-btn-ghost fh-btn-sm">
                      Details
                    </Link>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="fh-demo-note mt-3">
          This is a frontend demo account. No real personal data is stored or transmitted. Clearing your browser storage will reset your profile and order history.
        </div>
      </div>
    </>
  );
};
