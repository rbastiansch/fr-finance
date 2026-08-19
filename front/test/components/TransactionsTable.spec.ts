import { render, fireEvent } from '@testing-library/vue'
import { describe, expect, it } from 'vitest'
import TransactionsTable from '~/components/Transactions/TransactionsTable.vue'
import { createTransaction } from '../helpers/fixtures'

describe('TransactionsTable', () => {
  it('renders a transaction row', () => {
    const { getByText } = render(TransactionsTable, {
      props: { transactions: [createTransaction()] }
    })

    expect(getByText('Reference text')).toBeInTheDocument()
    expect(getByText('-1,545.00')).toBeInTheDocument()
  })

  it('makes transaction rows keyboard accessible', async () => {
    const { getByRole, emitted } = render(TransactionsTable, {
      props: { transactions: [createTransaction()] }
    })
    const row = getByRole('button', { name: /Reference: Reference text/ })

    expect(row).toHaveAttribute('tabindex', '0')
    await fireEvent.keyDown(row, { key: 'Enter' })
    await fireEvent.keyDown(row, { key: ' ' })

    expect(emitted('click-row')).toEqual([['id-123'], ['id-123']])
  })

  it('makes the scrollable table keyboard accessible', () => {
    const { container } = render(TransactionsTable)
    const table = container.querySelector('.transactionsTable')

    expect(table).toHaveAttribute('tabindex', '0')
    expect(table).toHaveAttribute('role', 'region')
  })

  it('renders loading space at the bottom of the table', () => {
    const { getByTestId } = render(TransactionsTable, { props: { loading: true } })

    expect(getByTestId('table-loading')).toBeVisible()
  })
})
