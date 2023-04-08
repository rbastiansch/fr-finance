import { PrismaClient } from '@prisma/client'
import fs from 'fs'
import { parse } from 'csv-parse'

interface TransactionRow {
  id: string
  accountId: string
  categoryId: string
  reference?: string
  amount?: number
  currency?: string
  date: string
}

const dataCsv: Array<TransactionRow> = []
function getParsedData() {
  return new Promise((resolve, reject) => {
    fs.createReadStream('./prisma/seeds/transactions.csv')
      .pipe(parse({ delimiter: ',', from_line: 2 }))
      .on('data', function (row) {
        const [id, accountId, categoryId, reference, amount, currency, date] = row

        if (accountId && categoryId) {
          dataCsv.push({
            id,
            accountId,
            categoryId,
            reference,
            amount: parseFloat(amount),
            currency,
            date: new Date(date).toISOString()
          })
        }
      })
      .on('end', function () {
        console.log('finished transaction seed')
        resolve(true)
      })
      .on('error', function (error) {
        console.log(error.message)
        reject(error.message)
      })
  })
}

const prisma = new PrismaClient()

async function main() {
  // split by 100k to not breaks
  const spliters = [100000, 200000, 300000, 400000]
  let starter = 0
  for (const iterator of spliters) {
    const dataChunk = dataCsv.slice(starter, iterator)
    await prisma.transaction.createMany({
      data: dataChunk
    })
    starter = iterator
  }
}

const executeSeed = () => {
  main()
    .then(async () => {
      await prisma.$disconnect()
    })
    .catch(async (e) => {
      console.error(e)
      await prisma.$disconnect()
      process.exit(1)
    })
}

getParsedData().then(() => {
  console.log('init transaction seed')
  executeSeed()
})
