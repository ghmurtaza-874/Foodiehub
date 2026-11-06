import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useOrders } from '../context/OrdersContext';
import { useToast } from '../context/ToastContext';
import type { CheckoutFormValues, Order } from '../types';
import { CheckoutForm } from '../components/checkout/CheckoutForm';
import { OrderSummary } from '../components/checkout/OrderSummary';
import { EmptyState } from '../components/common/EmptyState';
import { generateOrderId } from '../utils/storage';
import { normalizePhone } from '../utils/validation';

export const CheckoutPage = () => {
  const { items, subtotal, deliveryFee, discount, total, appliedCoupon, clearCart } = useCart();
  const { addOrder } = useOrders();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);

  if (items.length === 0) {
    return (
      <>
        <div className="fh-page-header">
          <div className="fh-container">
            <nav className="fh-breadcrumb" aria-label="Breadcrumb">
              <Link to="/">Home</Link> / Checkout
            </nav>
            <h1 className="fh-page-title">Checkout</h1>
          </div>
        </div>
        <div className="fh-container fh-section">
          <EmptyState
            icon={<ShoppingCart size={40} />}
            title="Your cart is empty"
            description="You can't check out without any items. Add some delicious dishes first!"
            actionLabel="Browse Menu"
            actionTo="/menu"
          />
        </div>
      </>
    );
  }

  const handleSubmit = (values: CheckoutFormValues) => {
    setSubmitting(true);
    // Simulate a brief async demo "order placement".
    window.setTimeout(() => {
      const estimatedMinutes =
        values.deliveryOption === 'express' ? '15-25 minutes' : '30-45 minutes';
      const order: Order = {
        id: generateOrderId(),
        createdAt: Date.now(),
        items,
        customer: {
          fullName: values.fullName.trim(),
          email: values.email.trim(),
          phone: normalizePhone(values.phone) ?? values.phone,
        },
        address: {
          address: values.address.trim(),
          city: values.city.trim(),
          area: values.area.trim(),
          postalCode: values.postalCode.trim(),
          deliveryInstructions: values.deliveryInstructions.trim() || undefined,
        },
        deliveryOption: values.deliveryOption,
        paymentMethod: values.paymentMethod,
        subtotal,
        deliveryFee,
        discount,
        couponCode: appliedCoupon?.code,
        total,
        estimatedDelivery: estimatedMinutes,
      };
      addOrder(order);
      clearCart();
      setSubmitting(false);
      showToast('success', 'Order placed successfully!');
      navigate(`/order/${order.id}`);
    }, 700);
  };

  return (
    <>
      <div className="fh-page-header">
        <div className="fh-container">
          <nav className="fh-breadcrumb" aria-label="Breadcrumb">
            <Link to="/">Home</Link> / <Link to="/cart">Cart</Link> / Checkout
          </nav>
          <h1 className="fh-page-title">Checkout</h1>
        </div>
      </div>
      <div className="fh-container fh-section">
        <div className="row g-4">
          <div className="col-lg-7">
            <CheckoutForm onSubmit={handleSubmit} submitting={submitting} />
          </div>
          <div className="col-lg-5">
            <div style={{ position: 'sticky', top: 'calc(var(--fh-header-height) + 1rem)' }}>
              <OrderSummary />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
