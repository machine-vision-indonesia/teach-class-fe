import * as yup from 'yup'

export const editModalSchema = yup.object().shape({
  category: yup.string(),
  name: yup.string().required('Status name is required'),
  color: yup.string().required('Color is required'),
  description: yup.string()
})

export type editSchemaType = yup.InferType<typeof editModalSchema>
