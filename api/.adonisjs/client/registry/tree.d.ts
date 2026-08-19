/* eslint-disable prettier/prettier */
import type { routes } from './index.ts'

export interface ApiDefinition {
  accounts: {
    index: typeof routes['accounts.index']
  }
  categories: {
    index: typeof routes['categories.index']
  }
  transactions: {
    index: typeof routes['transactions.index']
    show: typeof routes['transactions.show']
    updateCategory: typeof routes['transactions.update_category']
  }
  auth: {
    newAccount: {
      store: typeof routes['auth.new_account.store']
    }
    accessTokens: {
      store: typeof routes['auth.access_tokens.store']
    }
  }
  profile: {
    profile: {
      show: typeof routes['profile.profile.show']
    }
    accessTokens: {
      destroy: typeof routes['profile.access_tokens.destroy']
    }
  }
}
