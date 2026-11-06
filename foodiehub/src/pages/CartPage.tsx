import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { CartItemRow } from '../components/cart/CartItem';
import { CartSummary } from '../components/cart/CartSummary';
import { EmptyState } from '../components/common/EmptyState';

export const CartPage = () => {
  const { items } = useCart();

  if (items.length === 0) {
    return (
      <>
        <div className="fh-page-header">
          <div className="fh-container">
            <nav className="fh-breadcrumb" aria-label="Breadcrumb">
              <Link to="/">Home</Link> / Cart
            </nav>
            <h1 className="fh-page-title">Your Cart</h1>
          </div>
        </div>
        <div className="fh-container fh-section">
          <EmptyState
            icon={<ShoppingCart size={40} />}
            title="Your cart is empty"
            description="Looks like you haven't added anything yet. Let's fix that — explore our menu and treat yourself!"
            actionLabel="Browse Menu"
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
            <Link to="/">Home</Link> / Cart
          </nav>
          <h1 className="fh-page-title">Your Cart</h1>
          <p className="fh-text-muted">{items.length} item{items.length === 1 ? '' : 's'} in your cart</p>
        </div>
      </div>
      <div className="fh-container fh-section">
        <div className="row g-4">
          <div className="col-lg-8">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {items.map((item) => (
                <CartItemRow key={item.product.id} item={item} />
              ))}
            </div>
          </div>
          <div className="col-lg-4">
            <div style={{ position: 'sticky', top: 'calc(var(--fh-header-height) + 1rem)' }}>
              <CartSummary showCheckoutButton showClearCart />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
