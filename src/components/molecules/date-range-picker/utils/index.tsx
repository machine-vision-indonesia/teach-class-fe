import { TextField, IconButton, ThemeProvider, useTheme } from '@mui/material'
import { format } from 'date-fns'
import { forwardRef } from 'react'
import { CustomInputProps } from '../types/dateRangePicker.types'
import { Icon } from '@iconify/react/dist/iconify.js'

export const CustomInput = forwardRef((props: CustomInputProps, ref) => {
  const { label, start, end, ...rest } = props

  const startDate = start !== null ? format(start, 'dd/MM/yyyy') : null
  const endDate = end !== null ? ` - ${format(end, 'dd/MM/yyyy')}` : null

  const value = `${startDate !== null ? startDate : ''}${endDate !== null ? endDate : ''}`

  return (
    <ThemeProvider theme={useTheme()}>
      <TextField
        size='small'
        fullWidth
        inputRef={ref}
        {...rest}
        label={label}
        value={value}
        sx={{
          borderRadius: '8px',
          borderWidth: '0px',
          borderColor: useTheme().colorToken.border.neutral?.bold,
          borderStyle: 'solid',
          outline: 'none',
          '&:hover': {
            borderColor: useTheme().colorToken.border.primary.normal
          }
        }}
        InputProps={{
          endAdornment: (
            <IconButton edge='end'>
              <Icon fontSize='20px' icon='tabler:calendar' color={useTheme().colorToken.icon.neutral.boldest} />
            </IconButton>
          )
        }}
      />
    </ThemeProvider>
  )
})
