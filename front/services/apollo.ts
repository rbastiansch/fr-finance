import { ApolloClient, gql, InMemoryCache, OperationVariables } from '@apollo/client/core'

const client = new ApolloClient({
  uri: 'http://localhost:4000',
  cache: new InMemoryCache(),
})

const apolloPlugin = async (queryString: string = '', variables: OperationVariables) => {
  return await client
    .query({
      query: gql`${queryString}`,
      variables
    }).then(result => result)
}

export const getTransactionsRequest = async (variables: OperationVariables) => {
  return await apolloPlugin(`
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
    }`, variables)
}

export const getTransactionsWithFiltersRequest = async (variables: OperationVariables) => {
  return await apolloPlugin(`
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
    }`, variables)
}
