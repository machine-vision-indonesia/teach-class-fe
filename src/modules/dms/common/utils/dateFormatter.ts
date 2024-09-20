import { format } from 'date-fns'

export const formatDateString = (date: Date) => {
  if (!date) return ''

  return format(date, 'dd/MM/yyyy')
}
