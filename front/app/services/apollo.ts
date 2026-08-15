import { ApolloClient, gql, InMemoryCache, type OperationVariables } from '@apollo/client/core'

const defaultApolloApiHost = 'http://localhost:4000'

export default class ApolloService {
  private client: ApolloClient<unknown>

  constructor() {
    const config = useRuntimeConfig()
    this.client = new ApolloClient({
      uri: config.public.apolloApiHost || defaultApolloApiHost,
      cache: new InMemoryCache()
    })
  }

  public async apolloQuery(queryString = '', variables?: OperationVariables) {
    return this.client.query({ query: gql(queryString), variables })
  }

  public async apolloMutate(queryString = '', variables?: OperationVariables) {
    return this.client.mutate({ mutation: gql(queryString), variables })
  }
}
