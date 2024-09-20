import * as yup from 'yup'

export const schemaStep1 = yup.object().shape({
  transferDateSceduled: yup.date().required(),
  driver: yup.string(),
  vehicle: yup.string().required(),
  vehicleNumber: yup.string()
})

export const schemaStep2 = yup.object().shape({
  driverName: yup.string().required(),
  roadLetterNumber: yup.string().required(),
  vehicle: yup.object().shape({ id: yup.string().required() }).required(),
  vehicleRegistrationNumber: yup.string().required(),
  containerFront: yup.string().required(),
  containerBack: yup.string().required(),
  containerRight: yup.string().required(),
  containerLeft: yup.string().required()
})

export const schemaStep4 = yup.object().shape({
  travelDocument: yup.string().required(),
  msds: yup.string(),
  coa: yup.string()
})
