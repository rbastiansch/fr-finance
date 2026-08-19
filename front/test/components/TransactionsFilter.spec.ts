import { render, fireEvent } from '@testing-library/vue'
import { afterEach, describe, expect, it, vi } from 'vitest'
import TransactionsFilter from '~/components/Transactions/TransactionsFilter.vue'

describe('TransactionsFilter', () => {
  afterEach(() => vi.useRealTimers())

  it('debounces filter changes', async () => {
    vi.useFakeTimers()
    const { getByRole, emitted } = render(TransactionsFilter)

    await fireEvent.update(getByRole('textbox'), 'foo')
    await vi.advanceTimersByTimeAsync(1000)

    expect(emitted('change-search')).toEqual([['foo']])
  })
})
