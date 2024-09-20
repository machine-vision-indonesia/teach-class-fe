import * as yup from 'yup'

const checksheetItemSchema = yup.object().shape({
  id: yup.string(),
  name: yup
    .string()
    .required('Name is required')
    .min(1, 'Name must be at least 1 characters long after trimming whitespaces'),
  is_checked: yup.boolean().default(false)
})

export const checklistSchema = yup.object().shape({
  id: yup.string(),
  code: yup.string(),
  name: yup
    .string()
    .required('Name is required')
    .min(1, 'Name must be at least 1 characters long after trimming whitespaces'),
  description: yup.string(),
  is_active: yup.boolean().default(false),
  category_checksheet_id: yup
    .object({
      id: yup.string().required('Category is required'),
      name: yup.string(),
      code: yup.string(),
      is_active: yup.boolean()
    })
    .required('Category is required')
    .nullable(),
  production_checksheet_lists: yup.array().of(checksheetItemSchema).notRequired()
})

export type ChecklistSchema = yup.InferType<typeof checklistSchema>
