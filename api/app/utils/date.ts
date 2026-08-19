import { DateTime } from 'luxon'

type SearchPayload = string | undefined

function parseDate(search: SearchPayload) {
  if (!search) {
    return undefined
  }

  const date = DateTime.fromFormat(search, 'dd/MM/yyyy', { zone: 'utc' })
  return date.isValid ? date : undefined
}

export function dayOnItsFirstSecond(search: SearchPayload): string | undefined {
  return parseDate(search)?.startOf('day').toISO() ?? undefined
}

export function dayOnItsLastSecond(search: SearchPayload): string | undefined {
  return (
    parseDate(search)?.set({ hour: 23, minute: 59, second: 59, millisecond: 0 }).toISO() ??
    undefined
  )
}
