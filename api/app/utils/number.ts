export function removeDecimal(amount: string): string {
  return new Intl.NumberFormat('en-US', {
    useGrouping: false,
  }).format(Number.parseInt(amount))
}

export function parseAmount(amount: string | undefined): number | null {
  if (!amount) {
    return null
  }

  const amountWithoutComma = amount.replace(/,/g, '')
  return !Number.isNaN(Number(amountWithoutComma))
    ? Number.parseInt(removeDecimal(amountWithoutComma))
    : null
}
