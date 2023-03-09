import { apolloQuery, apolloMutate } from '~/services/apollo'
import {
  TransactionPayload,
  ListTransactionsPayload,
  UpdateTransactionCategoryPayload,
} from '~/services/types'

export const getTransactionsRequest = async (
  variables: ListTransactionsPayload
) => {
  return await apolloQuery(
    `
    query GetTransactions($search: String, $page: Int) {
      transactions(search: $search, page: $page) {
        id
        accountId
        categoryId
        reference
        amount
        currency
        date
        account {
          name
          bank
        }
        category {
          name
          color
        }
      }
    }`,
    variables
  )
}

export const getTransactionRequest = async (variables: TransactionPayload) => {
  return await apolloQuery(
    `
    query GetTransactionById($id: ID!) {
      transaction(id: $id) {
        id
        accountId
        categoryId
        reference
        amount
        currency
        date
        account {
          name
          bank
        }
        category {
          name
          color
        }
      }
    }`,
    variables
  )
}

export const updateTransactionCategoryRequest = async (
  variables: UpdateTransactionCategoryPayload
) => {
  return await apolloMutate(
    `mutation UpdateTransactionCategory($id: ID!, $name: String, $color: String) {
    updateTransactionCategory(id: $id, name: $name, color: $color) {
      category {
        name
      }
    }
  }`,
    variables
  )
    .catch(() => {
      return {
        error: true,
        message: 'Failed to save category',
      }
    })
    .then((data) => {
      return data
    })
}
