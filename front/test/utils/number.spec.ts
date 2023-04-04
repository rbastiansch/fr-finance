import { addDecimal } from '~/utils/number.utils'

describe('number.utils addDecimal', () => {
  const numbersPayload = {
    positive: {
      raw: '1000',
      formatted: '1,000.00'
    },
    negative: {
      raw: '-1545',
      formatted: '-1,545.00'
    },
    withFractions: {
      raw: '1000.56',
      formatted: '1,000.56'
    },
    empty: {
      raw: '',
      formatted: ''
    }
  }

  it('adds decimal to positive number', () => {
    const { positive } = numbersPayload

    expect(addDecimal(positive.raw)).toBe(positive.formatted)
  })

  it('adds decimal to negative number', () => {
    const { negative } = numbersPayload

    expect(addDecimal(negative.raw)).toBe(negative.formatted)
  })

  it('adds decimal to number with fractions', () => {
    const { withFractions } = numbersPayload

    expect(addDecimal(withFractions.raw)).toBe(withFractions.formatted)
  })

  it('returns empty string if is not passed a value to format', () => {
    const { empty } = numbersPayload

    expect(addDecimal(empty.raw)).toBe(empty.formatted)
  })
})
