// Currencies where the display amount equals the smallest unit (no ×100).
// Follows Stripe's zero-decimal definition.
const ZERO_DECIMAL = new Set([
  "BIF","CLP","DJF","GNF","JPY","KMF","KRW","MGA",
  "PYG","RWF","UGX","VND","VUV","XAF","XOF","XPF",
]);

// Convert a display amount (e.g. 50.00 USD or 5000 JPY) to the minor unit
// stored in the donations table (cents for USD, yen for JPY, etc.).
export function toMinorUnit(amount: string | number, currency: string): number {
  const n = typeof amount === "string" ? parseFloat(amount) : amount;
  if (!isFinite(n) || n < 0) return 0;
  return ZERO_DECIMAL.has(currency.toUpperCase())
    ? Math.round(n)
    : Math.round(n * 100);
}
