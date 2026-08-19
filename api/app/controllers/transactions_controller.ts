import type { HttpContext } from '@adonisjs/core/http'
import { transaction, transactions, updateTransactionCategory } from '#services/transaction_queries'

export default class TransactionsController {
  async index({ request, response }: HttpContext) {
    const search = request.input('search')
    const page = request.input('page')

    return response.ok({
      data: await transactions(undefined, {
        search: typeof search === 'string' ? search : undefined,
        page: page === undefined ? undefined : Number(page),
      }),
    })
  }

  async show({ params, response }: HttpContext) {
    const result = await transaction(undefined, { id: params.id })

    if (!result) {
      return response.notFound({ message: 'Transaction not found' })
    }

    return response.ok({ data: result })
  }

  async updateCategory({ params, request, response }: HttpContext) {
    const { name, color } = request.only(['name', 'color'])

    if (typeof name !== 'string' || name.trim() === '') {
      return response.badRequest({ message: 'Category name is required' })
    }

    return response.ok({
      data: await updateTransactionCategory(undefined, {
        id: params.id,
        name,
        color: color ?? null,
      }),
    })
  }
}
