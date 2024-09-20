import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Box, Stack, useTheme } from '@mui/material'

import { Input } from '@/components/atoms/input'
import { MvTypography } from '@/components/atoms/mv-typography'
import { Badge } from '@/components/atoms/badge'
import { Button, Select } from '@/components/atoms'
import { Accordion } from '@/components/molecules/accordion'
import { DateConfirmation } from '@/components/molecules/date-confirmation'
import { Field } from '@/components/molecules/field'
import ButtonAction from '@/components/molecules/button-action'

import { BASE_DELIVERY_PLAN_PATH, DeliveryPlanStatus, StatusPrefix } from '@/modules/dms/common/constants'

import { MaterialProductionItem } from '../production-dp/MaterialProductionItem'
import { SalesOrderInformation } from '../SalesOrderInformation'
import { DeliveryPlanInformation } from '../DeliveryPlanInformation'
import { DeliveryPlanAnalysis } from './DeliveryPlanAnalysis'
import { useNavigate } from 'react-router-dom'

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

interface IDeliveryProps {
  status: DeliveryPlanStatus
}

export const DeliveryScheduled = ({ status }: IDeliveryProps) => {
  const theme = useTheme()
  const router = useRouter()
  const navigate = useNavigate()

  const [productionPlanningDate, setProductionPlanningDate] = useState<Date>(new Date())

  const getActiveStatus = (activeStatus: DeliveryPlanStatus): { label: string; color: string } => {
    const prefix = StatusPrefix.DELIVERY_PLAN
    let activeLabel = ''
    let statusColor = ''

    switch (activeStatus) {
      case DeliveryPlanStatus.PRODUCTION_APPROVED:
        activeLabel = DeliveryPlanStatus.PRODUCTION_APPROVED.replace(prefix, '')
        statusColor = '#FEE9DC'
        break
      case DeliveryPlanStatus.DELIVERY_SCHEDULED:
        activeLabel = DeliveryPlanStatus.DELIVERY_SCHEDULED.replace(prefix, '')
        statusColor = '#FFF1AA'
      default:
        break
    }

    return {
      label: activeLabel,
      color: statusColor
    }
  }

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

  const saveAction = () => {
    // TODO: hit api & next step (simulated)
    localStorage.setItem('_simulated_status', DeliveryPlanStatus.DELIVERY_SCHEDULED)
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
          <Badge
            color={getActiveStatus(status).color || 'neutral'}
            isTransparent
            style={'circular'}
            label={getActiveStatus(status).label}
            size='medium'
          />
        </Box>

        <Accordion
          data={[
            {
              content: <DeliveryPlanAnalysis />,
              title: 'Delivery Plan Analysis'
            }
          ]}
          hover={false}
        />

        {/* SO INFORMATION */}
        <SalesOrderInformation delivData={{}} />

        {/* DP INFORMATION */}
        <DeliveryPlanInformation status={status} delivData={{}} onDateScheduleChange={date => console.log(date)} />

        {/* Transport Information */}
        <Box width={'100%'} border={`1px solid ${theme.colorToken.border.neutral.normal}`} borderRadius={'6px'}>
          <Box width={'100%'} padding={'12px'} borderBottom={`1px solid ${theme.colorToken.border.neutral.normal}`}>
            <MvTypography typeSize={'PX'} size={'BODY_LG_BOLDEST'}>
              Transport Information
            </MvTypography>
          </Box>

          <Stack direction={{ md: 'row' }} width={'100%'} alignItems={'start'} spacing={6} padding={'20px 16px'}>
            <Field label='Driver' helperText={''} error={false}>
              <Input placeholder='Input Driver Name' width='100%' style={{ marginTop: '4px' }} />
            </Field>

            <Field label='Vehicle' helperText={''} error={false} isRequired>
              <Select
                placeholder='Select Vehicle'
                data={[
                  {
                    id: 'car',
                    label: 'Car'
                  },
                  {
                    id: 'airplane',
                    label: 'Airplane'
                  }
                ]}
                variant='default'
                labelKey={'label'}
                valueKey={'id'}
                onChange={value => console.log(value)}
                selected={undefined}
                sx={{
                  mt: '4px',
                  '.MuiInputBase-root': {
                    minHeight: '36px'
                  }
                }}
              />
            </Field>

            <Field label='Vehicle Number' helperText={''} error={false}>
              <Input placeholder='Input Vehicle Number' width='100%' style={{ marginTop: '4px' }} />
            </Field>
          </Stack>
        </Box>

        {/* DATE CONFIRMATION */}
        <Box width={'100%'} border={`1px solid ${theme.colorToken.border.neutral.normal}`} borderRadius={'6px'}>
          <Box width={'100%'} padding={'12px'} borderBottom={`1px solid ${theme.colorToken.border.neutral.normal}`}>
            <MvTypography typeSize={'PX'} size={'BODY_LG_BOLDEST'}>
              Date Confirmation
            </MvTypography>
          </Box>

          <DateConfirmation
            direction='row'
            sectionTitles={sectionTitles}
            initialValues={{}}
            disabledSections={{}}
            onChange={val => console.log(val)}
          />
        </Box>

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
            actionService={saveAction}
            confirmationStatusVariant='warning'
            modalOptions='default'
            confirmationText={{
              negativeLabel: 'Cancel',
              positiveLabel: 'Yes',
              title: 'Are you sure want to Save delivery scheduled?',
              description: 'You won’t be able to revert this!'
            }}
            alertText={{
              error: {
                title: 'Network Errors.',
                description: 'Unable to connect to the network or server.'
              },
              success: {
                title: 'Successfully save data.',
                description: 'Delivery schedule has been saved by our system.'
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
