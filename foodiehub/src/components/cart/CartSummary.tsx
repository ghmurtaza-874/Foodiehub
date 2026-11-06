import { useState } from 'react';
import { Link } from 'react-router-dom';
import { BadgePercent, ShoppingCart, Trash2, Tag } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { formatPKR } from '../../utils/formatCurrency';
import { coupons } from '../../data/coupons';
import { Button } from '../common/Button';

interface CartSummaryProps {
  showCheckoutButton?: boolean;
  showClearCart?: boolean;
}

export const CartSummary = ({ showCheckoutButton = true, showClearCart = true }: CartSummaryProps) => {
  const {
    subtotal,
    deliveryFee,
    discount,
    total,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    clearCart,
    items,
    deliveryOption,
    setDeliveryOption,
  } = useCart();
  const [code, setCode] = useState('');

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    if (applyCoupon(code)) {
      setCode('');
    }
  };

  return (
    <div className="fh-summary">
      <h2 className="fh-summary-title">Order Summary</h2>

      {showClearCart && items.length > 0 && (
        <button
          type="button"
          className="fh-btn fh-btn-ghost fh-btn-sm"
          onClick={() => clearCart()}
          style={{ marginBottom: '1rem' }}
        >
          <Trash2 size={15} /> Clear Cart
        </button>
      )}

      {/* Delivery option selector (affects fee) */}
      <div className="fh-filter-label" style={{ marginBottom: '0.5rem' }}>Delivery Option</div>
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
        {(['standard', 'express'] as const).map((opt) => (
          <button
            key={opt}
            type="button"
            className={`fh-radio-card ${deliveryOption === opt ? 'is-selected' : ''}`}
            style={{ flex: 1, marginBottom: 0, padding: '0.7rem' }}
            onClick={() => setDeliveryOption(opt)}
            aria-pressed={deliveryOption === opt}
          >
            <div className="fh-radio-card-content">
              <div className="fh-radio-card-title" style={{ fontSize: '0.88rem' }}>
                {opt === 'standard' ? 'Standard' : 'Express'}
              </div>
              <div className="fh-radio-card-desc" style={{ fontSize: '0.75rem' }}>
                {opt === 'standard' ? '30-45 min' : '15-25 min'}
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Coupon */}
      {!appliedCoupon ? (
        <form className="fh-coupon-box" onSubmit={handleApply}>
          <input
            type="text"
            className="fh-input fh-coupon-input"
            placeholder="Coupon code (e.g. WELCOME10)"
            value={code}
            onChange={(e) => setCode(e.target.value.toUpperCase())}
            aria-label="Coupon code"
          />
          <Button type="submit" variant="primary" size="sm">
            <Tag size={15} /> Apply
          </Button>
        </form>
      ) : (
        <div className="fh-coupon-chip">
          <BadgePercent size={15} />
          <strong>{appliedCoupon.code}</strong> applied — you saved {formatPKR(appliedCoupon.discount)}
          <button
            type="button"
            onClick={removeCoupon}
            aria-label="Remove coupon"
            style={{ background: 'transparent', border: 'none', color: 'inherit', marginLeft: 6, cursor: 'pointer', padding: 0 }}
          >
            ×
          </button>
        </div>
      )}

      <div style={{ marginTop: '0.75rem' }}>
        <details>
          <summary style={{ cursor: 'pointer', fontSize: '0.8rem', color: 'var(--fh-text-muted)' }}>
            Available demo coupons
          </summary>
          <ul style={{ fontSize: '0.78rem', color: 'var(--fh-text-muted)', marginTop: '0.5rem', paddingLeft: '1.2rem' }}>
            {coupons.map((c) => (
              <li key={c.code}>
                <strong>{c.code}</strong> — {c.description}
                {c.minSubtotal ? ` (min PKR ${c.minSubtotal.toLocaleString()})` : ''}
              </li>
            ))}
          </ul>
        </details>
      </div>

      <div style={{ marginTop: '1rem' }}>
        <div className="fh-summary-row">
          <span>Subtotal</span>
          <span>{formatPKR(subtotal)}</span>
        </div>
        <div className="fh-summary-row">
          <span>Delivery fee</span>
          <span>{deliveryFee === 0 ? 'FREE' : formatPKR(deliveryFee)}</span>
        </div>
        {discount > 0 && (
          <div className="fh-summary-row" style={{ color: 'var(--fh-success)' }}>
            <span>Discount</span>
            <span>-{formatPKR(discount)}</span>
          </div>
        )}
        <div className="fh-summary-row divider">
          <span style={{ fontWeight: 700 }}>Total</span>
          <span className="fh-summary-total">{formatPKR(total)}</span>
        </div>
      </div>

      {showCheckoutButton && (
        <Link to="/checkout" style={{ marginTop: '1rem', display: 'block' }}>
          <Button variant="primary" block>
            <ShoppingCart size={16} /> Proceed to Checkout
          </Button>
        </Link>
      )}
      <Link to="/menu" style={{ marginTop: '0.5rem', display: 'block' }}>
        <Button variant="ghost" block>
          Continue Shopping
        </Button>
      </Link>
    </div>
  );
};
