import type { Transaction } from '~/types'

export interface ListTransactionsPayload { page: number; search: string }
export interface GetTransactionsResponse { data: { transactions: Transaction[] } }
export interface TransactionPayload { id: string }
export interface GetTransactionResponse { data: { transaction: Transaction } }
export interface UpdateTransactionCategoryPayload { id: string; name?: string; color: string | null }
export interface UpdateTransactionCategoryResponse { data?: unknown; error?: boolean; message?: string }
