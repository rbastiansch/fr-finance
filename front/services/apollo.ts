import { ApolloClient, gql, InMemoryCache, OperationVariables } from '@apollo/client/core'
import {
  TransactionPayload,
  ListTransactionsPayload,
  UpdateTransactionCategoryPayload,
} from '~/services/types'

const client = new ApolloClient({
  uri: 'http://localhost:4000',
  cache: new InMemoryCache(),
})

const apolloQuery = async (
  queryString: string = '',
  variables?: OperationVariables
) => {
  return await client
    .query({
      query: gql`
        ${queryString}
      `,
      variables,
    })
    .then((result) => result)
}

const apolloMutate = async (
  queryString: string = '',
  variables?: OperationVariables
) => {
  return await client
    .mutate({
      mutation: gql`
        ${queryString}
      `,
      variables,
    })
    .then((result) => result)
}

export const getTransactionsRequest = async (variables: TransactionPayload) => {
  return await apolloQuery(
    `
    query GetTransactions($page: Int) {
      transactions(page: $page) {
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

export const getTransactionsWithFiltersRequest = async (
  variables: ListTransactionsPayload
) => {
  return await apolloQuery(
    `
    query GetTransactionsFilter($search: String, $page: Int) {
      transactionsFilter(search: $search, page: $page) {
        id
        accountId
        categoryId
        reference
        amount
        currency
        date
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

export const getCategoriesRequest = async () => {
  return await apolloQuery(`query Categories {
    categories {
      id
      name
      color
    }
  }`)
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
