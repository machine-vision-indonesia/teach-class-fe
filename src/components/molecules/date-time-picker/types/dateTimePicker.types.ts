import { DatePickerProps } from '@mui/x-date-pickers'

export interface PropsDateTimePicker extends DatePickerProps<Date> {
  type?: 'datePicker' | 'dateTimePicker' | 'monthYearPicker' | 'timePicker' | 'yearPicker'
  size?: 'small' | 'medium' | 'large'
  variant?: 'static' | 'default'
  highlightedDays?: Date[]
  highlightColor?: 'danger' | 'warning' | 'primary' | 'success' | 'info'
}
