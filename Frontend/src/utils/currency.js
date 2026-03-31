export function formatBDT(amount) {
  const value = Number(amount || 0)

  return new Intl.NumberFormat('en-BD', {
    style: 'currency',
    currency: 'BDT',
    maximumFractionDigits: 2
  }).format(value)
}
