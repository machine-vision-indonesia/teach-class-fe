import { ReactNode } from 'react'

export interface FieldProps {
  isRequired?: boolean
  isCustomHelperText?: boolean
  error?: boolean
  label?: string
  name?: string
  helperText?: string
  size?: 'small' | 'medium' | 'large'
  children?: ReactNode
  [key: string]: any
}

export interface FieldLabelProps {
  fontWeight?: 'bolder' | 'normal'
}

export interface FieldInputControllerProps {
  controller: any
  errors: any
}
