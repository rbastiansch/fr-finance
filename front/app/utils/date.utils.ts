import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import utc from 'dayjs/plugin/utc'

dayjs.extend(customParseFormat)
dayjs.extend(utc)

export const formatDateFromIso = (date = '') => dayjs.utc(date).format('DD/MM/YYYY')
