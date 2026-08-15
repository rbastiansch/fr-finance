import { readFile } from 'node:fs/promises'
import { parse } from 'csv-parse/sync'
import { prisma } from '#services/prisma'

interface CategoryRow {
  id: string
  name: string
  color: string
}

export async function seedCategories() {
  const csv = await readFile(new URL('./categories.csv', import.meta.url))
  const rows = parse(csv, { columns: true, skip_empty_lines: true }) as CategoryRow[]
  const data = rows.map((row) => ({
    ...row,
    color: row.color || null,
  }))

  await prisma().category.createMany({
    data,
    skipDuplicates: true,
  })
}
