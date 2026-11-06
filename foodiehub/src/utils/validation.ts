import type { CheckoutFormValues, FormErrors } from '../types';

/* ---------- Field-level validators ---------- */

export const validateFullName = (value: string): string | null => {
  const v = value.trim();
  if (!v) return 'Full name is required.';
  if (v.length < 3) return 'Name must be at least 3 characters long.';
  if (v.length > 60) return 'Name must be 60 characters or fewer.';
  // Allow letters (incl. Urdu/Arabic), spaces, hyphens, apostrophes, periods.
  if (!/^[\p{L}][\p{L}\s.'-]*$/u.test(v)) {
    return 'Name contains invalid characters.';
  }
  return null;
};

export const validateEmail = (value: string): string | null => {
  const v = value.trim();
  if (!v) return 'Email is required.';
  // Pragmatic email regex (RFC 5321 simplified).
  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (!emailRe.test(v)) return 'Please enter a valid email address.';
  return null;
};

/** Normalize a Pakistani phone number to +92XXXXXXXXXX format. Returns null if invalid. */
export const normalizePhone = (value: string): string | null => {
  const digits = value.replace(/[^\d+]/g, '');
  // Patterns:
  //   03XXXXXXXXX   -> 11 digits starting 03
  //   +923XXXXXXXXX -> 13 chars
  //   923XXXXXXXXX  -> 12 digits
  let normalized: string | null = null;
  if (/^03\d{9}$/.test(digits)) {
    normalized = '+92' + digits.slice(1);
  } else if (/^\+923\d{9}$/.test(digits)) {
    normalized = digits;
  } else if (/^923\d{9}$/.test(digits)) {
    normalized = '+' + digits;
  }
  return normalized;
};

export const validatePhone = (value: string): string | null => {
  const v = value.trim();
  if (!v) return 'Phone number is required.';
  if (!normalizePhone(v)) {
    return 'Enter a valid Pakistani number (e.g. 03XXXXXXXXX or +923XXXXXXXXX).';
  }
  return null;
};

export const validateAddress = (value: string): string | null => {
  const v = value.trim();
  if (!v) return 'Delivery address is required.';
  if (v.length < 10) return 'Address must be at least 10 characters long.';
  if (v.length > 250) return 'Address must be 250 characters or fewer.';
  return null;
};

export const validateCity = (value: string): string | null => {
  const v = value.trim();
  if (!v) return 'City is required.';
  if (v.length < 2) return 'City must be at least 2 characters long.';
  return null;
};

export const validateArea = (value: string): string | null => {
  const v = value.trim();
  if (!v) return 'Area is required.';
  return null;
};

export const validatePostalCode = (
  value: string,
  required: boolean,
): string | null => {
  const v = value.trim();
  if (!v) return required ? 'Postal code is required.' : null;
  // Pakistani postal codes are 5 digits.
  if (!/^\d{5}$/.test(v)) return 'Postal code must be exactly 5 digits.';
  return null;
};

export const validateDeliveryInstructions = (value: string): string | null => {
  if (value.length > 250) return 'Instructions must be 250 characters or fewer.';
  return null;
};

export const validateMessage = (value: string): string | null => {
  const v = value.trim();
  if (!v) return 'Message is required.';
  if (v.length < 10) return 'Message must be at least 10 characters long.';
  if (v.length > 1000) return 'Message must be 1000 characters or fewer.';
  return null;
};

export const validateSubject = (value: string): string | null => {
  const v = value.trim();
  if (!v) return 'Subject is required.';
  if (v.length < 3) return 'Subject must be at least 3 characters long.';
  return null;
};

export const validatePassword = (value: string): string | null => {
  if (!value) return 'Password is required.';
  if (value.length < 6) return 'Password must be at least 6 characters long.';
  if (value.length > 64) return 'Password must be 64 characters or fewer.';
  return null;
};

export const validatePasswordConfirm = (
  value: string,
  original: string,
): string | null => {
  if (!value) return 'Please confirm your password.';
  if (value !== original) return 'Passwords do not match.';
  return null;
};

/* ---------- Checkout form validation ---------- */

export const validateCheckout = (values: CheckoutFormValues): FormErrors<CheckoutFormValues> => {
  const errors: FormErrors<CheckoutFormValues> = {};

  const name = validateFullName(values.fullName);
  if (name) errors.fullName = name;

  const email = validateEmail(values.email);
  if (email) errors.email = email;

  const phone = validatePhone(values.phone);
  if (phone) errors.phone = phone;

  const address = validateAddress(values.address);
  if (address) errors.address = address;

  const city = validateCity(values.city);
  if (city) errors.city = city;

  const area = validateArea(values.area);
  if (area) errors.area = area;

  const postal = validatePostalCode(values.postalCode, false);
  if (postal) errors.postalCode = postal;

  const instructions = validateDeliveryInstructions(values.deliveryInstructions);
  if (instructions) errors.deliveryInstructions = instructions;

  if (!values.paymentMethod) {
    errors.paymentMethod = 'Please select a payment method.';
  }

  // Demo card / wallet field validation (frontend demo only).
  if (values.paymentMethod === 'card') {
    if (!values.cardName?.trim()) errors.cardName = 'Name on card is required.';
    if (!values.cardNumber?.trim()) {
      errors.cardNumber = 'Card number is required.';
    } else if (values.cardNumber.replace(/\s/g, '').length < 12) {
      errors.cardNumber = 'Enter a valid demo card number.';
    }
    if (!values.cardExpiry?.trim()) {
      errors.cardExpiry = 'Expiry is required.';
    } else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(values.cardExpiry.trim())) {
      errors.cardExpiry = 'Use MM/YY format.';
    }
    if (!values.cardCvc?.trim()) {
      errors.cardCvc = 'CVC is required.';
    } else if (!/^\d{3,4}$/.test(values.cardCvc.trim())) {
      errors.cardCvc = 'CVC must be 3 or 4 digits.';
    }
  }

  if (values.paymentMethod === 'wallet') {
    if (!values.walletNumber?.trim()) {
      errors.walletNumber = 'Wallet number is required.';
    } else if (normalizePhone(values.walletNumber) === null) {
      errors.walletNumber = 'Enter a valid wallet number.';
    }
  }

  return errors;
};

/** Return the first field name that has an error (for focus/scroll). */
export const firstErrorField = <T extends Record<string, unknown>>(
  errors: FormErrors<T>,
): keyof T | null => {
  const keys = Object.keys(errors) as (keyof T)[];
  return keys.length > 0 ? keys[0] : null;
};
