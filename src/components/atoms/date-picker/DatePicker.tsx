import { Icon } from '@iconify/react'
import TextField from '@mui/material/TextField'
import ReactDatePicker, { type ReactDatePickerProps } from 'react-datepicker'
import DatePickerWrapper from '../../../@core/styles/libs/react-datepicker'
import { useTheme } from '@mui/material'

interface PropsDatePicker {
  selected?: ReactDatePickerProps['selected']
  onChange?: (date: Date | null) => void
  placeholder?: string
  readonly?: boolean
  variant?: 'datepicker' | 'monthpicker' | 'timepicker'
  noWrapper?: boolean
}

export const DatePicker = ({
  selected,
  onChange,
  placeholder,
  readonly,
  variant,
  noWrapper = false
}: PropsDatePicker) => {
  const { palette } = useTheme()
  const variantUsed = variant ?? 'datepicker'

  const getFormat = () => {
    let format = 'dd/MM/yyyy'
    switch (variantUsed) {
      case 'monthpicker':
        format = 'MM'
        break

      case 'timepicker':
        format = 'h:mm aa'
        break

      default:
        break
    }

    return format
  }

  const renderDatePicker = (
    <ReactDatePicker
      showYearDropdown={!variant || variant == 'datepicker'}
      showMonthDropdown={!variant || variant == 'datepicker'}
      showMonthYearPicker={variant == 'monthpicker'}
      timeIntervals={15}
      showTimeSelectOnly={variant == 'timepicker'}
      showTimeSelect={variant == 'timepicker'}
      selected={selected}
      popperPlacement='bottom-start'
      onChange={date => onChange?.(date)}
      placeholderText={placeholder}
      customInput={
        <TextField
          placeholder={placeholder}
          variant='outlined'
          size='small'
          InputProps={{
            readOnly: readonly,
            endAdornment: (
              <Icon
                fontSize='20px'
                icon={variant == 'timepicker' ? 'ic:baseline-access-time' : 'material-symbols:date-range-outline'}
                color={palette.text.disabled}
              />
            )
          }}
        />
      }
      dateFormat={getFormat()}
    />
  )

  return noWrapper ? renderDatePicker : <DatePickerWrapper>{renderDatePicker}</DatePickerWrapper>
}
