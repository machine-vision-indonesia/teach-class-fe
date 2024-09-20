import React, { memo, Suspense, useEffect, useState, useTransition } from 'react'
import { Button, Select } from '@/components/atoms'
import { Badge } from '@/components/atoms/badge'
import { Breadcrumbs } from '@/components/atoms/breadcrumbs'
import { MvTypography } from '@/components/atoms/mv-typography'
import Tabs from '@/components/atoms/tabs'
import { Alert } from '@/components/molecules/alert'
import { Box, Grid, Stack, useTheme } from '@mui/material'
import { IDetailSalesOrder } from './types/detailSalesOrder.types'
import { Field } from '@/components/molecules/field'
import { Input } from '@/components/atoms/input'
import { DateTimePicker } from '@/components/molecules/date-time-picker'
import { SalesOrderDetail } from './components/SalesOrderDetail'
import { DeliveryPlanDetail } from './components/DeliveryPlanDetail'
import { useLocation, useParams } from 'react-router-dom'
import { Icon } from '@iconify/react/dist/iconify.js'
import { DeliveryPlan } from './components/DeliveryPlan'
import { ModalDialog } from '@/components/molecules/modal-dialog'
import { BASE_SALES_ORDER_PATH } from '@/modules/dms/common/constants'

const DetailSalesOrder: React.FC<IDetailSalesOrder> = ({ isDetail = true }) => {
  const theme = useTheme()
  const { id } = useParams()
  const { pathname } = useLocation()

  const [confirmModalOpen, setConfirmModalOpen] = useState(false)

  // sengaja dicomment untuk test logic sales order tertentu tanpa adanya delivery plan
  const [allDeliveryPlans, setAllDeliveryPlans] = useState([
    // {
    //   name: 'Delivery Plan 1',
    //   status: 'open',
    //   material_list: []
    // },
    // {
    //   name: 'Delivery Plan 2',
    //   status: 'delivery approval',
    //   material_list: [
    //     {
    //       name: 'Material A',
    //       code: 'Material Code',
    //       type: 'Finish Goods'
    //     },
    //     {
    //       name: 'Material B',
    //       code: 'Material Code',
    //       type: 'Raw Material'
    //     }
    //   ]
    // }
  ])
  const [isPending, startTransition] = useTransition()
  const [activeTab, setActiveTab] = useState('0')

  const DeliveryPlanItemTemp = () => {
    return (
      <Stack width={'100%'} rowGap={4}>
        <Grid container columns={{ xs: 1, sm: 1, md: 3 }} spacing={4}>
          <Grid item xs={1}>
            <Field label='DP Number'>
              <Input value={'353446'} width='100%' disabled />
            </Field>
          </Grid>
          <Grid item xs={1}>
            <Field label='Delivery Type' isRequired>
              <Select data={[]} labelKey={'value'} valueKey={'id'} />
            </Field>
          </Grid>
          <Grid item xs={1}>
            <Field label='Delivery Date Request' isRequired>
              <DateTimePicker type='datePicker' />
            </Field>
          </Grid>
        </Grid>
        <Box
          bgcolor={theme.colorToken.background.neutral.normal}
          border={'1px solid ' + theme.colorToken.border.neutral.normal}
          borderRadius={'6px'}
          padding={'16px'}
        >
          <Stack width={'100%'} rowGap={4}>
            <Stack direction={'row'} justifyContent={'space-between'}>
              <MvTypography typeSize={'PX'} size={'TITLE_XL'}>
                List Material
              </MvTypography>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    )
  }

  const renderButton = () => {
    return (
      <Stack
        width={'100%'}
        direction={'row'}
        spacing={2}
        justifyContent={'space-between'}
        alignItems={'center'}
        sx={{ marginTop: '20px' }}
      >
        <Button
          variant='outlined'
          color='primary'
          content='textOnly'
          text='Cancel'
          size='medium'
          sx={{
            marginTop: '20px',
            paddingX: '12px',
            paddingY: '10px'
          }}
        />
        {activeTab === '1' && allDeliveryPlans.length === 0 && (
          <Button
            variant='contained'
            color='primary'
            content='textOnly'
            text='Save'
            size='medium'
            sx={{
              marginTop: '20px',
              paddingX: '12px',
              paddingY: '10px'
            }}
            onClick={() => setConfirmModalOpen(true)}
          />
        )}
      </Stack>
    )
  }

  return (
    <Stack width={'100%'} rowGap={'12px'} alignItems={'flex-start'}>
      <MvTypography typeSize={'PX'} size={'TITLE_XL'}>
        {allDeliveryPlans.length > 0 ? 'Detail Sales Order' : 'Add Delivery Plan'}
      </MvTypography>
      <Breadcrumbs
        data={[
          {
            label: 'Home',
            path: '/'
          },
          {
            label: 'Sales Order',
            path: BASE_SALES_ORDER_PATH
          },
          {
            label: allDeliveryPlans.length > 0 ? 'Detail Sales Order' : 'Add Delivery Plan',
            path: pathname
          }
        ]}
      />
      <Box
        bgcolor={theme.colorToken.background.neutral.normal}
        borderRadius={'6px'}
        display={'flex'}
        flexDirection={'column'}
        alignItems={'flex-start'}
        rowGap={'12px'}
        padding={'16px'}
        marginTop={'12px'}
        width={'100%'}
      >
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
              Sales Order Information
            </MvTypography>
            <MvTypography typeSize={'PX'} size={'BODY_MD_NORMAL'} color={theme.palette.neutral[400]}>
              Display all sales order details
            </MvTypography>
          </Stack>
          <Box display={'flex'} alignItems={'center'} gap={'8px'}>
            <Alert
              title={'SO is not yet connected to intacs. Please copy the SO Id to intacs.'}
              variant='warning'
              size='small'
            />
            <Badge color={'primary'} style={'circular'} label={'Open'} size='medium' isTransparent />
          </Box>
        </Box>
        <Box width={'100%'}>
          <Tabs
            activeTabs={activeTab}
            data={[
              {
                renderContent: '',
                label: 'Sales Order'
              },
              {
                renderContent: '',
                ...(allDeliveryPlans.length < 1
                  ? {
                      renderIcon: (
                        <Icon
                          icon={'tabler:alert-triangle'}
                          width={24}
                          height={24}
                          color={theme.colorToken.icon.danger.normal}
                          style={{
                            marginTop: '6px',
                            marginRight: '4px'
                          }}
                        />
                      )
                    }
                  : {}),

                label: 'Delivery Plan'
              }
            ]}
            onChange={value => {
              startTransition(() => {
                setActiveTab(value)
              })
            }}
          />
        </Box>
        <Suspense fallback={<h1>Loading...</h1>}>
          {activeTab === '0' && <SalesOrderDetail />}
          {activeTab === '1' && allDeliveryPlans.length > 0 && <DeliveryPlanDetail data={allDeliveryPlans} />}
          {activeTab === '1' && allDeliveryPlans.length === 0 && <DeliveryPlan />}
        </Suspense>
        {renderButton()}
      </Box>
      {confirmModalOpen && (
        <ModalDialog
          isOpen={confirmModalOpen}
          onClose={() => setConfirmModalOpen(false)}
          onOk={() => setConfirmModalOpen(false)}
          closeable
          title='Are you sure want to save delivery plan ?'
          description='You won’t be able to revert this!'
          maxWidth='xs'
          negativeLabel='Cancel'
          position='left'
          positionActionButton='right'
          positiveLabel='Yes'
          size='medium'
          statusVariant='warning'
          typeVariant='confirmation'
        />
      )}
    </Stack>
  )
}

export default DetailSalesOrder
