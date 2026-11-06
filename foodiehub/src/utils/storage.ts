/** Safe localStorage helpers that never throw on corrupt data. */

export const safeParse = <T>(raw: string | null, fallback: T): T => {
  if (!raw) return fallback;
  try {
    const parsed: unknown = JSON.parse(raw);
    return parsed as T;
  } catch {
    return fallback;
  }
};

export const readStorage = <T>(key: string, fallback: T): T => {
  try {
    return safeParse(localStorage.getItem(key), fallback);
  } catch {
    return fallback;
  }
};

export const writeStorage = <key extends string>(key: key, value: unknown): void => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Quota / private mode — fail silently.
  }
};

export const removeStorage = (key: string): void => {
  try {
    localStorage.removeItem(key);
  } catch {
    // ignore
  }
};

export const STORAGE_KEYS = {
  cart: 'foodiehub.cart',
  favorites: 'foodiehub.favorites',
  orders: 'foodiehub.orders',
  user: 'foodiehub.user',
  coupon: 'foodiehub.coupon',
} as const;

/** Generate a unique demo order id, e.g. FH-20251106-A8F4K2. */
export const generateOrderId = (): string => {
  const d = new Date();
  const ymd = `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, '0')}${String(
    d.getDate(),
  ).padStart(2, '0')}`;
  const rand = Math.random().toString(36).slice(2, 8).toUpperCase();
  return `FH-${ymd}-${rand}`;
};
