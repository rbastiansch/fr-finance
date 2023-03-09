import { accountSeedPromise } from 'Prisma/seeds/accounts'
import { categorySeedPromise } from 'Prisma/seeds/categories'

// Used to execute all required seeds before run transactions
Promise.all([accountSeedPromise, categorySeedPromise]).then(() => {
  import('Prisma/seeds/transactions')
})
