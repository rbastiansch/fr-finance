import { PrismaClient } from '@prisma/client'
const fs = require('fs')
const { parse } = require('csv-parse')

const dataCsv: Array<any> = []
function seedAccounts() {
  return new Promise((resolve, reject) => {
    fs.createReadStream('./prisma/seeds/accounts.csv')
      .pipe(parse({ delimiter: ',', from_line: 2 }))
      .on('data', function (row) {
        const [id, name, bank] = row

        dataCsv.push({
          id,
          name,
          bank
        })
      })
      .on('end', function () {
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
  await prisma.account.createMany({
    data: dataCsv
  })
}

const executeSeed = (resolve) => {
  main()
    .then(async () => {
      await prisma.$disconnect()
      resolve(true)
    })
    .catch(async (e) => {
      console.error(e)
      await prisma.$disconnect()
      process.exit(1)
    })
}

export const accountSeedPromise = new Promise((resolve) => {
  seedAccounts().then(() => {
    console.log('init account seed')
    executeSeed(resolve)
    console.log('finished account seed')
  })
})
