import userEvent from '@testing-library/user-event'
import { fireEvent } from '@testing-library/vue'
import TransactionsTable from '~/components/Transactions/TransactionsTable.vue'
import { customRender } from '~/test/testingLibraryHelper'

const mockTransaction = {
  id: 'id-123',
  reference: 'Reference text',
  amount: -1545,
  currency: 'GBP',
  date: '2022-06-27T00:00:00.000Z',
  account: {
    name: 'Account name',
    bank: 'Bank name'
  },
  category: {
    name: 'Category name',
    color: 'red'
  }
}

describe('TransactionsTable', () => {
  const user = userEvent.setup({ delay: null })
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.clearAllTimers()
  })
  it('renders default component', () => {
    const { getByRole, getByTestId } = customRender(TransactionsTable)

    expect(getByRole('columnheader', { name: 'Reference' })).toBeInTheDocument()
    expect(getByRole('columnheader', { name: 'Category' })).toBeInTheDocument()
    expect(getByRole('columnheader', { name: 'Date' })).toBeInTheDocument()
    expect(getByRole('columnheader', { name: 'Amount' })).toBeInTheDocument()
    expect(getByTestId('table-loading')).not.toBeVisible()
  })

  it('renders with full filled transaction', () => {
    const { getByText } = customRender(TransactionsTable, {
      props: {
        transactions: [mockTransaction]
      }
    })

    expect(getByText('Reference text')).toBeInTheDocument()
    expect(getByText('Category name')).toBeInTheDocument()
    expect(getByText('Bank name')).toBeInTheDocument()
    expect(getByText('27/06/2022')).toBeInTheDocument()
    expect(getByText('-1,545.00')).toBeInTheDocument()
    expect(getByText('GBP')).toBeInTheDocument()
  })

  it('renders with empty reference', () => {
    const { getByText } = customRender(TransactionsTable, {
      props: {
        transactions: [{ ...mockTransaction, reference: '' }]
      }
    })

    expect(getByText('No reference provided')).toBeInTheDocument()
  })

  it('shows loading when it is set true', () => {
    const { getByTestId } = customRender(TransactionsTable, {
      props: {
        loading: true
      }
    })

    expect(getByTestId('table-loading')).toBeVisible()
  })

  it('emits event when click a row cell', async () => {
    const { getByRole, emitted } = customRender(TransactionsTable, {
      props: {
        transactions: [mockTransaction]
      }
    })

    await user.click(getByRole('cell', { name: 'Reference text' }))

    expect(emitted('click-row')).toStrictEqual([['id-123']])
  })

  it('emits event when scrolls table', async () => {
    const { container, emitted } = customRender(TransactionsTable, {
      props: {
        transactions: [mockTransaction]
      }
    })

    const table = container.querySelector('.transactionsTable')
    expect(emitted('scroll-bottom')).toBeUndefined()

    await fireEvent.scroll(table, { target: { scrollTop: 1 } })
    await fireEvent.scroll(table, { target: { scrollTop: 0 } })

    vi.advanceTimersByTime(300)
    expect(emitted('scroll-bottom')).not.toBeUndefined()
  })
})
