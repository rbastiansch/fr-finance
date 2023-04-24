import { ApolloClient, gql, InMemoryCache, OperationVariables } from '@apollo/client/core'

export default class ApolloService {
  private client
  constructor() {
    const config = useRuntimeConfig()
    const { apolloApiHost } = config.public

    this.client = new ApolloClient({
      uri: apolloApiHost,
      cache: new InMemoryCache()
    })
  }

  public async apolloQuery(queryString = '', variables?: OperationVariables) {
    return await this.client
      .query({
        query: gql`
          ${queryString}
        `,
        variables
      })
      .then((result) => result)
  }

  public async apolloMutate(queryString = '', variables?: OperationVariables) {
    return await this.client
      .mutate({
        mutation: gql`
          ${queryString}
        `,
        variables
      })
      .then((result) => result)
  }
}
