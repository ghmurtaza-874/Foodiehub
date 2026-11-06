// Centralized type definitions for FoodieHub

export type CategoryId =
  | 'all'
  | 'pizza'
  | 'burgers'
  | 'biryani'
  | 'pasta'
  | 'chinese'
  | 'sandwiches'
  | 'desserts'
  | 'drinks'
  | 'healthy';

export interface Category {
  id: CategoryId;
  name: string;
  icon: string; // emoji used as lightweight icon
}

export type DietaryType = 'veg' | 'non-veg';

export interface Product {
  id: string;
  name: string;
  description: string;
  image: string;
  category: Exclude<CategoryId, 'all'>;
  price: number; // current price in PKR
  originalPrice?: number; // present when discounted
  rating: number; // 0 - 5
  dietary: DietaryType;
  available: boolean;
  prepTime: string; // e.g. "20-25 min"
  featured: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Favorite {
  product: Product;
  addedAt: number;
}

export type PaymentMethod = 'cod' | 'card' | 'wallet';
export type DeliveryOption = 'standard' | 'express';

export interface Customer {
  fullName: string;
  email: string;
  phone: string;
}

export interface AddressInfo {
  address: string;
  city: string;
  area: string;
  postalCode: string;
  deliveryInstructions?: string;
}

export interface CheckoutFormValues {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  area: string;
  postalCode: string;
  deliveryInstructions: string;
  deliveryOption: DeliveryOption;
  paymentMethod: PaymentMethod;
  cardName?: string;
  cardNumber?: string;
  cardExpiry?: string;
  cardCvc?: string;
  walletNumber?: string;
}

export type FormErrors<T> = Partial<Record<keyof T, string>>;

export interface Coupon {
  code: string;
  type: 'percent' | 'flat';
  value: number; // percentage (0-100) or flat PKR amount
  description: string;
  minSubtotal?: number;
}

export interface AppliedCoupon {
  code: string;
  discount: number;
}

export interface Order {
  id: string;
  createdAt: number;
  items: CartItem[];
  customer: Customer;
  address: AddressInfo;
  deliveryOption: DeliveryOption;
  paymentMethod: PaymentMethod;
  subtotal: number;
  deliveryFee: number;
  discount: number;
  couponCode?: string;
  total: number;
  estimatedDelivery: string;
}

export interface User {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  joinedAt: number;
}

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info';
  text: string;
}
