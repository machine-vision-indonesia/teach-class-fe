import { Icon } from '@iconify/react'
import TextField from '@mui/material/TextField'
import React from 'react'
import DatePicker, { ReactDatePickerProps } from 'react-datepicker'
import DatePickerWrapper from '../../../@core/styles/libs/react-datepicker'
import { useTheme } from '@mui/material'
import format from 'date-fns/format'

interface PropsDatePicker {
  startDate?: ReactDatePickerProps['selected']
  endDate?: ReactDatePickerProps['selected']
  onChange?: (start: Date | null, end: Date | null) => void
  placeholder?: string
  readonly?: boolean
  variant?: 'single-month' | 'double-month'
  noWrapper?: boolean
}

export const DateRangePicker = ({
  startDate,
  onChange,
  placeholder,
  readonly,
  variant,
  endDate,
  noWrapper = false
}: PropsDatePicker) => {
  const { palette } = useTheme()
  const variantUsed = variant ?? 'single-month'

  const handleOnChange = (dates: any) => {
    const [start, end] = dates
    onChange?.(start, end)
  }

  const startDateText = startDate !== null ? format(startDate as Date | number, 'dd/MM/yyyy') : null
  const endDateText = endDate !== null ? `- ${format(endDate as Date | number, 'dd/MM/yyyy')}` : null

  const value = `${startDateText}${endDateText !== null ? endDateText : ''}`

  const renderDatePicker = (
    <DatePicker
      selectsRange
      monthsShown={variantUsed == 'double-month' ? 2 : 1}
      endDate={endDate}
      selected={startDate}
      startDate={startDate}
      popperPlacement='bottom-start'
      onChange={handleOnChange}
      placeholderText={placeholder}
      shouldCloseOnSelect={false}
      customInput={
        <TextField
          placeholder={placeholder}
          variant='outlined'
          size='small'
          value={value}
          InputProps={{
            readOnly: readonly,
            endAdornment: (
              <Icon fontSize='20px' icon={'material-symbols:date-range-outline'} color={palette.text.disabled} />
            )
          }}
        />
      }
    />
  )

  return noWrapper ? renderDatePicker : <DatePickerWrapper>{renderDatePicker}</DatePickerWrapper>
}
