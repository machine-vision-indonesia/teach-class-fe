import { Box, useTheme } from '@mui/material'
import { PropsDateTimePicker } from '../types/dateTimePicker.types'
import { DateTimePicker as MuiDateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import { DatePicker as MuiDatePicker } from '@mui/x-date-pickers/DatePicker'
import { TimePicker as MuiTimePicker } from '@mui/x-date-pickers/TimePicker'
import { PickersDay, PickersDayProps } from '@mui/x-date-pickers'
import { StyledTextField } from '../styles/dateTimePicker.style'
import {
  CustomActionBar,
  CustomCalendarHeaderDateTime,
  CustomCalendarHeaderMonthYear,
  renderDateIcon,
  renderDateTimeIcon,
  renderTimeIcon
} from '../utils'
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar'
import { MultiSectionDigitalClock } from '@mui/x-date-pickers/MultiSectionDigitalClock'
import { ActionsBar, FieldViews } from '../constants'

/**
 * Elemen antarmuka pengguna yang memungkinkan pengguna untuk memilih tanggal dan waktu dari kalender dan jam interaktif yang muncul di layar.
 * Elemen UI ini digunakan dalam berbagai aplikasi web dan mobile untuk memudahkan pengguna dalam memasukkan tanggal dan waktu, tanpa perlu mengetikkannya secara manual.
 */
export const DateTimePicker = ({
  type = 'dateTimePicker',
  size,
  variant = 'default',
  highlightedDays = [],
  highlightColor = 'primary',
  ...props
}: PropsDateTimePicker) => {
  const theme = useTheme()

  function ServerDay(props: PickersDayProps<Date> & { highlightedDays?: Date[] }) {
    const { highlightedDays = [], day, outsideCurrentMonth, ...other } = props

    const highlightCount = highlightedDays.filter(
      highlightedDay =>
        highlightedDay.getDate() === day.getDate() &&
        highlightedDay.getMonth() === day.getMonth() &&
        highlightedDay.getFullYear() === day.getFullYear()
    ).length

    const isSelected = highlightCount > 0

    return (
      <Box key={props.day.toString()} display='flex' flexDirection='column' alignItems='center' gap={0}>
        <PickersDay {...other} outsideCurrentMonth={outsideCurrentMonth} day={day} />
        {isSelected && (
          <Box display='flex' justifyContent='center' gap={0.8}>
            {Array.from({ length: highlightCount > 5 ? 5 : highlightCount }).map((_, index) => (
              <Box
                key={index}
                bgcolor={theme.colorToken.background[highlightColor].normal}
                borderRadius='100%'
                width={highlightCount > 1 ? 4 : 6}
                height={highlightCount > 1 ? 4 : 6}
                sx={{
                  marginTop: '-10px'
                }}
              />
            ))}
          </Box>
        )}
      </Box>
    )
  }

  if (type === 'dateTimePicker') {
    return (
      <MuiDateTimePicker
        views={[
          FieldViews.YEAR,
          FieldViews.MONTH,
          FieldViews.DAY,
          FieldViews.HOURS,
          FieldViews.MINUTES,
          FieldViews.SECONDS
        ]}
        format='dd/MM/yyyy HH:mm:ss'
        slots={{
          actionBar: CustomActionBar,
          calendarHeader: CustomCalendarHeaderDateTime,
          textField: StyledTextField,
          openPickerIcon: renderDateTimeIcon,
          day: ServerDay
        }}
        slotProps={{
          actionBar: {
            actions: [ActionsBar.TODAY, ActionsBar.ACCEPT]
          },
          layout: {
            sx: {
              borderRadius: '6px',
              borderWidth: '1px',
              borderColor: theme.colorToken.border.neutral.normal,
              borderStyle: 'solid',
              '& .MuiButtonBase-root.MuiPickersDay-root.MuiPickersDay-dayWithMargin.MuiPickersDay-today': {
                borderRadius: '100px',
                borderWidth: '1px',
                borderColor: theme.colorToken.border.primary.normal,
                borderStyle: 'solid',
                color: theme.colorToken.text.primary.normal,
                outline: 'none'
              }
            }
          },
          day: {
            highlightedDays
          } as any,
          textField: {
            size: 'small'
          }
        }}
        timeSteps={{
          minutes: 1,
          seconds: 1
        }}
        ampm={false}
        onChange={props.onChange}
        value={props.value}
      />
    )
  }

  if (type === 'datePicker') {
    if (variant === 'static') {
      return (
        <Box display={'inline-flex'}>
          <DateCalendar
            slots={{
              calendarHeader: CustomCalendarHeaderDateTime,
              day: ServerDay
            }}
            slotProps={{
              day: {
                highlightedDays
              } as any
            }}
            {...props.onChange}
            {...props.value}
          />
        </Box>
      )
    } else {
      return (
        <MuiDatePicker
          format='dd/MM/yyyy'
          slots={{
            calendarHeader: CustomCalendarHeaderDateTime,
            textField: StyledTextField,
            openPickerIcon: renderDateIcon,
            day: ServerDay
          }}
          slotProps={{
            day: {
              highlightedDays
            } as any,
            layout: {
              sx: {
                '& .MuiButtonBase-root.MuiPickersDay-root.MuiPickersDay-dayWithMargin.MuiPickersDay-today': {
                  borderRadius: '100px',
                  borderWidth: '1px',
                  borderColor: theme.colorToken.border.primary.normal,
                  borderStyle: 'solid',
                  color: theme.colorToken.text.primary.normal,
                  outline: 'none'
                }
              }
            },
            textField: { size: 'small' }
          }}
          {...props}
        />
      )
    }
  }

  if (type === 'timePicker') {
    if (variant === 'static') {
      return (
        <Box display={'inline-flex'}>
          <MultiSectionDigitalClock
            views={[FieldViews.HOURS, FieldViews.MINUTES, FieldViews.SECONDS]}
            ampm={false}
            timeSteps={{
              minutes: 1,
              seconds: 1
            }}
            sx={{
              outline: 'none !important',
              border: 'none !important',
              boxSizing: 'unset !important',
              '& .MuiMultiSectionDigitalClock-root': {
                outline: 'none !important',
                border: 'none !important',
                boxSizing: 'unset !important',
                '& MuiList-root MuiList-padding MuiMultiSectionDigitalClockSection-root css-1ygq5p9-MuiList-root-MuiMultiSectionDigitalClockSection-root':
                  {
                    outline: 'none !important',
                    border: 'none !important'
                  }
              }
            }}
            {...props.onChange}
            {...props.value}
          />
        </Box>
      )
    } else {
      return (
        <MuiTimePicker
          views={[FieldViews.HOURS, FieldViews.MINUTES, FieldViews.SECONDS]}
          slots={{ actionBar: CustomActionBar, textField: StyledTextField, openPickerIcon: renderTimeIcon }}
          slotProps={{
            actionBar: {
              actions: [ActionsBar.TODAY, ActionsBar.ACCEPT]
            },
            textField: { size: 'small' }
          }}
          ampm={false}
          timeSteps={{
            minutes: 1,
            seconds: 1
          }}
          onChange={props.onChange}
          value={props.value}
        />
      )
    }
  }

  if (type === 'yearPicker') {
    if (variant === 'static') {
      return (
        <Box display={'inline-flex'}>
          <DateCalendar views={[FieldViews.YEAR]} {...props.onChange} {...props.value} />
        </Box>
      )
    } else {
      return (
        <MuiDatePicker
          format='yyyy'
          views={[FieldViews.YEAR]}
          slots={{
            textField: StyledTextField,
            openPickerIcon: renderDateIcon
          }}
          slotProps={{
            textField: { size: 'small' }
          }}
          {...props}
        />
      )
    }
  }

  if (type === 'monthYearPicker') {
    if (variant === 'static') {
      return (
        <Box display={'inline-flex'}>
          <DateCalendar
            views={[FieldViews.MONTH, FieldViews.YEAR]}
            slots={{
              calendarHeader: CustomCalendarHeaderMonthYear
            }}
            {...props.onChange}
            {...props.value}
          />
        </Box>
      )
    } else {
      return (
        <MuiDatePicker
          format='MM/yyyy'
          views={[FieldViews.MONTH, FieldViews.YEAR]}
          slots={{
            calendarHeader: CustomCalendarHeaderMonthYear,
            textField: StyledTextField,
            openPickerIcon: renderDateIcon
          }}
          slotProps={{
            textField: { size: 'small' }
          }}
          {...props}
        />
      )
    }
  }

  return <></>
}
