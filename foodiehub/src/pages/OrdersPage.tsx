import { Link } from 'react-router-dom';
import { Package } from 'lucide-react';
import { useOrders } from '../context/OrdersContext';
import { EmptyState } from '../components/common/EmptyState';
import { formatPKR } from '../utils/formatCurrency';

export const OrdersPage = () => {
  const { orders } = useOrders();

  if (orders.length === 0) {
    return (
      <>
        <div className="fh-page-header">
          <div className="fh-container">
            <nav className="fh-breadcrumb" aria-label="Breadcrumb">
              <Link to="/">Home</Link> / Orders
            </nav>
            <h1 className="fh-page-title">Order History</h1>
          </div>
        </div>
        <div className="fh-container fh-section">
          <EmptyState
            icon={<Package size={40} />}
            title="No orders yet"
            description="When you place an order, it will appear here so you can track and reorder easily."
            actionLabel="Start Ordering"
            actionTo="/menu"
          />
        </div>
      </>
    );
  }

  return (
    <>
      <div className="fh-page-header">
        <div className="fh-container">
          <nav className="fh-breadcrumb" aria-label="Breadcrumb">
            <Link to="/">Home</Link> / Orders
          </nav>
          <h1 className="fh-page-title">Order History</h1>
          <p className="fh-text-muted">{orders.length} order{orders.length === 1 ? '' : 's'} placed</p>
        </div>
      </div>

      <div className="fh-container fh-section">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {orders.map((o) => (
            <article key={o.id} className="fh-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
                <div>
                  <div style={{ fontFamily: 'monospace', fontWeight: 700, color: 'var(--fh-primary-dark)' }}>
                    {o.id}
                  </div>
                  <div className="fh-text-muted" style={{ fontSize: '0.85rem' }}>
                    {new Date(o.createdAt).toLocaleString()}
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div className="fh-summary-total" style={{ fontSize: '1.2rem' }}>{formatPKR(o.total)}</div>
                  <span className="fh-pill fh-pill-accent" style={{ fontSize: '0.72rem' }}>
                    {o.paymentMethod === 'cod' ? 'Cash on Delivery' : o.paymentMethod === 'card' ? 'Card (Demo)' : 'Wallet (Demo)'}
                  </span>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
                {o.items.slice(0, 6).map(({ product }) => (
                  <img
                    key={product.id}
                    src={product.image}
                    alt={product.name}
                    style={{ width: 56, height: 56, borderRadius: 10, objectFit: 'cover' }}
                    loading="lazy"
                  />
                ))}
                {o.items.length > 6 && (
                  <div style={{ width: 56, height: 56, borderRadius: 10, background: 'var(--fh-gray)', display: 'grid', placeItems: 'center', fontSize: '0.8rem', fontWeight: 700 }}>
                    +{o.items.length - 6}
                  </div>
                )}
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
                <div className="fh-text-muted" style={{ fontSize: '0.85rem' }}>
                  {o.items.reduce((s, i) => s + i.quantity, 0)} items · Est. delivery {o.estimatedDelivery}
                </div>
                <Link to={`/order/${o.id}`} className="fh-btn fh-btn-outline fh-btn-sm">
                  View Details
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </>
  );
};
