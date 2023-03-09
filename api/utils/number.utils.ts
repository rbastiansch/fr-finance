export const removeDecimal = (amount: string): string => {
  return new Intl.NumberFormat('en-US', {
    useGrouping: false
  }).format(parseInt(amount))
}

export const parseAmount = (amount: string): number | null => {
  if (!amount) {
    return null
  }

  const amountWithoutComma = amount.replace(/,/g, '')

  return !isNaN(Number(amountWithoutComma)) ? parseInt(removeDecimal(amountWithoutComma)) : null
}
