import React from 'react'
import { TextFieldProps } from '@mui/material'
import { DatePickerProps } from 'react-datepicker'

export type CustomInputProps = TextFieldProps & {
  end: Date | number
  start: Date | number
}

export interface PropsDateRangePicker {
  onChange?: (start: Date | null, end: Date | null) => void
  startDate?: DatePickerProps['selected']
  endDate?: DatePickerProps['selected']
  disabled?: boolean
  variant?: 'static' | 'default'
  onFocus?: React.FocusEventHandler<HTMLElement>
  onBlur?: React.FocusEventHandler<HTMLElement>
  value?: string
}
