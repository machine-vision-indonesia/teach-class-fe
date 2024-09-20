import * as yup from 'yup'

export const categoryChecklistSchema = yup.object().shape({
  code: yup.string(),
  name: yup.string().required('Category checklist name is required'),
  description: yup.string(),
  is_active: yup.boolean().required()
})

export type categoryChecklistSchemaType = yup.InferType<typeof categoryChecklistSchema>
