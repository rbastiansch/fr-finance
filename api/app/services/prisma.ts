import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '../../generated/prisma/client.ts'
import env from '#start/env'

let client: PrismaClient | undefined

export function prisma(): PrismaClient {
  if (!client) {
    client = new PrismaClient({
      adapter: new PrismaPg({ connectionString: env.get('DATABASE_URL') }),
    })
  }

  return client
}

export async function disconnectPrisma() {
  if (client) {
    await client.$disconnect()
    client = undefined
  }
}
