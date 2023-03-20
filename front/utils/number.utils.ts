export const addDecimal = (amount: string): string => {
  if (!amount) {
    return ''
  }

  const options = {
    style: 'decimal',
    minimumFractionDigits: 2
  }

  return new Intl.NumberFormat('en-US', options).format(parseInt(amount))
}
