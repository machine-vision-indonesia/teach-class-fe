import * as yup from 'yup'

export const schemaAddUser = yup.object().shape({
  email: yup.string().email().required('Email is a required field').min(1).default(''),
  password: yup.string().required('Password is a required field').min(1).default(''),
  confirm_password: yup
    .string()
    .required('Confirm Password is a required field')
    .oneOf([yup.ref('password')], 'Passwords must match')
    .default(''),
  roles: yup
    .array()
    .of(
      yup.object().shape({
        id: yup.string().required(),
        label: yup.string().required()
      })
    )
    .required('Roles is a required field')
    .min(1, 'Roles is a required field')
    .default([]),
  work_center: yup
    .object()
    .shape({
      id: yup.string().required(),
      label: yup.string().required()
    })
    .required('Work Center is a required field')
    .default(null),
  department: yup
    .object()
    .shape({
      id: yup.string().required(),
      label: yup.string().required()
    })
    .required('Department is a required field')
    .default(null),
  job_function: yup
    .object()
    .shape({
      id: yup.string().required(),
      label: yup.string().required(),
      job_level: yup.object().shape({
        name: yup.string().required()
      })
    })
    .required('Job Function is a required field')
    .default(null),
  job_level: yup.string().required('Job Level is a required field').default(''),
  job_title: yup.string().required('Job Title is a required field').default(''),
  id_number: yup.string().required('ID Number is a required field').default(''),
  first_name: yup.string().required('First Name is a required field').default(''),
  last_name: yup.string().required('Last Name is a required field').default(''),
  gender: yup
    .object()
    .shape({
      id: yup.string().required(),
      label: yup.string().required()
    })
    .required('Gender is a required field')
    .default(null),
  religion: yup
    .object()
    .shape({
      id: yup.string().required(),
      label: yup.string().required()
    })
    .required('Religion is a required field')
    .default(null),
  address: yup.string().required('Address is a required field').default(null),
  phone: yup.string().required('Phone is a required field').default(null),
  post_code: yup.string().required('Postal Code is a required field').default(null),
  photo: yup
    .mixed<File>()
    .test('file', 'Invalid file type', value => !value || value instanceof File)
    .nullable()
    .default(null),
  cover: yup
    .mixed<File>()
    .test('file', 'Invalid file type', value => !value || value instanceof File)
    .nullable()
    .default(null)
})

export const schemaPersonalData = yup.object().shape({
  id_number: yup.string().required('ID Number is a required field').default(''),
  email: yup.string().email().required('Email is a required field').min(1).default(''),
  first_name: yup.string().required('First Name is a required field').default(''),
  last_name: yup.string().required('Last Name is a required field').default(''),
  gender: yup
    .object()
    .shape({
      id: yup.string().required(),
      label: yup.string().required()
    })
    .required('Gender is a required field')
    .default(null),
  religion: yup
    .object()
    .shape({
      id: yup.string().required(),
      label: yup.string().required()
    })
    .required('Religion is a required field')
    .default(null)
})

export const schemaAuthField = yup.object().shape({
  email: yup.string().email().required('Email is a required field').min(1).default(''),
  roles: yup
    .array()
    .of(
      yup.object().shape({
        id: yup.string().required(),
        label: yup.string().required()
      })
    )
    .required('Roles is a required field')
    .min(1, 'Roles is a required field')
    .default([]),
  work_center: yup
    .object()
    .shape({
      id: yup.string().required(),
      label: yup.string().required()
    })
    .required('Work Center is a required field')
    .default(null),
  department: yup
    .object()
    .shape({
      id: yup.string().required(),
      label: yup.string().required()
    })
    .required('Department is a required field')
    .default(null),
  job_function: yup
    .object()
    .shape({
      id: yup.string().required(),
      label: yup.string().required(),
      job_level: yup.object().shape({
        name: yup.string().required()
      })
    })
    .required('Job Function is a required field')
    .default(null),
  job_level: yup.string().required('Job Level is a required field').default(''),
  job_title: yup.string().required('Job Title is a required field').default('')
})

export const schemaAddressContact = yup.object().shape({
  address: yup.string().required('Address is a required field').default(null),
  phone: yup.string().required('Phone is a required field').default(null),
  post_code: yup.string().required('Postal Code is a required field').default(null)
})


export const schemaFile = yup.object().shape({
 file: yup
    .mixed<File>()
    .test('file', 'Invalid file type', value => !value || value instanceof File)
    .nullable()
    .default(null),

})
