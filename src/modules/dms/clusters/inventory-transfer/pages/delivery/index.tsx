import { Box, Stack, useTheme } from '@mui/material'
import React, { useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'

import { Breadcrumbs } from '@/components/atoms/breadcrumbs'
import { MvTypography } from '@/components/atoms/mv-typography'

import { BASE_INVENTORY_TRANSFER_PATH } from '@/modules/dms/common/constants'
import { InventoryTransferRequestStatus } from '@/modules/dms/common/constants/inventoryTransferRequestStatus'
import { Form } from './components/step/Form'

const DetailDelivery = () => {
  const { id } = useParams()
  const { pathname } = useLocation()
  const theme = useTheme()

  const [status, setStatus] = useState(InventoryTransferRequestStatus.SCHEDULED)

  React.useEffect(() => {
    const _simulated_status = localStorage.getItem('_simulated_status_[CLUSTER:InventoryTransfer][PAGES:Delivery-ITR]')
    if (_simulated_status) {
      setStatus(_simulated_status as InventoryTransferRequestStatus)
    } else {
      setStatus(InventoryTransferRequestStatus.SCHEDULED)
    }
  }, [])

  return (
    <Stack width={'100%'} rowGap={'12px'}>
      <MvTypography typeSize={'PX'} size={'TITLE_XL'}>
        Detail Inventory Transfer
      </MvTypography>
      <Breadcrumbs
        data={[
          {
            label: 'Home',
            path: '/'
          },
          {
            label: 'Inventory Transfer Request',
            path: BASE_INVENTORY_TRANSFER_PATH
          },
          {
            label: 'Detail Inventory Transfer',
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
        <Form status={status} />
      </Box>
    </Stack>
  )
}

export default DetailDelivery
