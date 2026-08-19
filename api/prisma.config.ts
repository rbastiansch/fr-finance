import { defineConfig } from 'prisma/config'

// Prisma CLI commands only need DATABASE_URL. Do not import the application
// environment validator here, because it would require every runtime API
// variable during commands such as `prisma generate`.
const databaseUrl = process.env.DATABASE_URL

if (!databaseUrl) {
  throw new Error('DATABASE_URL is required to run Prisma commands')
}

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
    seed: 'tsx prisma/seed.ts',
  },
  datasource: {
    url: databaseUrl,
  },
})
