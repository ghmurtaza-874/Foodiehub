import type { Coupon } from '../types';

export const coupons: Coupon[] = [
  {
    code: 'WELCOME10',
    type: 'percent',
    value: 10,
    description: '10% off your order',
    minSubtotal: 0,
  },
  {
    code: 'FOODIE15',
    type: 'percent',
    value: 15,
    description: '15% off — for foodies',
    minSubtotal: 1500,
  },
  {
    code: 'SAVE200',
    type: 'flat',
    value: 200,
    description: 'PKR 200 off',
    minSubtotal: 1000,
  },
];

export const findCoupon = (code: string): Coupon | undefined =>
  coupons.find((c) => c.code.toUpperCase() === code.trim().toUpperCase());
