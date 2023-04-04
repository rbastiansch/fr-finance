import { formatDateFromIso } from '~/utils/date.utils'

describe('date.utils formatDateFromIso', () => {
  const datesPayload = {
    middleOfDay: {
      iso: '2022-06-27T02:24:36.869Z',
      formatted: '27/06/2022'
    },
    endOfDay: {
      iso: '2022-06-28T02:59:59.000Z',
      formatted: '28/06/2022'
    },
    startOfDay: {
      iso: '2022-06-28T00:00:00.000Z',
      formatted: '28/06/2022'
    }
  }

  it('formats middle of day time', () => {
    const { middleOfDay } = datesPayload

    expect(formatDateFromIso(middleOfDay.iso)).toBe(middleOfDay.formatted)
  })

  it('formats end of day time', () => {
    const { endOfDay } = datesPayload

    expect(formatDateFromIso(endOfDay.iso)).toBe(endOfDay.formatted)
  })

  it('formats start of day time', () => {
    const { startOfDay } = datesPayload

    expect(formatDateFromIso(startOfDay.iso)).toBe(startOfDay.formatted)
  })
})
