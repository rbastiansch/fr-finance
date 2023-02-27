import { apolloQuery } from '~/services/apollo'

export const getCategoriesRequest = async () => {
  return await apolloQuery(`query Categories {
    categories {
      id
      name
      color
    }
  }`)
}
