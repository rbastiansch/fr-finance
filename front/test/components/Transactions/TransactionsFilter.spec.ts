import { render } from '@testing-library/vue'
import userEvent from '@testing-library/user-event'
import TransactionsFilter from '~/components/Transactions/TransactionsFilter.vue'

describe('TransactionsFilter', () => {
  const user = userEvent.setup({ delay: null })
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.clearAllTimers()
  })

  it('renders default component', () => {
    const { getByRole } = render(TransactionsFilter)

    expect(getByRole('label', { hidden: true })).toBeInTheDocument()
    expect(getByRole('textbox')).toBeInTheDocument()
  })

  it('emits typing only after debounce function', async () => {
    const { getByRole, emitted } = render(TransactionsFilter)

    await user.type(getByRole('textbox'), 'foo1')
    await user.clear(getByRole('textbox'))
    await user.type(getByRole('textbox'), 'foo')

    expect(emitted('change-search')).toBeUndefined()
    vi.advanceTimersByTime(1000)
    expect(emitted('change-search')).toStrictEqual([['foo']])
  })
})
