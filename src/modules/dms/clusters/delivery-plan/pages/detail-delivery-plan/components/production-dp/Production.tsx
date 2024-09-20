import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Box, Grid, Stack, TextField, useTheme } from '@mui/material'
import { Icon } from '@iconify/react/dist/iconify.js'
import ReactDatePicker from 'react-datepicker'
import DatePickerWrapper from '@/@core/styles/libs/react-datepicker'

import { MvTypography } from '@/components/atoms/mv-typography'
import { Badge } from '@/components/atoms/badge'
import { Button } from '@/components/atoms'
import { Accordion } from '@/components/molecules/accordion'
import { DateConfirmation } from '@/components/molecules/date-confirmation'
import ButtonAction from '@/components/molecules/button-action'

import { BASE_DELIVERY_PLAN_PATH, DeliveryPlanStatus } from '@/modules/dms/common/constants'

import { MaterialProductionItem } from './MaterialProductionItem'
import { SalesOrderInformation } from '../SalesOrderInformation'
import { DeliveryPlanInformation } from '../DeliveryPlanInformation'
import { ProductionPlanningItem } from './ProductionPlanningItem'
import { MonthPaging } from './MonthPaging'
import { useNavigate } from 'react-router-dom'
import { DateTimePicker } from '@/components/molecules/date-time-picker'
import { format } from 'date-fns'

const sectionTitles = ['Supply Chain', 'Production', 'Delivery']
const mockMaterialDataList = [
  {
    id: '001',
    name: 'Material A',
    code: '[Material Code]',
    status: 'Finish Goods',
    request: 50,
    ready: 50,
    production: 0,
    bom_not_ready: 0
  },
  {
    id: '002',
    name: 'Material B',
    code: '[Material Code]',
    status: 'Raw Material',
    request: 100,
    ready: 45,
    production: 55,
    bom_not_ready: 2
  }
]

interface IProductionProps {
  status: DeliveryPlanStatus
}

