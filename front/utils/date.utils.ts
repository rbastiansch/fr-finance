import dayjs, { extend } from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import utc from 'dayjs/plugin/utc'

extend(customParseFormat)
extend(utc)

export const formatDateFromIso = (date = '' as string) => {
  return dayjs.utc(date).format('DD/MM/YYYY')
}
