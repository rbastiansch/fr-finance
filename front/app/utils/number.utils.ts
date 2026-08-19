export const addDecimal = (amount?: string | number): string => {
  if (amount === undefined || amount === null || amount === '') return ''
  return new Intl.NumberFormat('en', { style: 'decimal', minimumFractionDigits: 2 }).format(
    parseFloat(String(amount))
  )
}
