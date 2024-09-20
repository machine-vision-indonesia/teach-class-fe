// ** Yup Imports
import * as yup from 'yup'

export type CalendarSchema = yup.InferType<typeof calendarSchema>

export const calendarSchema = yup.object().shape({
  title: yup.string().required('Required').default(''),
  date: yup.string(),
  color: yup.string()
})
