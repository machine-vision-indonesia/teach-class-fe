import React from 'react'
import { Box, Stack, useTheme } from '@mui/material'

import { MvTypography } from '@/components/atoms/mv-typography'

import { ICalendarLegendProps } from '../types/calendar.types'

const CalendarLegend = ({ legends }: ICalendarLegendProps) => {
  const theme = useTheme()

  return (
    <>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          gap: '16px',
          padding: '16px',
          borderRadius: '6px',
          border: `1px solid ${theme.colorToken.border.neutral.normal}`
        }}
      >
        <MvTypography typeSize={'PX'} size={'BODY_MD_BOLDEST'}>
          Status Legend
        </MvTypography>
        <Stack
          sx={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            gap: '16px',
            width: '100%',
            flexWrap: 'wrap'
          }}
        >
          {legends.map((legend, index) => (
            <Stack
              key={index}
              sx={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <Box
                sx={{
                  borderRadius: '100px',
                  bgcolor: legend.color,
                  width: '20px',
                  height: '20px'
                }}
              />
              <MvTypography typeSize={'PX'} size={'LABEL_MD_NORMAL'}>
                {legend.label}
              </MvTypography>
            </Stack>
          ))}
        </Stack>
      </Box>
    </>
  )
}

export default CalendarLegend
