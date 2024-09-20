// ** Yup Imports
import * as yup from 'yup'

export type ExampleSchema = yup.InferType<typeof exampleSchema>

export const exampleSchema = yup.object().shape({
  name: yup.string().required('Required').default(''),
  lastName: yup.string().required('Required').default(''),
  description: yup.string().nullable(),
  phoneNumber: yup.string().nullable()
})
