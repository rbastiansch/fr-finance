import { describe, expect, it, vi } from 'vitest'
import { debounce } from '~/utils/debounce.utils'
import { formatDateFromIso } from '~/utils/date.utils'
import { addDecimal } from '~/utils/number.utils'

describe('number utilities', () => {
  it('formats decimal values', () => expect(addDecimal(-1545)).toBe('-1,545.00'))
  it('returns an empty string for missing values', () => expect(addDecimal()).toBe(''))
})

describe('date utilities', () => {
  it('formats UTC dates', () => expect(formatDateFromIso('2022-06-27T02:24:36.869Z')).toBe('27/06/2022'))
})

describe('debounce', () => {
  it('runs once with the latest call', () => {
    vi.useFakeTimers()
    const callback = vi.fn()
    const call = debounce(callback, 500)
    call('a')
    call('b')
    vi.advanceTimersByTime(500)
    expect(callback).toHaveBeenCalledOnce()
    expect(callback).toHaveBeenCalledWith('b')
    vi.useRealTimers()
  })
})
