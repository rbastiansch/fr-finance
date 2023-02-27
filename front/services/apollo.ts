import {
  ApolloClient,
  gql,
  InMemoryCache,
  OperationVariables,
} from '@apollo/client/core'

const client = new ApolloClient({
  uri: 'http://localhost:4000',
  cache: new InMemoryCache(),
})

export const apolloQuery = async (
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

export const apolloMutate = async (
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
