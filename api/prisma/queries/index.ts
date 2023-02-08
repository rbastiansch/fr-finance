import { PrismaClient } from '@prisma/client'
import { Transaction, ListTransactions } from './types'
import dayjs, { Dayjs } from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'

dayjs.extend(customParseFormat)
const prisma = new PrismaClient()

const formatDate = (date: string | undefined): Dayjs | undefined => {
  return dayjs(date, 'DD/MM/YYYY').isValid() ? dayjs(date, 'DD/MM/YYYY') : undefined
}

export const accounts = () => {
  return prisma.account.findMany()
}

export const transactions = (_parent: undefined, args: ListTransactions) => {
  const { page } = args
  const take = 20
  const skip = (page || 0) * take
  return prisma.transaction.findMany({
    take,
    skip,
    include: {
      account: true,
      category: true
    }
  })
}

export const transactionsFilter = (_parent: undefined, args: ListTransactions) => {
  const { search, page } = args
  const take = 20
  const skip = (page || 0) * take
  return prisma.transaction.findMany({
    take,
    skip,
    where: {
      OR: [
        {
          reference: {
            contains: search
          }
        },
        {
          currency: {
            contains: search
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
                  contains: search
                }
              },
              {
                bank: {
                  contains: search
                }
              }
            ]
          }
        },
        {
          category: {
            name: {
              contains: search
            }
          }
        }
      ]
    },
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
