export interface TransactionPayload {
  id: string
}

export interface ListTransactionsPayload {
  page: number
  search: string
}

export interface UpdateTransactionCategoryPayload {
  id: string
  name: string
  color: string | null
}
