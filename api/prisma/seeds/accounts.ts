import { readFile } from 'node:fs/promises'
import { parse } from 'csv-parse/sync'
import { prisma } from '#services/prisma'

interface AccountRow {
  id: string
  name: string
  bank: string
}

export async function seedAccounts() {
  const csv = await readFile(new URL('./accounts.csv', import.meta.url))
  const data = parse(csv, { columns: true, skip_empty_lines: true }) as AccountRow[]

  await prisma().account.createMany({
    data,
    skipDuplicates: true,
  })
}
