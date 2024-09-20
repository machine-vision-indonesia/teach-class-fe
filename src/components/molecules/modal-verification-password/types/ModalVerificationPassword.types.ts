import { Dispatch, SetStateAction } from 'react'
import * as yup from 'yup'
import { schema } from '../validation'

export interface IModalVerification {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  onSubmit?: (data: any) => void
  passwordError?: string
  isLoading?: boolean
}

export interface IPropsPassword {
  password: string
}

export type Schema = yup.InferType<typeof schema>
