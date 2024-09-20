import { AutocompleteProps } from '@mui/material'
import { SetStateAction } from 'react'

export type PropsSelect<T> = Omit<
  AutocompleteProps<T, boolean, boolean, boolean>,
  'onChange' | 'renderInput' | 'renderTags' | 'options'
> & {
  data: T[]
  selected?: T[] | T
  iconKey?: string
  labelKey: string
  valueKey: string
  variant?: 'default' | 'multiple'
  onChange?: (data: T[] | T) => void
  placeholder?: string
  helperText?: string
  disabled?: boolean
  error?: string
  readOnly?: boolean
  size?: 'small' | 'medium' | 'large'
  labelId?: string
  options?: T[]
  limitTags?: number
  setSelected?: (val?: any) => SetStateAction<T | T[]>
}
