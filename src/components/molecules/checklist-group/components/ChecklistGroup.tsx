import { MvTypography } from '@/components/atoms/mv-typography'
import { Box, Stack, useTheme } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { ChecklistRequest } from '@/components/molecules/checklist-request'
import { ChecklistGroupProps, IChecklistGroupValues } from '../types/checklistGroup.types'
import { ChecklistRequestProps } from '../../checklist-request/types/checklistRequest.types'

export const ChecklistGroup: React.FC<ChecklistGroupProps> = ({
  title = 'Label',
  checklistRequests = [
    <ChecklistRequest
      title='Sample Label'
      options={[
        {
          id: '1',
          label: 'Label 1'
        },
        {
          id: '2',
          label: 'Label 2'
        },
        {
          id: '3',
          label: 'Label 3'
        },
        {
          id: '4',
          label: 'Label 4'
        }
      ]}
      valueKey='id'
      labelKey='label'
      value={[]}
    />
  ],
  onChange = () => {},
  disabled = false
}) => {
  const theme = useTheme()
  const [values, setValues] = useState<IChecklistGroupValues>({})

  useEffect(() => {
    onChange(values)
  }, [values])

  return (
    <Box
      borderRadius={'6px'}
      display={'flex'}
      flexDirection={'column'}
      sx={{
        border: `1px solid ${theme.colorToken.border.neutral.normal}`
      }}
    >
      <Box padding={'12px'} sx={{ borderBottom: `1px solid ${theme.colorToken.border.neutral.normal}` }}>
        <MvTypography typeSize={'PX'} size={'LABEL_LG_BOLDEST'}>
          {title}
        </MvTypography>
      </Box>
      <Stack sx={{ padding: '16px 18px' }} rowGap={'12px'}>
        {checklistRequests &&
          Array.isArray(checklistRequests) &&
          checklistRequests.map((request, index) => (
            <React.Fragment key={index}>
              {React.cloneElement<ChecklistRequestProps>(request, {
                onChange: (value: any) => {
                  setValues(prevValues => {
                    return {
                      ...prevValues,
                      ...value
                    }
                  })
                },
                disabled: disabled
              })}
            </React.Fragment>
          ))}
      </Stack>
    </Box>
  )
}
