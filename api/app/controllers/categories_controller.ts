import type { HttpContext } from '@adonisjs/core/http'
import { categories } from '#services/transaction_queries'

export default class CategoriesController {
  async index({ response }: HttpContext) {
    return response.ok({ data: await categories() })
  }
}
