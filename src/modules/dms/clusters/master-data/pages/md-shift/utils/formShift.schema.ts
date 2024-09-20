import * as yup from 'yup'

export const FormShiftSchema = yup.object().shape({
  code: yup.string(),
  name: yup.string().required(),
  type: yup.string().required(),
  start: yup.date().required(),
  end: yup.date().required(),
  company: yup.string().max(120).required(),
  location: yup
    .object()
    .shape({
      id: yup.string().required(),
      name: yup.string().required()
    })
    .required(),
  isActive: yup.boolean()
})
export type formShiftSchemaType = yup.InferType<typeof FormShiftSchema>
