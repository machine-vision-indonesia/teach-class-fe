// DateSection.tsx
import React from 'react'
import { Stack, RadioGroup, FormControlLabel, FormControl, Box, useTheme } from '@mui/material'
import { MvTypography } from '@/components/atoms/mv-typography'
import { CustomRadioIcon, CustomRadioCheckedIcon } from '../style/radio.style'
import { DateTimePicker } from '@/components/molecules/date-time-picker'
import { DateSectionProps } from '../types/dateSection.types'
import { Radio } from '@/components/atoms/radio'

export const DateSection = ({
  title,
  date,
  selectedOption,
  onDateChange,
  onOptionChange,
  isdisable,
  direction = 'column'
}: DateSectionProps) => {
  const theme = useTheme()

  return (
    <Stack spacing={2}>
      <Box sx={{ display: 'flex', alignItems: 'center', my: 2 }} columnGap={2}>
        <Box width={'100%'} sx={{ height: '1px', bgcolor: theme.colorToken.background.neutral.subtle }} />
        <MvTypography
          size='BODY_LG_BOLDEST'
          typeSize='PX'
          sx={{
            textWrap: 'nowrap !important'
          }}
        >
          {title}
        </MvTypography>
        <Box
          width={'100%'}
          sx={{
            height: '1px',
            bgcolor: theme.colorToken.background.neutral.subtle
          }}
        />
      </Box>
      <Stack alignItems={'start'} direction={direction} spacing={'12px'}>
        <FormControl component='fieldset' disabled={isdisable}>
          <RadioGroup aria-label='options' name={`${title}-options`} value={selectedOption} onChange={onOptionChange}>
            <Radio value='option1' disabled={isdisable} label='Confirm Date' onChange={onOptionChange} />
            <Radio value='option2' disabled={isdisable} label='Recommendation Date' onChange={onOptionChange} />
          </RadioGroup>
        </FormControl>
        <Stack>
          <MvTypography size='BODY_LG_BOLDEST' typeSize='PX' sx={{ mb: 1 }}>
            Date
          </MvTypography>
          <DateTimePicker type='datePicker' value={date} onChange={onDateChange} disabled={isdisable} />
        </Stack>
      </Stack>
    </Stack>
  )
}
