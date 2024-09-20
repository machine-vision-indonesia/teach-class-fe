import * as yup from 'yup'

export const schemaMDVehicle = yup.object().shape({
  code: yup.string(),
  vehicle_name: yup.string().required('Vehicle Name is a required field'),
  description: yup.string(),
  is_active: yup.boolean().default(true)
})

export type SchemaMDVehicle = yup.InferType<typeof schemaMDVehicle>
