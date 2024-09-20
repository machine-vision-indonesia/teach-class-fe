// ** MUI imports
import { styled, useTheme } from '@mui/material/styles'
import Box, { BoxProps } from '@mui/material/Box'

const CalendarWrapper = styled(Box)<BoxProps>(({}) => {
  const theme = useTheme()
  return {
    '& .fc': {
      '--fc-border-color': theme.colorToken.border.neutral.normal
    },
    '& .fc-theme-standard': {
      '& .fc-scrollgrid': {
        borderBottomLeftRadius: '6px',
        borderBottomRightRadius: '6px'
      }
    },
    '& .fc-theme-standard td': {
      borderBottomRightRadius: '6px',
      borderBottomLeftRadius: '6px'
    },
    '& .centered-date': {
      '& .fc-daygrid-day-top': {
        display: 'flex',
        justifyContent: 'center'
      }
    },
    '& .fc-event': {
      border: 'none',
      backgroundColor: 'transparent',
      padding: 3,
      display: 'block'
    },
    '& .fc-more-popover-misc': {
      display: 'none'
    },
    '& .fc .fc-daygrid-day.fc-day-today': {
      backgroundColor: 'transparent'
    },
    '& .fc-day-today': {
      background: `${theme.colorToken.background.default} !important`,
      border: 'none !important'
    }
  }
})

export default CalendarWrapper
