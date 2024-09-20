import * as yup from 'yup'

export const remarkSchema = yup.object().shape({
  remark: yup.string().required('This field is required.').min(1).default('')
})
