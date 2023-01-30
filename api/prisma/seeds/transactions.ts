import { PrismaClient } from '@prisma/client'
const fs = require('fs')
const { parse } = require('csv-parse')

const dataCsv: Array<any> = []
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
  await prisma.transaction.createMany({
    data: dataCsv
  })
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
