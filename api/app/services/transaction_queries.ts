import type { Prisma } from '../../generated/prisma/client.ts'
import { dayOnItsFirstSecond, dayOnItsLastSecond } from '#utils/date'
import { parseAmount } from '#utils/number'
import { prisma } from '#services/prisma'

export interface TransactionArgs {
  id: string
}

export interface ListTransactionsArgs {
  page?: number | null
  search?: string | null
}

export interface UpdateTransactionCategoryArgs {
  id: string
  name?: string | null
  color?: string | null
}

export function accounts() {
  return prisma().account.findMany()
}

export function categories() {
  return prisma().category.findMany()
}

export function transaction(_parent: unknown, args: TransactionArgs) {
  return prisma().transaction.findUnique({
    where: { id: args.id },
    include: { account: true, category: true },
  })
}

export function transactions(_parent: unknown, args: ListTransactionsArgs) {
  const search = args.search ?? undefined
  const take = 100
  const page = Number.isFinite(args.page) && (args.page ?? 0) > 0 ? Number(args.page) : 0
  const skip = page * take

  const where: Prisma.TransactionWhereInput = {
    OR: [
      {
        reference: {
          contains: search,
          mode: 'insensitive',
        },
      },
      {
        currency: {
          contains: search,
          mode: 'insensitive',
        },
      },
      {
        date: {
          gte: dayOnItsFirstSecond(search),
          lte: dayOnItsLastSecond(search),
        },
      },
      {
        amount: parseAmount(search),
      },
      {
        account: {
          OR: [
            { name: { contains: search, mode: 'insensitive' } },
            { bank: { contains: search, mode: 'insensitive' } },
          ],
        },
      },
      {
        category: {
          name: { contains: search, mode: 'insensitive' },
        },
      },
    ],
  }

  return prisma().transaction.findMany({
    take,
    skip,
    ...(search ? { where } : {}),
    include: { account: true, category: true },
  })
}

export async function updateTransactionCategory(
  _parent: unknown,
  args: UpdateTransactionCategoryArgs
) {
  if (!args.name) {
    throw new Error('Category name is required')
  }

  const category = await prisma().category.upsert({
    where: { name: args.name },
    update: { name: args.name, color: args.color },
    create: { name: args.name, color: args.color },
  })

  return prisma().transaction.update({
    where: { id: args.id },
    data: { categoryId: category.id },
    include: { account: true, category: true },
  })
}
