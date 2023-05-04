import ApolloService from '~/services/apollo'
import {
  TransactionPayload,
  ListTransactionsPayload,
  UpdateTransactionCategoryPayload,
  GetTransactionsResponse,
  GetTransactionResponse,
  UpdateTransactionCategoryResponse
} from '~/services/types'

export default class TransactionService extends ApolloService {
  public async getTransactionsRequest(
    variables: ListTransactionsPayload
  ): Promise<GetTransactionsResponse> {
    return await this.apolloQuery(
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

  public async getTransactionRequest(
    variables: TransactionPayload
  ): Promise<GetTransactionResponse> {
    return await this.apolloQuery(
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

  public async updateTransactionCategoryRequest(
    variables: UpdateTransactionCategoryPayload
  ): Promise<UpdateTransactionCategoryResponse> {
    return await this.apolloMutate(
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
          message: 'Failed to save category'
        }
      })
      .then((data) => {
        return data
      })
  }
}
