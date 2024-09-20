import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { Box, Stack, useTheme } from '@mui/material'

import { Breadcrumbs } from '@/components/atoms/breadcrumbs'
import { MvTypography } from '@/components/atoms/mv-typography'

import { SupplyChain } from './components/supply-chain-dp/SupplyChain'
import { Production } from './components/production-dp/Production'
import { Delivery } from './components/delivery-dp/Delivery'
import { DeliveryScheduled } from './components/delivery-dp/DeliveryScheduled'

import { BASE_DELIVERY_PLAN_PATH, DeliveryPlanStatus } from '@/modules/dms/common/constants'
import { CustomerService } from './components/customer-service-dp/CustomerService'

const DetailDeliveryPlan = () => {
  const { id } = useParams()
  const { pathname } = useLocation()
  const theme = useTheme()

  // nanti fetch by id. terus seharusnya dapat status
  // status ini dipake untuk patokan page mana yg akan dirender

  // Referensi bisa ikut constant berikut
  // https://github.com/machine-vision-indonesia/mvdp-solution-dms/pull/18
  // sementara bisa pake variable ini dulu biar mudah
  // kalo mau edit bisa diubah-ubah status nya biar render sesuai yang diinginkan
  const [status, setStatus] = useState<DeliveryPlanStatus>(DeliveryPlanStatus.OPEN)

  useEffect(() => {
    const _simulated_status = localStorage.getItem('_simulated_status')
    switch (_simulated_status) {
      case DeliveryPlanStatus.SCM_APPROVED:
        setStatus(DeliveryPlanStatus.SCM_APPROVED)
        break
      case DeliveryPlanStatus.PRODUCTION_APPROVED:
        setStatus(DeliveryPlanStatus.PRODUCTION_APPROVED)
        break
      case DeliveryPlanStatus.DELIVERY_APPROVED:
        setStatus(DeliveryPlanStatus.DELIVERY_APPROVED)
        break
      case DeliveryPlanStatus.INQUIRY_RECONFIRM:
        setStatus(DeliveryPlanStatus.INQUIRY_RECONFIRM)
        break
      case DeliveryPlanStatus.INQUIRY_CONFIRMED:
        setStatus(DeliveryPlanStatus.INQUIRY_CONFIRMED)
        break
      case DeliveryPlanStatus.DELIVERY_SCHEDULED:
        setStatus(DeliveryPlanStatus.DELIVERY_SCHEDULED)
        break
      default:
        setStatus(DeliveryPlanStatus.OPEN)
    }
  }, [])

  return (
    <Stack width={'100%'} rowGap={'12px'}>
      <MvTypography typeSize={'PX'} size={'TITLE_XL'}>
        Detail Delivery Plan
      </MvTypography>
      <Breadcrumbs
        data={[
          {
            label: 'Home',
            path: '/'
          },
          {
            label: 'Delivery Plan',
            path: BASE_DELIVERY_PLAN_PATH
          },
          {
            label: 'Detail Delivery Plan',
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
        rowGap={'18px'}
        padding={'16px'}
        marginTop={'12px'}
        width={'100%'}
      >
        {status === DeliveryPlanStatus.OPEN && <SupplyChain />}
        {status === DeliveryPlanStatus.SCM_APPROVED && <Production status={status} />}
        {status === DeliveryPlanStatus.PRODUCTION_APPROVED && <Delivery status={status} />}
        {status === DeliveryPlanStatus.DELIVERY_SCHEDULED && <DeliveryScheduled status={status} />}
        {status === DeliveryPlanStatus.DELIVERY_APPROVED && <CustomerService status={status} />}
        {status === DeliveryPlanStatus.INQUIRY_CONFIRMED && <CustomerService status={status} />}
        {status === DeliveryPlanStatus.INQUIRY_RECONFIRM && <CustomerService status={status} />}
      </Box>
    </Stack>
  )
}

export default DetailDeliveryPlan
