import dayjs, { Dayjs } from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
dayjs.extend(customParseFormat)

type SearchPayload = string | undefined
type FormatterDayTimeReturn = string | undefined

const formatDate = (date: SearchPayload): Dayjs | undefined => {
  return dayjs(date, 'DD/MM/YYYY').isValid() ? dayjs(date, 'DD/MM/YYYY') : undefined
}

export const dayOnItsFirstSecond = (search: SearchPayload): FormatterDayTimeReturn => {
  return formatDate(search)?.set('hour', 0).set('minute', 0).set('second', 0).toISOString()
}

export const dayOnItsLastSecond = (search: SearchPayload): FormatterDayTimeReturn => {
  return formatDate(search)?.set('hour', 23).set('minute', 59).set('second', 59).toISOString()
}
