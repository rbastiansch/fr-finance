import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import utc from 'dayjs/plugin/utc'

dayjs.extend(customParseFormat)
dayjs.extend(utc)

export const formatDate = (date: string) => {
  return dayjs.utc(date).format('DD/MM/YYYY')
}
