import { readFile } from 'node:fs/promises'
import { parse } from 'csv-parse/sync'
import { prisma } from '#services/prisma'

interface TransactionRow {
  id: string
  accountId: string
  categoryId: string
  reference: string
  amount: string
  currency: string
  date: string
}

export async function seedTransactions() {
  const csv = await readFile(new URL('./transactions.csv', import.meta.url))
  const rows = parse(csv, { columns: true, skip_empty_lines: true }) as TransactionRow[]
  const data = rows
    .filter((row) => row.accountId && row.categoryId)
    .map((row) => ({
      id: row.id,
      accountId: row.accountId,
      categoryId: row.categoryId,
      reference: row.reference || null,
      amount: row.amount === '' ? null : Number.parseFloat(row.amount),
      currency: row.currency || null,
      date: new Date(row.date),
    }))

  const chunkSize = 100_000
  for (let start = 0; start < data.length; start += chunkSize) {
    await prisma().transaction.createMany({
      data: data.slice(start, start + chunkSize),
      skipDuplicates: true,
    })
  }
}
