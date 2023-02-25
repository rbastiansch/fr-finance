export interface Transaction {
  id: string
}

export interface ListTransactions {
  page: number
  search: string
}

export interface UpdateTransactionCategory {
  id: string
  name: string
  color: string | null
}