export const Production = ({ status }: IProductionProps) => {
  const theme = useTheme()
  const router = useRouter()
  const navigate = useNavigate()

  const [productionPlanningDate, setProductionPlanningDate] = useState<Date>(new Date())

  const getStatusColor = (status: string) => {
    let color = 'neutral'

    switch (status) {
      case 'Finish Goods':
        color = 'success'
        break
      case 'Raw Material':
        color = 'primary'
        break
      default:
        break
    }

    return color
  }

  const onSuccessAddition = () => {
    // TODO: hit api & next step (simulated)
    localStorage.setItem('_simulated_status', DeliveryPlanStatus.PRODUCTION_APPROVED)
    navigate(0)
  }

  return (
    <>
      <Stack width={'100%'} alignItems={'start'} gap={'16px'}>
        {/* HEADER SECTION */}
        <Box
          width={'100%'}
          display={'flex'}
          flexDirection={{
            xs: 'column',
            md: 'row'
          }}
          justifyContent={'space-between'}
          alignItems={{
            xs: 'flex-start',
            md: 'center'
          }}
          gap={'12px'}
        >
          <Stack rowGap={'8px'}>
            <MvTypography typeSize={'PX'} size={'TITLE_SM'}>
              Delivery Plan Information
            </MvTypography>
            <MvTypography typeSize={'PX'} size={'BODY_MD_NORMAL'} color={theme.palette.neutral[400]}>
              Display all delivery plan details
            </MvTypography>
          </Stack>
          <Badge color={'#D0CCFA'} isTransparent style={'circular'} label={'SCM Approved'} size='medium' />
        </Box>

        {/* SO INFORMATION */}
        <SalesOrderInformation delivData={{}} />

        {/* DP INFORMATION */}
        <DeliveryPlanInformation status={status} delivData={{}} />

        {/* MATERIAL LIST */}
        <Box width={'100%'} border={`1px solid ${theme.colorToken.border.neutral.normal}`} borderRadius={'6px'}>
          <Box width={'100%'} padding={'12px'} borderBottom={`1px solid ${theme.colorToken.border.neutral.normal}`}>
            <MvTypography typeSize={'PX'} size={'BODY_LG_BOLDEST'}>
              Material List
            </MvTypography>
          </Box>

          <Box padding={'16px'}>
            <Accordion
              data={mockMaterialDataList.map(md => {
                return {
                  content: <MaterialProductionItem status={status} />,
                  leftElement: (
                    <Stack direction={'row'} alignItems={'center'} spacing={'8px'}>
                      <MvTypography typeSize={'PX'} size={'LABEL_SM_NORMAL'} color={theme.palette.neutral.subtlestText}>
                        | {md.code}
                      </MvTypography>
                      <Badge
                        color={getStatusColor(md.status)}
                        isTransparent
                        style='rect'
                        label={md.status}
                        size='medium'
                      />
                    </Stack>
                  ),
                  rightElement: (
                    <Stack direction={'row'} alignItems={'center'} spacing={'8px'}>
                      <MvTypography typeSize={'PX'} size={'LABEL_MD_NORMAL'}>
                        Request : {md.request} L |
                      </MvTypography>
                      <MvTypography typeSize={'PX'} size={'LABEL_MD_NORMAL'}>
                        Ready : {md.ready} L |
                      </MvTypography>
                      <MvTypography typeSize={'PX'} size={'LABEL_MD_NORMAL'}>
                        Production : {md.production} L |
                      </MvTypography>
                      <MvTypography typeSize={'PX'} size={'LABEL_MD_NORMAL'}>
                        BOM Not Ready : {md.bom_not_ready} Material
                      </MvTypography>
                    </Stack>
                  ),
                  title: md.name
                }
              })}
            />
          </Box>
        </Box>

        <Grid container spacing={4}>
          {/* PRODUCTION PLANNING */}
          <Grid item xs={12} md={8}>
            <Box width={'100%'} border={`1px solid ${theme.colorToken.border.neutral.normal}`} borderRadius={'6px'}>
              <Box width={'100%'} padding={'12px'} borderBottom={`1px solid ${theme.colorToken.border.neutral.normal}`}>
                <MvTypography typeSize={'PX'} size={'BODY_LG_BOLDEST'}>
                  Production Planning Information
                </MvTypography>
              </Box>

              <Box padding={'16px'}>
                <Box
                  padding={'16px 12px'}
                  width={'100%'}
                  border={`1px solid ${theme.colorToken.border.neutral.normal}`}
                  borderRadius={'6px'}
                >
                  <Stack direction={'row'} spacing={4} sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
                    <MonthPaging
                      selectedDate={productionPlanningDate}
                      onChange={(startDate, endDate) => console.log(startDate, endDate)}
                    />
                    {/* tEMPORARY USE REACT DATEPICKER, BECAUSE DATEPICKER ATOM IS NOT ACCEPTING OTHER DATEFORMAT */}
                    {/* <DatePicker variant='monthpicker' selected={productionPlanningDate} /> */}
                    <DateTimePicker
                      type='monthYearPicker'
                      value={productionPlanningDate}
                      onChange={date => setProductionPlanningDate(date as Date)}
                    />
                  </Stack>

                  <Stack spacing={'10px'} sx={{ marginTop: '16px' }}>
                    <ProductionPlanningItem
                      planningData={{
                        date: format(productionPlanningDate, 'MMMM d, yyyy'),
                        day: format(productionPlanningDate, 'EEEE')
                      }}
                      status={status}
                    />
                  </Stack>
                </Box>
              </Box>
            </Box>
          </Grid>

          {/* DATE CONFIRMATION */}
          <Grid item xs={12} md={4}>
            <Box width={'100%'} border={`1px solid ${theme.colorToken.border.neutral.normal}`} borderRadius={'6px'}>
              <Box width={'100%'} padding={'12px'} borderBottom={`1px solid ${theme.colorToken.border.neutral.normal}`}>
                <MvTypography typeSize={'PX'} size={'BODY_LG_BOLDEST'}>
                  Date Confirmation
                </MvTypography>
              </Box>

              <DateConfirmation
                sectionTitles={sectionTitles}
                initialValues={{}}
                disabledSections={{}}
                onChange={val => console.log(val)}
              />
            </Box>
          </Grid>
        </Grid>

        {/* ACTION SECTION */}
        <Stack
          sx={{
            width: '100%',
            mt: '34px',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <Button
            content='textOnly'
            variant='outlined'
            text='Cancel'
            size='large'
            onClick={() => router.push(BASE_DELIVERY_PLAN_PATH)}
            sx={{ padding: '12px 16px !important' }}
          />

          <ButtonAction
            size='large'
            payload={{}}
            actionService={onSuccessAddition}
            confirmationStatusVariant='warning'
            modalOptions='default'
            confirmationText={{
              negativeLabel: 'Cancel',
              positiveLabel: 'Yes',
              title: 'Are you sure want to confirm date?',
              description: 'You won’t be able to revert this!'
            }}
            alertText={{
              error: {
                title: 'Network Errors.',
                description: 'Unable to connect to the network or server.'
              },
              success: {
                title: 'Successfully save data.',
                description: 'Date has been confirmed by our system.'
              }
            }}
            variant='contained'
            color='primary'
            text='Save'
            content='textOnly'
            sx={{
              minWidth: 0,
              padding: '12px 16px !important'
            }}
          />
        </Stack>
      </Stack>
    </>
  )
}
