import React from 'react'
import { Box, Grid, Stack, TextField, useTheme } from '@mui/material'
import { Icon } from '@iconify/react/dist/iconify.js'
import DatePickerWrapper from '@/@core/styles/libs/react-datepicker'
import ReactDatePicker from 'react-datepicker'

import { MvTypography } from '@/components/atoms/mv-typography'
import { Select } from '@/components/atoms'

import { DeliveryPlanStatus } from '@/modules/dms/common/constants'
import { Field } from '@/components/molecules/field'
import { formatDateString } from '@/modules/dms/common/utils'

// TODO: Complete the props type
interface ISelectedlocation {
  id: string
  label: string
}

interface IDeliveryPlanInformationProps {
  status: DeliveryPlanStatus
  delivData: any
  onLocationChange?: (location: ISelectedlocation) => void
  onDateScheduleChange?: (date: Date) => void
}

export const DeliveryPlanInformation = ({
  status,
  delivData,
  onLocationChange,
  onDateScheduleChange
}: IDeliveryPlanInformationProps) => {
  const theme = useTheme()

  const DeliveryDateRequest = () => {
    return (
      <Grid item xs={1}>
        <Stack alignItems={'start'} rowGap={'8px'}>
          <MvTypography typeSize={'PX'} size={'BODY_LG_NORMAL'} color={theme.palette.neutral.subtlestText}>
            Delivery Date Request
          </MvTypography>
          <MvTypography typeSize={'PX'} size={'BODY_LG_NORMAL'}>
            {delivData?.date_request || formatDateString(new Date())}
          </MvTypography>
        </Stack>
      </Grid>
    )
  }

  return (
    <>
      <Box width={'100%'} border={`1px solid ${theme.colorToken.border.neutral.normal}`} borderRadius={'6px'}>
        <Box width={'100%'} padding={'12px'} borderBottom={`1px solid ${theme.colorToken.border.neutral.normal}`}>
          <MvTypography typeSize={'PX'} size={'BODY_LG_BOLDEST'}>
            Delivery Plan Information
          </MvTypography>
        </Box>
        <Stack width={'100%'} alignItems={'start'} padding={'20px 16px'}>
          <Grid
            container
            columns={{ xs: 1, md: status === DeliveryPlanStatus.DELIVERY_SCHEDULED ? 3 : 2 }}
            rowSpacing={6}
            columnSpacing={4}
          >
            <Grid item xs={1}>
              <Stack alignItems={'start'} rowGap={'8px'}>
                <MvTypography typeSize={'PX'} size={'BODY_LG_NORMAL'} color={theme.palette.neutral.subtlestText}>
                  DP Number
                </MvTypography>
                <MvTypography typeSize={'PX'} size={'BODY_LG_NORMAL'}>
                  {delivData?.dp_number || '234325'}
                </MvTypography>
              </Stack>
            </Grid>
            <Grid item xs={1}>
              <Stack alignItems={'start'} rowGap={'8px'}>
                <MvTypography typeSize={'PX'} size={'BODY_LG_NORMAL'} color={theme.palette.neutral.subtlestText}>
                  Delivery Type
                </MvTypography>
                <MvTypography typeSize={'PX'} size={'BODY_LG_NORMAL'}>
                  {delivData?.type || 'Delivery'}
                </MvTypography>
              </Stack>
            </Grid>
            {status !== DeliveryPlanStatus.DELIVERY_SCHEDULED && <DeliveryDateRequest />}
            <Grid item xs={1}>
              <Stack alignItems={'start'} rowGap={'8px'}>
                <MvTypography typeSize={'PX'} size={'BODY_LG_NORMAL'} color={theme.palette.neutral.subtlestText}>
                  Preparation Location
                </MvTypography>
                {/* TODO: Will update later */}
                {delivData?.type === DeliveryPlanStatus.OPEN ? (
                  <Select
                    data={[
                      {
                        id: 'Jababeka',
                        label: 'Jababeka'
                      },
                      {
                        id: 'KBI',
                        label: 'KBI'
                      }
                    ]}
                    variant='default'
                    labelKey={'label'}
                    valueKey={'id'}
                    placeholder='Select Location'
                    fullWidth
                    onChange={value => (onLocationChange ? onLocationChange(value as ISelectedlocation) : null)}
                  />
                ) : (
                  <MvTypography typeSize={'PX'} size={'BODY_LG_NORMAL'}>
                    {delivData?.location || 'KBI'}
                  </MvTypography>
                )}
              </Stack>
            </Grid>
            {status === DeliveryPlanStatus.DELIVERY_SCHEDULED && <DeliveryDateRequest />}
            {/* <Grid item xs={1}>
              <Stack alignItems={'start'} rowGap={'8px'}>
                <Field label='Delivery Date Scheduled' isRequired>
                  <DatePickerWrapper>
                    <ReactDatePicker
                      selected={delivData?.date_schedule ? new Date(delivData.date_schedule) : null}
                      popperPlacement='bottom-start'
                      onChange={date => (onDateScheduleChange ? onDateScheduleChange(date as Date) : undefined)}
                      customInput={
                        <TextField
                          fullWidth
                          placeholder='DD/MM/YYYY'
                          variant='outlined'
                          size='small'
                          sx={{ mt: '4px' }}
                          InputProps={{
                            endAdornment: (
                              <Icon width='20px' icon='tabler:calendar' color={theme.palette.text.disabled} />
                            )
                          }}
                        />
                      }
                      dateFormat={'dd/MM/yyyy'}
                    />
                  </DatePickerWrapper>
                </Field>
              </Stack>
            </Grid> */}
          </Grid>
        </Stack>
      </Box>
    </>
  )
}
