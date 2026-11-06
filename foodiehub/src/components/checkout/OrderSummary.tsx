import { useCart } from '../../context/CartContext';
import { formatPKR } from '../../utils/formatCurrency';

export const OrderSummary = () => {
  const { items, subtotal, deliveryFee, discount, total, appliedCoupon, deliveryOption } = useCart();

  return (
    <div className="fh-summary">
      <h2 className="fh-summary-title">Order Summary</h2>
      {items.length === 0 ? (
        <p className="fh-text-muted" style={{ fontSize: '0.9rem' }}>
          Your cart is empty.
        </p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 1rem' }}>
          {items.map(({ product, quantity }) => (
            <li
              key={product.id}
              style={{
                display: 'grid',
                gridTemplateColumns: '48px 1fr auto',
                gap: '0.75rem',
                alignItems: 'center',
                padding: '0.5rem 0',
                fontSize: '0.88rem',
              }}
            >
              <img
                src={product.image}
                alt={product.name}
                style={{ width: 48, height: 48, objectFit: 'cover', borderRadius: 8 }}
                loading="lazy"
              />
              <div>
                <div style={{ fontWeight: 600 }}>{product.name}</div>
                <div className="fh-text-muted" style={{ fontSize: '0.78rem' }}>
                  {formatPKR(product.price)} × {quantity}
                </div>
              </div>
              <div style={{ fontWeight: 700 }}>{formatPKR(product.price * quantity)}</div>
            </li>
          ))}
        </ul>
      )}

      <div className="fh-summary-row">
        <span>Subtotal</span>
        <span>{formatPKR(subtotal)}</span>
      </div>
      <div className="fh-summary-row">
        <span>Delivery ({deliveryOption === 'express' ? 'Express' : 'Standard'})</span>
        <span>{deliveryFee === 0 ? 'FREE' : formatPKR(deliveryFee)}</span>
      </div>
      {discount > 0 && (
        <div className="fh-summary-row" style={{ color: 'var(--fh-success)' }}>
          <span>Discount {appliedCoupon && `(${appliedCoupon.code})`}</span>
          <span>-{formatPKR(discount)}</span>
        </div>
      )}
      <div className="fh-summary-row divider">
        <span style={{ fontWeight: 700 }}>Grand Total</span>
        <span className="fh-summary-total">{formatPKR(total)}</span>
      </div>
    </div>
  );
};
