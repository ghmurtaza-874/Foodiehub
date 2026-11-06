import type {
  CartItem,
  Coupon,
  AppliedCoupon,
  DeliveryOption,
} from '../types';
import { findCoupon } from '../data/coupons';

export const STANDARD_DELIVERY_FEE = 150;
export const EXPRESS_DELIVERY_FEE = 350;
export const FREE_DELIVERY_THRESHOLD = 3000;

/** Subtotal = sum(price * qty). Only available items contribute. */
export const calculateSubtotal = (items: CartItem[]): number =>
  items.reduce((sum, item) => {
    if (!item.product.available) return sum;
    return sum + item.product.price * item.quantity;
  }, 0);

export const totalItems = (items: CartItem[]): number =>
  items.reduce((sum, item) => sum + item.quantity, 0);

export const deliveryFeeFor = (
  option: DeliveryOption,
  subtotal: number,
): number => {
  if (subtotal >= FREE_DELIVERY_THRESHOLD) return 0;
  return option === 'express' ? EXPRESS_DELIVERY_FEE : STANDARD_DELIVERY_FEE;
};

/**
 * Validate a coupon against the current cart.
 * Returns the applied coupon or an error message.
 */
export const validateCoupon = (
  code: string,
  subtotal: number,
  alreadyApplied?: string,
): { ok: true; applied: AppliedCoupon; coupon: Coupon } | { ok: false; error: string } => {
  const trimmed = code.trim().toUpperCase();
  if (!trimmed) return { ok: false, error: 'Please enter a coupon code.' };
  if (alreadyApplied && alreadyApplied.toUpperCase() === trimmed) {
    return { ok: false, error: 'This coupon has already been applied.' };
  }
  const coupon = findCoupon(trimmed);
  if (!coupon) return { ok: false, error: 'Invalid coupon code.' };
  if (coupon.minSubtotal && subtotal < coupon.minSubtotal) {
    return {
      ok: false,
      error: `This coupon requires a minimum subtotal of PKR ${coupon.minSubtotal.toLocaleString()}.`,
    };
  }

  let discount: number;
  if (coupon.type === 'percent') {
    discount = Math.round((subtotal * coupon.value) / 100);
  } else {
    discount = coupon.value;
  }

  // Discount must not exceed eligible subtotal.
  discount = Math.min(discount, subtotal);

  return {
    ok: true,
    applied: { code: coupon.code, discount },
    coupon,
  };
};

export interface PricingBreakdown {
  subtotal: number;
  deliveryFee: number;
  discount: number;
  total: number;
}

export const calculatePricing = (
  items: CartItem[],
  option: DeliveryOption,
  appliedCoupon: AppliedCoupon | null,
): PricingBreakdown => {
  const subtotal = calculateSubtotal(items);
  const deliveryFee = deliveryFeeFor(option, subtotal);
  const discount = appliedCoupon ? Math.min(appliedCoupon.discount, subtotal) : 0;
  const total = Math.max(0, subtotal + deliveryFee - discount);
  return { subtotal, deliveryFee, discount, total };
};

export const discountPercent = (price: number, original?: number): number | null => {
  if (!original || original <= price) return null;
  return Math.round(((original - price) / original) * 100);
};
