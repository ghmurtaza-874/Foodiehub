/** Format a number as a PKR currency string. */
export const formatPKR = (amount: number): string => {
  const safe = Number.isFinite(amount) ? amount : 0;
  return `PKR ${Math.round(safe).toLocaleString('en-PK')}`;
};

export const formatPrice = formatPKR;
