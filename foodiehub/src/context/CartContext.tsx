import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  type ReactNode,
} from 'react';
import type { CartItem, Product, AppliedCoupon, DeliveryOption } from '../types';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useToast } from './ToastContext';
import {
  calculatePricing,
  calculateSubtotal,
  totalItems,
  validateCoupon,
} from '../utils/pricing';
import { STORAGE_KEYS } from '../utils/storage';

interface CartContextValue {
  items: CartItem[];
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  increaseQuantity: (productId: string) => void;
  decreaseQuantity: (productId: string) => void;
  clearCart: () => void;
  hasItem: (productId: string) => boolean;
  itemCount: number;
  subtotal: number;
  deliveryFee: number;
  discount: number;
  total: number;
  appliedCoupon: AppliedCoupon | null;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;
  deliveryOption: DeliveryOption;
  setDeliveryOption: (option: DeliveryOption) => void;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const { showToast } = useToast();
  const [items, setItems] = useLocalStorage<CartItem[]>(STORAGE_KEYS.cart, []);
  const [appliedCouponCode, setAppliedCouponCode] = useLocalStorage<
    AppliedCoupon | null
  >(STORAGE_KEYS.coupon, null);
  const [deliveryOption, setDeliveryOption] = useLocalStorage<DeliveryOption>(
    'foodiehub.deliveryOption',
    'standard',
  );

  const addItem = useCallback(
    (product: Product, quantity = 1) => {
      if (!product.available) {
        showToast('error', `${product.name} is currently unavailable.`);
        return;
      }
      setItems((prev) => {
        const existing = prev.find((i) => i.product.id === product.id);
        if (existing) {
          return prev.map((i) =>
            i.product.id === product.id
              ? { ...i, quantity: i.quantity + quantity }
              : i,
          );
        }
        return [...prev, { product, quantity }];
      });
      showToast('success', `${product.name} added to cart.`);
    },
    [setItems, showToast],
  );

  const removeItem = useCallback(
    (productId: string) => {
      setItems((prev) => prev.filter((i) => i.product.id !== productId));
    },
    [setItems],
  );

  const updateQuantity = useCallback(
    (productId: string, quantity: number) => {
      if (quantity < 1) return;
      setItems((prev) =>
        prev.map((i) =>
          i.product.id === productId ? { ...i, quantity } : i,
        ),
      );
    },
    [setItems],
  );

  const increaseQuantity = useCallback(
    (productId: string) => {
      setItems((prev) =>
        prev.map((i) =>
          i.product.id === productId
            ? { ...i, quantity: i.quantity + 1 }
            : i,
        ),
      );
    },
    [setItems],
  );

  const decreaseQuantity = useCallback(
    (productId: string) => {
      setItems((prev) =>
        prev
          .map((i) =>
            i.product.id === productId
              ? { ...i, quantity: Math.max(1, i.quantity - 1) }
              : i,
          )
          // Auto-remove if user explicitly tries to drop below 1 via separate remove action.
          // We keep min 1 here; removal is handled by removeItem.
      );
    },
    [setItems],
  );

  const clearCart = useCallback(() => {
    setItems([]);
    setAppliedCouponCode(null);
  }, [setItems, setAppliedCouponCode]);

  const hasItem = useCallback(
    (productId: string) => items.some((i) => i.product.id === productId),
    [items],
  );

  const subtotal = useMemo(() => calculateSubtotal(items), [items]);
  const count = useMemo(() => totalItems(items), [items]);

  // Re-validate the applied coupon whenever subtotal changes (e.g. if cart emptied).
  const effectiveCoupon = useMemo<AppliedCoupon | null>(() => {
    if (!appliedCouponCode) return null;
    const result = validateCoupon(appliedCouponCode.code, subtotal);
    if (!result.ok) return null;
    return result.applied;
  }, [appliedCouponCode, subtotal]);

  const pricing = useMemo(
    () => calculatePricing(items, deliveryOption, effectiveCoupon),
    [items, deliveryOption, effectiveCoupon],
  );

  const applyCoupon = useCallback(
    (code: string): boolean => {
      const result = validateCoupon(code, subtotal, effectiveCoupon?.code);
      if (!result.ok) {
        showToast('error', result.error);
        return false;
      }
      setAppliedCouponCode(result.applied);
      showToast(
        'success',
        `Coupon ${result.coupon.code} applied — you saved PKR ${result.applied.discount.toLocaleString()}!`,
      );
      return true;
    },
    [subtotal, effectiveCoupon, setAppliedCouponCode, showToast],
  );

  const removeCoupon = useCallback(() => {
    setAppliedCouponCode(null);
    showToast('info', 'Coupon removed.');
  }, [setAppliedCouponCode, showToast]);

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      addItem,
      removeItem,
      updateQuantity,
      increaseQuantity,
      decreaseQuantity,
      clearCart,
      hasItem,
      itemCount: count,
      subtotal: pricing.subtotal,
      deliveryFee: pricing.deliveryFee,
      discount: pricing.discount,
      total: pricing.total,
      appliedCoupon: effectiveCoupon,
      applyCoupon,
      removeCoupon,
      deliveryOption,
      setDeliveryOption,
    }),
    [
      items,
      addItem,
      removeItem,
      updateQuantity,
      increaseQuantity,
      decreaseQuantity,
      clearCart,
      hasItem,
      count,
      pricing,
      effectiveCoupon,
      applyCoupon,
      removeCoupon,
      deliveryOption,
    ],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = (): CartContextValue => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
};
