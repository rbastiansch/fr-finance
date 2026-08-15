import ApolloService from '~/services/apollo'
import type {
  GetTransactionResponse,
  GetTransactionsResponse,
  ListTransactionsPayload,
  TransactionPayload,
  UpdateTransactionCategoryPayload,
  UpdateTransactionCategoryResponse
} from '~/services/types'

export default class TransactionService extends ApolloService {
  public async getTransactionsRequest(variables: ListTransactionsPayload): Promise<GetTransactionsResponse> {
    return this.apolloQuery(`query GetTransactions($search: String, $page: Int) {
      transactions(search: $search, page: $page) {
        id accountId categoryId reference amount currency date
        account { name bank }
        category { name color }
      }
    }`, variables) as Promise<GetTransactionsResponse>
  }

  public async getTransactionRequest(variables: TransactionPayload): Promise<GetTransactionResponse> {
    return this.apolloQuery(`query GetTransactionById($id: ID!) {
      transaction(id: $id) {
        id accountId categoryId reference amount currency date
        account { name bank }
        category { name color }
      }
    }`, variables) as Promise<GetTransactionResponse>
  }

  public async updateTransactionCategoryRequest(
    variables: UpdateTransactionCategoryPayload
  ): Promise<UpdateTransactionCategoryResponse> {
    return this.apolloMutate(`mutation UpdateTransactionCategory($id: ID!, $name: String, $color: String) {
      updateTransactionCategory(id: $id, name: $name, color: $color) { category { name } }
    }`, variables)
      .catch(() => ({ error: true, message: 'Failed to save category' })) as Promise<UpdateTransactionCategoryResponse>
  }
}
