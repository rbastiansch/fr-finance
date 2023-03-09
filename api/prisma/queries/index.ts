import { PrismaClient, Prisma } from '@prisma/client'
import { Transaction, ListTransactions, UpdateTransactionCategory } from './types'
import { parseAmount } from 'Utils/number.utils'
import { dayOnItsFirstSecond, dayOnItsLastSecond } from 'Utils/date.utils'

const prisma = new PrismaClient()

export const transactions = (_parent: undefined, args: ListTransactions) => {
  const { search, page } = args
  const take = 20
  const skip = (page || 0) * take

  const filterWhereClause = {
    where: {
      OR: [
        {
          reference: {
            contains: search,
            mode: Prisma.QueryMode.insensitive
          }
        },
        {
          currency: {
            contains: search,
            mode: Prisma.QueryMode.insensitive
          }
        },
        {
          date: {
            gte: dayOnItsFirstSecond(search),
            lte: dayOnItsLastSecond(search)
          }
        },
        {
          amount: parseAmount(search)
        },
        {
          account: {
            OR: [
              {
                name: {
                  contains: search,
                  mode: Prisma.QueryMode.insensitive
                }
              },
              {
                bank: {
                  contains: search,
                  mode: Prisma.QueryMode.insensitive
                }
              }
            ]
          }
        },
        {
          category: {
            name: {
              contains: search,
              mode: Prisma.QueryMode.insensitive
            }
          }
        }
      ]
    }
  }

  return prisma.transaction.findMany({
    take,
    skip,
    ...(search && filterWhereClause),
    include: {
      account: true,
      category: true
    }
  })
}

export const transaction = (_parent: undefined, args: Transaction) => {
  const { id } = args
  return prisma.transaction.findUnique({
    where: { id },
    include: {
      account: true,
      category: true
    }
  })
}

export const categories = () => {
  return prisma.category.findMany()
}

export const updateTransactionCategory = async (
  _parent: undefined,
  args: UpdateTransactionCategory
) => {
  const { id, name, color } = args

  const category = await prisma.category.upsert({
    where: { name },
    update: { name, color },
    create: { name, color }
  })

  const categoryId = category.id

  return prisma.transaction.update({
    where: {
      id
    },
    data: {
      categoryId
    }
  })
}
