import { PickersCalendarHeaderProps, PickersActionBarProps } from '@mui/x-date-pickers'
import { addMonths, addYears, subMonths, subYears, format } from 'date-fns'
import { CustomCalendarHeaderRoot } from '../styles/dateTimePicker.style'
import { Box, Button, IconButton, Stack, ThemeProvider, useTheme } from '@mui/material'
import { MvTypography } from '@/components/atoms/mv-typography'
import { Icon } from '@iconify/react/dist/iconify.js'
import { useState } from 'react'

export function CustomCalendarHeaderDateTime(props: PickersCalendarHeaderProps<Date>) {
  const { currentMonth, onMonthChange } = props

  const selectNextMonth = () => onMonthChange(addMonths(currentMonth, 1), 'left')
  const selectNextYear = () => onMonthChange(addYears(currentMonth, 1), 'left')
  const selectPreviousMonth = () => onMonthChange(subMonths(currentMonth, 1), 'right')
  const selectPreviousYear = () => onMonthChange(subYears(currentMonth, 1), 'right')

  return (
    <ThemeProvider theme={useTheme()}>
      <CustomCalendarHeaderRoot
        sx={{
          borderBottom: `1px solid ${useTheme().colorToken.border.neutral.normal}`
        }}
      >
        <Stack spacing={0} direction='row'>
          <IconButton onClick={selectPreviousYear} title='Previous year'>
            <Icon width={18} height={18} icon='tabler:chevrons-left' />
          </IconButton>
          <IconButton onClick={selectPreviousMonth} title='Previous month'>
            <Icon width={18} height={18} icon='tabler:chevron-left' />
          </IconButton>
        </Stack>
        <MvTypography typeSize={'PX'} size={'BODY_MD_BOLDEST'}>
          {format(currentMonth, 'MMMM yyyy')}
        </MvTypography>
        <Stack spacing={0} direction='row'>
          <IconButton onClick={selectNextMonth} title='Next month'>
            <Icon width={18} height={18} icon='tabler:chevron-right' />
          </IconButton>
          <IconButton onClick={selectNextYear} title='Next year'>
            <Icon width={18} height={18} icon='tabler:chevrons-right' />
          </IconButton>
        </Stack>
      </CustomCalendarHeaderRoot>
    </ThemeProvider>
  )
}

export function CustomCalendarHeaderMonthYear(props: PickersCalendarHeaderProps<Date>) {
  const { currentMonth, onMonthChange } = props

  const selectNextYear = () => onMonthChange(addYears(currentMonth, 1), 'left')
  const selectPreviousYear = () => onMonthChange(subYears(currentMonth, 1), 'right')

  return (
    <ThemeProvider theme={useTheme()}>
      <CustomCalendarHeaderRoot
        sx={{
          borderBottom: `1px solid ${useTheme().colorToken.border.neutral.normal}`
        }}
      >
        <Stack spacing={0} direction='row'>
          <IconButton onClick={selectPreviousYear} title='Previous year'>
            <Icon width={18} height={18} icon='tabler:chevrons-left' />
          </IconButton>
        </Stack>
        <MvTypography typeSize='PX' size='BODY_MD_BOLDEST'>
          {format(currentMonth, 'yyyy')}
        </MvTypography>
        <Stack spacing={0} direction='row'>
          <IconButton onClick={selectNextYear} title='Next year'>
            <Icon width={18} height={18} icon='tabler:chevrons-right' />
          </IconButton>
        </Stack>
      </CustomCalendarHeaderRoot>
    </ThemeProvider>
  )
}

export function CustomActionBar(props: PickersActionBarProps) {
  const { onAccept, onClear, onCancel, onSetToday, actions, className } = props
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)

  if (actions == null || actions.length === 0) {
    return null
  }

  const menuItems = actions?.map(actionType => {
    switch (actionType) {
      case 'clear':
        return (
          <Button
            data-mui-test='clear-action-button'
            onClick={() => {
              onClear()
              setAnchorEl(null)
            }}
            key={actionType}
          >
            Clear
          </Button>
        )
      case 'cancel':
        return (
          <Button
            onClick={() => {
              setAnchorEl(null)
              onCancel()
            }}
            key={actionType}
          >
            Cancel
          </Button>
        )
      case 'accept':
        return (
          <Button
            onClick={() => {
              setAnchorEl(null)
              onAccept()
            }}
            key={actionType}
            variant='contained'
            color='primary'
            sx={{
              borderRadius: '8px',
              paddingX: 8
            }}
          >
            Apply
          </Button>
        )
      case 'today':
        return (
          <Button
            data-mui-test='today-action-button'
            onClick={() => {
              setAnchorEl(null)
              onSetToday()
            }}
            key={actionType}
          >
            Now
          </Button>
        )
      default:
        return null
    }
  })

  return (
    <Box width='100%' display='flex' padding={2} gap={2} justifyContent='end' className={className}>
      {menuItems}
    </Box>
  )
}

export function renderDateTimeIcon() {
  return <Icon icon='tabler:calendar-time' width={20} height={20} />
}

export function renderDateIcon() {
  return <Icon icon='tabler:calendar' width={20} height={20} />
}

export function renderTimeIcon() {
  return <Icon icon='tabler:clock' width={20} height={20} />
}
