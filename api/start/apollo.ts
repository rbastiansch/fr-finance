import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'
import { PrismaClient } from '@prisma/client'
import { GraphQLScalarType } from 'graphql'

const prisma = new PrismaClient()

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = `#graphql
  scalar Date

  type Account {
    id: String
    name: String
    ban: String
  }

  type Transaction {
    id: String
    accountId: String
    categoryId: String
    reference: String
    amount: Float
    currency: String
    date: Date!
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    accounts: [Account]
    transactions: [Transaction]
    transaction(id: ID!): Transaction
  }
`

const dateScalar = new GraphQLScalarType({
  name: 'Date',
  description: 'Date custom scalar type',
  serialize(value: Date) {
    return value.toISOString()
  }
})

// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers = {
  Query: {
    accounts: () => {
      return prisma.account.findMany()
    },
    transactions: () => {
      return prisma.transaction.findMany()
    },
    transaction(_parent, args) {
      const { id } = args
      return prisma.transaction.findUnique({ where: { id } })
    }
  },
  Date: dateScalar
}

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({ typeDefs, resolvers })

// Passing an ApolloServer instance to the `startStandaloneServer` function:
startStandaloneServer(server, {
  listen: { port: 4000 }
}).then(({ url }) => {
  console.log(`🚀  Server ready at: ${url}`)
})
