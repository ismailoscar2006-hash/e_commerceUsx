/**
 * Format a numeric amount as Moroccan Dirham with French locale spacing.
 * Examples: 12999 → "12 999 MAD", 1499.99 → "1 499,99 MAD"
 */
export function formatPrice(amount) {
  const num = Number(amount)
  if (Number.isNaN(num)) return '0 MAD'

  const hasDecimals = Math.abs(num % 1) > 0.001

  const formatted = new Intl.NumberFormat('fr-FR', {
    minimumFractionDigits: hasDecimals ? 2 : 0,
    maximumFractionDigits: 2,
  }).format(num)

  return `${formatted} MAD`
}
