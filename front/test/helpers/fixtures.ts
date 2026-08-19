import type { Category, Transaction } from '~/types'

export const createCategory = (overrides: Partial<Category> = {}): Category => ({
  id: 'category-123',
  name: 'Category name',
  color: 'red',
  ...overrides
})

export const createTransaction = (overrides: Partial<Transaction> = {}): Transaction => ({
  id: 'id-123',
  reference: 'Reference text',
  amount: -1545,
  currency: 'GBP',
  date: '2022-06-27T00:00:00.000Z',
  account: { name: 'Account name', bank: 'Bank name' },
  category: createCategory(),
  ...overrides
})
