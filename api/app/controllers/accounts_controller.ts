import type { HttpContext } from '@adonisjs/core/http'
import { accounts } from '#services/transaction_queries'

export default class AccountsController {
  async index({ response }: HttpContext) {
    return response.ok({ data: await accounts() })
  }
}
