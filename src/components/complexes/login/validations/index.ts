import * as yup from 'yup'

export const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required()
})


export const changePasswordSchema = yup.object().shape({
  password: yup.string().required().default(''),
  confirmPassword: yup
    .string()
    .required()
    .test('passwords-match', 'Passwords must match', function (value) {
      return this.parent.password === value
    })
    .default('')
})
