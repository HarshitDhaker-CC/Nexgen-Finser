// ─────────────────────────────────────────────────────────────────────────────
// formatters.ts
// Nexgen Finser — Currency, number and percentage formatting utilities
// ─────────────────────────────────────────────────────────────────────────────

export type Currency = 'INR' | 'USD' | 'EUR';

/** Base exchange rates relative to 1 INR */
export const EXCHANGE_RATES: Record<Currency, number> = {
  INR: 1,
  USD: 0.012, // 1 INR = 0.012 USD
  EUR: 0.011, // 1 INR = 0.011 EUR
};

export const CURRENCY_SYMBOLS: Record<Currency, string> = {
  INR: '₹',
  USD: '$',
  EUR: '€',
};

// ─── Internal helpers ─────────────────────────────────────────────────────────

/**
 * Format a number using the Indian numbering system (lakhs / crores).
 * e.g. 1234567 → "12,34,567"
 */
function toIndianCommas(value: number): string {
  const [intPart, decPart] = Math.abs(value).toFixed(2).split('.');
  // Place first comma after the last 3 digits, then every 2 digits
  const lastThree = intPart.slice(-3);
  const remaining = intPart.slice(0, -3);
  const withCommas =
    remaining.length > 0
      ? remaining.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + ',' + lastThree
      : lastThree;
  const sign = value < 0 ? '-' : '';
  return decPart === '00'
    ? `${sign}${withCommas}`
    : `${sign}${withCommas}.${decPart}`;
}

/**
 * Format a number using the international numbering system (thousands).
 * e.g. 1234567 → "1,234,567"
 */
function toInternationalCommas(value: number): string {
  const [intPart, decPart] = Math.abs(value).toFixed(2).split('.');
  const withCommas = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  const sign = value < 0 ? '-' : '';
  return decPart === '00'
    ? `${sign}${withCommas}`
    : `${sign}${withCommas}.${decPart}`;
}

/**
 * Produce a compact INR label using Indian suffixes.
 * Cr  → Crore  (≥ 1,00,00,000)
 * L   → Lakh   (≥ 1,00,000)
 * K   → Thousand (≥ 1,000)
 */
function compactINR(amount: number): string {
  const abs = Math.abs(amount);
  const sign = amount < 0 ? '-' : '';

  if (abs >= 1_00_00_000) {
    // Crore
    const val = abs / 1_00_00_000;
    const formatted = Number.isInteger(val) ? val.toString() : val.toFixed(2).replace(/\.?0+$/, '');
    return `${sign}${formatted}Cr`;
  }
  if (abs >= 1_00_000) {
    // Lakh
    const val = abs / 1_00_000;
    const formatted = Number.isInteger(val) ? val.toString() : val.toFixed(2).replace(/\.?0+$/, '');
    return `${sign}${formatted}L`;
  }
  if (abs >= 1_000) {
    // Thousand
    const val = abs / 1_000;
    const formatted = Number.isInteger(val) ? val.toString() : val.toFixed(2).replace(/\.?0+$/, '');
    return `${sign}${formatted}K`;
  }
  return `${sign}${abs}`;
}

/**
 * Produce a compact label using international suffixes.
 * B → Billion (≥ 1,000,000,000)
 * M → Million (≥ 1,000,000)
 * K → Thousand (≥ 1,000)
 */
function compactInternational(amount: number): string {
  const abs = Math.abs(amount);
  const sign = amount < 0 ? '-' : '';

  if (abs >= 1_000_000_000) {
    const val = abs / 1_000_000_000;
    const formatted = Number.isInteger(val) ? val.toString() : val.toFixed(2).replace(/\.?0+$/, '');
    return `${sign}${formatted}B`;
  }
  if (abs >= 1_000_000) {
    const val = abs / 1_000_000;
    const formatted = Number.isInteger(val) ? val.toString() : val.toFixed(2).replace(/\.?0+$/, '');
    return `${sign}${formatted}M`;
  }
  if (abs >= 1_000) {
    const val = abs / 1_000;
    const formatted = Number.isInteger(val) ? val.toString() : val.toFixed(2).replace(/\.?0+$/, '');
    return `${sign}${formatted}K`;
  }
  return `${sign}${abs}`;
}

