// ============================================
// Warung AI - Currency Formatting Utility
// ============================================

/**
 * Format a number as Malaysian Ringgit (MYR) currency.
 * @param amount - The amount to format
 * @param showSymbol - Whether to include "RM" prefix (default: true)
 * @returns Formatted currency string, e.g. "RM 12.50"
 */
export function formatCurrency(amount: number, showSymbol: boolean = true): string {
  const formatted = amount.toFixed(2);
  return showSymbol ? `RM ${formatted}` : formatted;
}

/**
 * Parse a currency string back to a number.
 * @param value - Currency string like "RM 12.50" or "12.50"
 * @returns Parsed number value
 */
export function parseCurrency(value: string): number {
  const cleaned = value.replace(/[^0-9.]/g, '');
  return parseFloat(cleaned) || 0;
}

/**
 * Format a large number with K/M suffix for display.
 * @param amount - The amount to format
 * @returns Formatted string, e.g. "RM 1.2K"
 */
export function formatCompactCurrency(amount: number): string {
  if (amount >= 1_000_000) {
    return `RM ${(amount / 1_000_000).toFixed(1)}M`;
  }
  if (amount >= 1_000) {
    return `RM ${(amount / 1_000).toFixed(1)}K`;
  }
  return formatCurrency(amount);
}
