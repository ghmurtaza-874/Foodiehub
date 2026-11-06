import { Link, useParams } from 'react-router-dom';
import {
  Banknote,
  CheckCircle2,
  CreditCard,
  MapPin,
  Package,
  Printer,
  ShoppingBag,
  Truck,
  User,
  Wallet,
} from 'lucide-react';
import { useOrders } from '../context/OrdersContext';
import { EmptyState } from '../components/common/EmptyState';
import { Button } from '../components/common/Button';
import { formatPKR } from '../utils/formatCurrency';
import type { PaymentMethod } from '../types';

const paymentLabel: Record<PaymentMethod, { label: string; icon: React.ReactNode }> = {
  cod: { label: 'Cash on Delivery', icon: <Banknote size={16} /> },
  card: { label: 'Card Payment (Demo)', icon: <CreditCard size={16} /> },
  wallet: { label: 'Wallet Payment (Demo)', icon: <Wallet size={16} /> },
};

export const OrderSuccessPage = () => {
  const { id } = useParams<{ id: string }>();
  const { getOrder } = useOrders();
  const order = id ? getOrder(id) : undefined;

  if (!order) {
    return (
      <div className="fh-container fh-section">
        <EmptyState
          icon={<Package size={40} />}
          title="Order not found"
          description="We couldn't find that order. It may have been cleared from your demo history."
          actionLabel="Continue Shopping"
          actionTo="/menu"
        />
      </div>
    );
  }

  const handlePrint = () => window.print();

  return (
    <div className="fh-container fh-section" style={{ maxWidth: 820 }}>
      <div className="fh-order-success">
        <div className="fh-order-success-icon" aria-hidden="true">
          <CheckCircle2 size={48} />
        </div>
        <h1 className="fh-section-title" style={{ marginBottom: '0.25rem' }}>
          Order Confirmed!
        </h1>
        <p className="fh-text-muted">
          Thank you, {order.customer.fullName.split(' ')[0]}! Your delicious order is being prepared.
        </p>
        <div className="fh-order-id">Order ID: {order.id}</div>
      </div>

      <div className="fh-demo-note" style={{ justifyContent: 'center' }}>
        <Package size={15} /> This is a frontend demo. No real order has been sent to a restaurant and no payment was processed.
      </div>

      <div className="row g-4 mt-2">
        <div className="col-md-6">
          <div className="fh-card">
            <h3 className="fh-feature-title" style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <User size={18} /> Customer Details
            </h3>
            <div className="fh-order-row"><span>Name</span><b>{order.customer.fullName}</b></div>
            <div className="fh-order-row"><span>Email</span><b>{order.customer.email}</b></div>
            <div className="fh-order-row"><span>Phone</span><b>{order.customer.phone}</b></div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="fh-card">
            <h3 className="fh-feature-title" style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <MapPin size={18} /> Delivery Information
            </h3>
            <div className="fh-order-row"><span>Address</span><b style={{ textAlign: 'right', maxWidth: '70%' }}>{order.address.address}</b></div>
            <div className="fh-order-row"><span>Area</span><b>{order.address.area}</b></div>
            <div className="fh-order-row"><span>City</span><b>{order.address.city}{order.address.postalCode && ` — ${order.address.postalCode}`}</b></div>
            <div className="fh-order-row"><span>Option</span><b style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
              <Truck size={14} /> {order.deliveryOption === 'express' ? 'Express' : 'Standard'} · Est. {order.estimatedDelivery}
            </b></div>
            {order.address.deliveryInstructions && (
              <div className="fh-order-row"><span>Notes</span><b style={{ textAlign: 'right', maxWidth: '70%' }}>{order.address.deliveryInstructions}</b></div>
            )}
          </div>
        </div>
      </div>

      <div className="fh-card mt-4">
        <h3 className="fh-feature-title" style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <ShoppingBag size={18} /> Items Ordered
        </h3>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {order.items.map(({ product, quantity }) => (
            <li
              key={product.id}
              style={{
                display: 'grid',
                gridTemplateColumns: '56px 1fr auto',
                gap: '0.75rem',
                alignItems: 'center',
                padding: '0.6rem 0',
                borderBottom: '1px dashed var(--fh-border)',
              }}
            >
              <img
                src={product.image}
                alt={product.name}
                style={{ width: 56, height: 56, objectFit: 'cover', borderRadius: 10 }}
                loading="lazy"
              />
              <div>
                <div style={{ fontWeight: 600 }}>{product.name}</div>
                <div className="fh-text-muted" style={{ fontSize: '0.82rem' }}>
                  {formatPKR(product.price)} × {quantity}
                </div>
              </div>
              <b>{formatPKR(product.price * quantity)}</b>
            </li>
          ))}
        </ul>

        <div style={{ marginTop: '1rem' }}>
          <div className="fh-order-row"><span>Subtotal</span><b>{formatPKR(order.subtotal)}</b></div>
          <div className="fh-order-row"><span>Delivery fee</span><b>{order.deliveryFee === 0 ? 'FREE' : formatPKR(order.deliveryFee)}</b></div>
          {order.discount > 0 && (
            <div className="fh-order-row" style={{ color: 'var(--fh-success)' }}>
              <span>Discount {order.couponCode && `(${order.couponCode})`}</span>
              <b>-{formatPKR(order.discount)}</b>
            </div>
          )}
          <div className="fh-order-row" style={{ fontSize: '1.1rem' }}>
            <span style={{ fontWeight: 700 }}>Grand Total</span>
            <b style={{ color: 'var(--fh-primary-dark)', fontFamily: 'var(--fh-font-heading)' }}>{formatPKR(order.total)}</b>
          </div>
          <div className="fh-order-row">
            <span>Payment</span>
            <b style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
              {paymentLabel[order.paymentMethod].icon}
              {paymentLabel[order.paymentMethod].label}
            </b>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', marginTop: '2rem', flexWrap: 'wrap' }}>
        <Link to="/menu">
          <Button variant="primary" size="lg">
            <ShoppingBag size={18} /> Continue Shopping
          </Button>
        </Link>
        <Button variant="outline" size="lg" onClick={handlePrint}>
          <Printer size={18} /> Print Order Summary
        </Button>
        <Link to="/orders">
          <Button variant="ghost" size="lg">
            View Order History
          </Button>
        </Link>
      </div>
    </div>
  );
};
