import { accountSeedPromise } from './seeds/accounts'
import { categorySeedPromise } from './seeds/categories'

// Used to execute all required seeds before run transactions
Promise.all([accountSeedPromise, categorySeedPromise]).then(() => {
  import('./seeds/transactions')
})
