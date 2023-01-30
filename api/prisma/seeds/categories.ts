import { PrismaClient } from '@prisma/client'
const fs = require('fs')
const { parse } = require('csv-parse')

const dataCsv: Array<any> = []
function seedCategories() {
  return new Promise((resolve, reject) => {
    fs.createReadStream('./prisma/seeds/categories.csv')
      .pipe(parse({ delimiter: ',', from_line: 2 }))
      .on('data', function (row) {
        const [id, name, color] = row

        dataCsv.push({
          id,
          name,
          color
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
  await prisma.category.createMany({
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

export const categorySeedPromise = new Promise((resolve) => {
  seedCategories().then(() => {
    console.log('init category seed')
    executeSeed(resolve)
    console.log('finished category seed')
  })
})
