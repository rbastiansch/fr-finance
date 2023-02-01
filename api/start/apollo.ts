import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'
import { GraphQLScalarType } from 'graphql'
import { accounts, transaction, transactions, transactionsFilter } from 'Prisma/queries'

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = `#graphql
  scalar Date

  type Account {
    id: String
    name: String
    bank: String
  }

  type Category {
    id: String
    name: String
    color: String
  }

  type Transaction {
    id: String
    accountId: String
    categoryId: String
    reference: String
    amount: Float
    currency: String
    date: Date!
    account: Account
    category: Category
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    accounts: [Account]
    transactions(page: Int): [Transaction]
    transactionsFilter(search: String, page: Int): [Transaction]
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
    accounts,
    transaction,
    transactions,
    transactionsFilter
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
