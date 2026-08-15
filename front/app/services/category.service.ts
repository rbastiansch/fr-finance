import ApolloService from '~/services/apollo'

export default class CategoryService extends ApolloService {
  public async getCategoriesRequest() {
    return this.apolloQuery(`query Categories {
      categories { id name color }
    }`)
  }
}
