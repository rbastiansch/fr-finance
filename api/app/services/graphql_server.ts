import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'
import { GraphQLScalarType, Kind } from 'graphql'
import {
  accounts,
  categories,
  transaction,
  transactions,
  updateTransactionCategory,
} from '#services/transaction_queries'

const typeDefs = `#graphql
  scalar Date

  type Account {
    id: String!
    name: String!
    bank: String!
  }

  type Category {
    id: String!
    name: String!
    color: String
  }

  type Transaction {
    id: String!
    accountId: String!
    categoryId: String!
    reference: String
    amount: Float
    currency: String
    date: Date!
    account: Account
    category: Category
  }

  type Query {
    accounts: [Account!]!
    categories: [Category!]!
    transactions(search: String, page: Int): [Transaction!]!
    transaction(id: ID!): Transaction
  }

  type Mutation {
    updateTransactionCategory(id: ID!, name: String, color: String): Transaction
  }
`

const dateScalar = new GraphQLScalarType({
  name: 'Date',
  description: 'An ISO-8601 date string',
  serialize(value: unknown) {
    if (value instanceof Date) {
      return value.toISOString()
    }

    return new Date(String(value)).toISOString()
  },
  parseValue(value: unknown) {
    if (typeof value !== 'string' || Number.isNaN(Date.parse(value))) {
      throw new TypeError('Date must be a valid ISO-8601 string')
    }

    return new Date(value)
  },
  parseLiteral(ast) {
    if (ast.kind !== Kind.STRING || Number.isNaN(Date.parse(ast.value))) {
      throw new TypeError('Date must be a valid ISO-8601 string')
    }

    return new Date(ast.value)
  },
})

const server = new ApolloServer({
  typeDefs,
  resolvers: {
    Query: {
      accounts,
      categories,
      transaction,
      transactions,
    },
    Mutation: {
      updateTransactionCategory,
    },
    Date: dateScalar,
  },
})

let startPromise: Promise<{ url: string }> | undefined

export function startGraphqlServer() {
  if (!startPromise) {
    startPromise = startStandaloneServer(server, {
      listen: { port: 4000 },
    }).then(({ url }) => {
      console.log(`🚀 GraphQL server ready at: ${url}`)
      return { url }
    })
  }

  return startPromise
}
