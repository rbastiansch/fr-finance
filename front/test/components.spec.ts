import { render, fireEvent } from '@testing-library/vue'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import CommonAlert from '~/components/CommonAlert.vue'
import CommonChip from '~/components/CommonChip.vue'
import CommonCombobox from '~/components/CommonCombobox.vue'
import CommonHeader from '~/components/CommonHeader.vue'
import CommonLoading from '~/components/CommonLoading.vue'
import TransactionsFilter from '~/components/Transactions/TransactionsFilter.vue'
import TransactionsTable from '~/components/Transactions/TransactionsTable.vue'

describe('common components', () => {
  it('renders a header slot', () => expect(render(CommonHeader, { slots: { default: 'slot content' } }).getByText('slot content')).toBeInTheDocument())
  it('renders a chip with custom color', () => {
    const { getByTestId } = render(CommonChip, { props: { backgroundColor: '#f1f1f1' } })
    expect(getByTestId('common-chip')).toHaveStyle('background-color: rgb(241, 241, 241)')
  })
  it('renders loading svg', () => expect(render(CommonLoading).container.querySelector('svg')).toBeInTheDocument())
  it('filters combobox options', async () => {
    const { getByRole, getAllByRole } = render(CommonCombobox, {
      props: { modelValue: '', options: [{ text: 'Horse', value: 'horse' }, { text: 'Dog', value: 'dog' }] }
    })
    await userEvent.type(getByRole('combobox'), 'Hor')
    expect(getAllByRole('option')).toHaveLength(1)
  })
  it('closes an alert after its timeout', async () => {
    vi.useFakeTimers()
    const { emitted } = render(CommonAlert, { props: { modelValue: true, millisecondsToClose: 100 } })
    await vi.advanceTimersByTimeAsync(100)
    expect(emitted('update:modelValue')).toEqual([[false]])
    vi.useRealTimers()
  })
})

describe('transaction components', () => {
  it('debounces filter changes', async () => {
    vi.useFakeTimers()
    const { getByRole, emitted } = render(TransactionsFilter)
    await fireEvent.update(getByRole('textbox'), 'foo')
    vi.advanceTimersByTime(1000)
    expect(emitted('change-search')).toEqual([['foo']])
    vi.useRealTimers()
  })

  it('renders a transaction row', () => {
    const { getByText } = render(TransactionsTable, {
      props: {
        transactions: [{
          id: 'id-123', reference: 'Reference text', amount: -1545, currency: 'GBP',
          date: '2022-06-27T00:00:00.000Z', account: { name: 'Account name', bank: 'Bank name' },
          category: { name: 'Category name', color: 'red' }
        }]
      }
    })
    expect(getByText('Reference text')).toBeInTheDocument()
    expect(getByText('-1,545.00')).toBeInTheDocument()
  })

  it('renders loading space at the bottom of the table', () => {
    const { getByTestId } = render(TransactionsTable, { props: { loading: true } })
    expect(getByTestId('table-loading')).toBeVisible()
  })
})
