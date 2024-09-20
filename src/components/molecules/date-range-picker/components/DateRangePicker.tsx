import { Box, IconButton, Stack, useTheme } from '@mui/material'
import { format } from 'date-fns'
import { PropsDateRangePicker } from '../types/dateRangePicker.types'
import { Icon } from '@iconify/react'
import { useEffect, useState } from 'react'
import DatePicker from 'react-datepicker'
import DateRangePickerWrapper from '../styles/dateRangePicker.style'
import { MvTypography } from '@/components/atoms/mv-typography'
import { CustomInput } from '../utils'

/**
 * Elemen antarmuka pengguna yang memungkinkan pengguna untuk memilih rentang tanggal dari kalender interaktif.
 * Elemen UI ini digunakan dalam berbagai aplikasi web dan mobile terutama dalam aplikasi yang memerlukan input tanggal, seperti aplikasi pemesanan, pelaporan, dan manajemen proyek.
 * Untuk memudahkan pengguna dalam memasukkan tanggal tanpa perlu mengetikkannya secara manual.
 */
export const DateRangePicker = ({
  startDate: propStartDate,
  endDate: propEndDate,
  onChange,
  disabled = false,
  variant = 'default',
  onFocus,
  onBlur,
  value
}: PropsDateRangePicker) => {
  const theme = useTheme()

  const [startDate, setStartDate] = useState<Date | null | undefined>(null)
  const [endDate, setEndDate] = useState<Date | null | undefined>(null)

  const handleOnChange = (dates: any) => {
    const [start, end] = dates

    setStartDate(start)
    setEndDate(end)

    if (onChange) {
      onChange(start, end)
    }
  }

  useEffect(() => {
    if (propStartDate !== undefined) {
      setStartDate(propStartDate)
    } else {
      setStartDate(null)
    }
  }, [propStartDate])

  useEffect(() => {
    if (propEndDate !== undefined) {
      setEndDate(propEndDate)
    } else {
      setEndDate(null)
    }
  }, [propEndDate])

  return (
    <Box minWidth={280}>
      <DateRangePickerWrapper>
        <DatePicker
          formatWeekDay={(day: string) => day.substr(0, 1)}
          disabled={disabled}
          placeholderText='DD/MM/YYYY - DD/MM/YYYY'
          dateFormat='dd/MM/yyyy'
          renderCustomHeader={({ date, decreaseYear, decreaseMonth, increaseMonth, increaseYear }) => (
            <Box
              display='flex'
              justifyContent='space-between'
              alignItems='center'
              sx={{
                paddingX: 2,
                paddingBottom: 2,
                borderBottom: `1px solid ${theme.colorToken.border.neutral.normal}`,
                marginBottom: 4
              }}
            >
              <Stack spacing={0} direction='row'>
                <IconButton onClick={decreaseYear} title='Previous year'>
                  <Icon width={18} height={18} icon='tabler:chevrons-left' />
                </IconButton>
                <IconButton onClick={decreaseMonth} title='Previous month'>
                  <Icon width={18} height={18} icon='tabler:chevron-left' />
                </IconButton>
              </Stack>
              <MvTypography typeSize={'PX'} size={'BODY_MD_BOLDEST'}>
                {format(date, 'MMMM yyyy')}
              </MvTypography>
              <Stack spacing={0} direction='row'>
                <IconButton onClick={increaseMonth} title='Next month'>
                  <Icon width={18} height={18} icon='tabler:chevron-right' />
                </IconButton>
                <IconButton onClick={increaseYear} title='Next year'>
                  <Icon width={18} height={18} icon='tabler:chevrons-right' />
                </IconButton>
              </Stack>
            </Box>
          )}
          popperPlacement='bottom-start'
          selectsRange
          monthsShown={1}
          endDate={endDate as Date | undefined}
          startDate={startDate as Date | undefined}
          onChange={handleOnChange}
          shouldCloseOnSelect={false}
          customInput={<CustomInput start={startDate as Date | number} end={endDate as Date | number} />}
          inline={variant === 'static' && !disabled}
          onFocus={onFocus}
          onBlur={onBlur}
          value={value}
        />
      </DateRangePickerWrapper>
    </Box>
  )
}
