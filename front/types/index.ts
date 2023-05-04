export interface Account {
  name?: string
  bank?: string
}

export interface Category {
  name?: string
  color?: string
}

export interface Transaction {
  id: string
  reference?: string
  amount?: number
  currency: string
  date?: string
  account: Account
  category: Category
}

export interface Alert {
  show: boolean
  message?: string
  borderColor?: string
}
