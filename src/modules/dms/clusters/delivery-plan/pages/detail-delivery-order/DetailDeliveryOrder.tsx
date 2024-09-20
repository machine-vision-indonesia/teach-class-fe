import { Box, Stack, useTheme } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'

import { Breadcrumbs } from '@/components/atoms/breadcrumbs'
import { MvTypography } from '@/components/atoms/mv-typography'

import { BASE_DELIVERY_PLAN_PATH, DeliveryOrderStatus } from '@/modules/dms/common/constants'
import DeliveryOrderOpen from './components/DeliveryOrderOpen'
import { Form } from './components/step/Form'

const DetailDeliveryOrder = () => {
  const { id } = useParams()
  const { pathname } = useLocation()
  const theme = useTheme()

  // nanti fetch by id. terus seharusnya dapat status
  // status ini dipake untuk patokan page mana yg akan dirender

  // Referensi bisa ikut constant berikut
  // https://github.com/machine-vision-indonesia/mvdp-solution-dms/pull/18
  // sementara bisa pake variable ini dulu biar mudah
  // kalo mau edit bisa diubah-ubah status nya biar render sesuai yang diinginkan
  const [status, setStatus] = useState(DeliveryOrderStatus.OPEN)

  useEffect(() => {
    const _simulated_status = localStorage.getItem('_simulated_status')
    switch (_simulated_status) {
      case DeliveryOrderStatus.READY_FOR_DELIVERY:
        setStatus(DeliveryOrderStatus.READY_FOR_DELIVERY)
        break
      case DeliveryOrderStatus.ON_GOING_STUFFING:
        setStatus(DeliveryOrderStatus.ON_GOING_STUFFING)
        break
      case DeliveryOrderStatus.ON_DELIVERY:
        setStatus(DeliveryOrderStatus.ON_DELIVERY)
        break
      case DeliveryOrderStatus.DELIVERED:
        setStatus(DeliveryOrderStatus.DELIVERED)
        break
      default:
        setStatus(DeliveryOrderStatus.OPEN)
    }
  }, [])

  return (
    <Stack width={'100%'} rowGap={'12px'}>
      <MvTypography typeSize={'PX'} size={'TITLE_XL'}>
        Detail Delivery Order
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
            label: 'Detail Delivery Order',
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
        {status === DeliveryOrderStatus.OPEN ? (
          <DeliveryOrderOpen />
        ) : [
            DeliveryOrderStatus.READY_FOR_DELIVERY,
            DeliveryOrderStatus.ON_GOING_STUFFING,
            DeliveryOrderStatus.ON_DELIVERY,
            DeliveryOrderStatus.DELIVERED
          ].includes(status) ? (
          <Form status={status} />
        ) : null}
      </Box>
    </Stack>
  )
}

export default DetailDeliveryOrder