// ─── Public API ───────────────────────────────────────────────────────────────

/**
 * Convert an INR amount to the target currency.
 *
 * @param amountInINR - Source amount expressed in Indian Rupees
 * @param currency    - Target currency
 * @returns           - Converted amount (unformatted number)
 */
export function convertCurrency(amountInINR: number, currency: Currency): number {
  return amountInINR * EXCHANGE_RATES[currency];
}

/**
 * Format a number with commas using the appropriate numbering system.
 *  • INR  → Indian system  (e.g. ₹12,34,567)
 *  • USD/EUR → International (e.g. $1,234,567)
 *
 * The `amount` is always assumed to be in INR and is converted before formatting.
 *
 * @param amount   - Amount in INR
 * @param currency - Display currency
 */
export function formatNumber(amount: number, currency: Currency): string {
  const converted = convertCurrency(amount, currency);
  const symbol = CURRENCY_SYMBOLS[currency];

  if (currency === 'INR') {
    return `${symbol}${toIndianCommas(converted)}`;
  }
  return `${symbol}${toInternationalCommas(converted)}`;
}

/**
 * Format a currency amount as a string, with optional compact notation.
 *
 * Compact examples:
 *   INR  → ₹1.5Cr, ₹45L, ₹3.2K
 *   USD  → $180K, $1.2M
 *   EUR  → €165K, €1.1M
 *
 * @param amountInINR - Amount expressed in Indian Rupees
 * @param currency    - Display currency
 * @param compact     - When true, use shorthand suffixes (default: false)
 */
export function formatCurrency(
  amountInINR: number,
  currency: Currency,
  compact: boolean = false,
): string {
  const converted = convertCurrency(amountInINR, currency);
  const symbol = CURRENCY_SYMBOLS[currency];

  if (compact) {
    if (currency === 'INR') {
      return `${symbol}${compactINR(converted)}`;
    }
    return `${symbol}${compactInternational(converted)}`;
  }

  // Full formatting with commas
  if (currency === 'INR') {
    return `${symbol}${toIndianCommas(converted)}`;
  }
  return `${symbol}${toInternationalCommas(converted)}`;
}

/**
 * Format a percentage value.
 *
 * @param value    - Numeric value (e.g. 12.5 represents 12.5 %)
 * @param decimals - Number of decimal places (default: 2)
 * @returns        - Formatted string, e.g. "12.50%"
 */
export function formatPercent(value: number, decimals: number = 2): string {
  return `${value.toFixed(decimals)}%`;
}

/**
 * Format a raw INR number into an Indian lakh / crore shorthand label.
 *
 * Examples:
 *   1_500_000   → "15 Lakh"
 *   10_000_000  → "1 Crore"
 *   5_00_00_000 → "50 Crore"
 *   75_000      → "75 Thousand"
 *   500         → "500"
 *
 * @param amount - Raw INR amount
 */
export function formatIndian(amount: number): string {
  const abs = Math.abs(amount);
  const sign = amount < 0 ? '-' : '';

  if (abs >= 1_00_00_000) {
    const crore = abs / 1_00_00_000;
    const formatted = Number.isInteger(crore)
      ? crore.toString()
      : crore.toFixed(2).replace(/\.?0+$/, '');
    return `${sign}${formatted} Crore`;
  }
  if (abs >= 1_00_000) {
    const lakh = abs / 1_00_000;
    const formatted = Number.isInteger(lakh)
      ? lakh.toString()
      : lakh.toFixed(2).replace(/\.?0+$/, '');
    return `${sign}${formatted} Lakh`;
  }
  if (abs >= 1_000) {
    const thousand = abs / 1_000;
    const formatted = Number.isInteger(thousand)
      ? thousand.toString()
      : thousand.toFixed(2).replace(/\.?0+$/, '');
    return `${sign}${formatted} Thousand`;
  }
  return `${sign}${abs}`;
}
