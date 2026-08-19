import { disconnectPrisma } from '#services/prisma'
import { seedAccounts } from './seeds/accounts.ts'
import { seedCategories } from './seeds/categories.ts'
import { seedTransactions } from './seeds/transactions.ts'

async function main() {
  await seedAccounts()
  await seedCategories()
  await seedTransactions()
}

try {
  await main()
} catch (error) {
  console.error(error)
  process.exitCode = 1
} finally {
  await disconnectPrisma()
}
