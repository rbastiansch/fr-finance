import { PrismaClient, Prisma } from '@prisma/client'
import { Transaction, ListTransactions, UpdateTransactionCategory } from './types'
import dayjs, { Dayjs } from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'

dayjs.extend(customParseFormat)
const prisma = new PrismaClient()

const formatDate = (date: string | undefined): Dayjs | undefined => {
  return dayjs(date, 'DD/MM/YYYY').isValid() ? dayjs(date, 'DD/MM/YYYY') : undefined
}

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
            gte: formatDate(search)?.set('hour', 0).set('minute', 0).set('second', 0).toISOString(),
            lte: formatDate(search)
              ?.set('hour', 23)
              .set('minute', 59)
              .set('second', 59)
              .toISOString()
          }
        },
        {
          amount: !isNaN(Number(search)) ? parseFloat(search) : null
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
