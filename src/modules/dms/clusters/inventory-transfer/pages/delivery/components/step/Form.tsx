import { Badge } from '@/components/atoms/badge'
import { MvTypography } from '@/components/atoms/mv-typography'
import { Stepper } from '@/components/molecules/stepper'
import { Step2 } from '@/modules/dms/clusters/inventory-transfer/pages/delivery/components/step/Step2'
import { Step3 } from '@/modules/dms/clusters/inventory-transfer/pages/delivery/components/step/Step3'
import { Step4 } from '@/modules/dms/clusters/inventory-transfer/pages/delivery/components/step/Step4'
import { Step5 } from '@/modules/dms/clusters/inventory-transfer/pages/delivery/components/step/Step5'
import { InventoryTransferRequestStatus } from '@/modules/dms/common/constants/inventoryTransferRequestStatus'
import { Box, Stack, useTheme } from '@mui/material'
import React, { useEffect, useMemo, useState } from 'react'
import { FormProps } from '../../types/form.types'
import { Step1 } from './Step1'

export const Form: React.FC<FormProps> = ({ status }) => {
  const theme = useTheme()

  const [currentStep, setCurrentStep] = useState<number>(0)

  const statusRender = useMemo(() => {
    switch (status) {
      case InventoryTransferRequestStatus.SCHEDULED:
        return {
          color: 'primary',
          label: 'ITR Scheduled'
        }
      case InventoryTransferRequestStatus.TRANSPORT_READY:
        return {
          color: '#FFF1AA', // WARN: Not have color token / predefined color
          label: 'Transport Ready'
        }
      case InventoryTransferRequestStatus.READY_FOR_STUFFING:
        return {
          color: '#F8C6C6', // WARN: Not have color token / predefined color
          label: 'Ready for Stuffing'
        }
      case InventoryTransferRequestStatus.READY_FOR_DELIVERY:
        return {
          color: '#FDD0B5', // WARN: Not have color token / predefined color
          label: 'Ready for Delivery'
        }
      case InventoryTransferRequestStatus.CONFIRM:
        return {
          color: '#AAE7EB', // WARN: Not have color token / predefined color
          label: 'ITR Confirm'
        }
      case InventoryTransferRequestStatus.ON_DELIVERY:
        return {
          color: '#B1C4E9', // WARN: Not have color token / predefined color
          label: 'ITR on Delivery'
        }
      case InventoryTransferRequestStatus.DELIVERED:
        return {
          color: '#B0E5C8', // WARN: Not have color token / predefined color
          label: 'ITR Delivered'
        }
      default:
        return {
          color: 'primary',
          label: 'ITR Scheduled'
        }
    }
  }, [status])

  const subtitleRender = useMemo(() => {
    switch (status) {
      case InventoryTransferRequestStatus.SCHEDULED:
        return {
          label: 'Fill the form inventory request information'
        }
      case InventoryTransferRequestStatus.TRANSPORT_READY:
        return {
          label: 'Please fill out the form below completely'
        }
      case InventoryTransferRequestStatus.READY_FOR_STUFFING:
        return {
          label: 'Display information about Inventory Transfer'
        }
      case InventoryTransferRequestStatus.READY_FOR_DELIVERY:
        return {
          label: 'Display information about Inventory Transfer'
        }
      case InventoryTransferRequestStatus.CONFIRM:
        return {
          label: 'Please fill out the form below completely'
        }
      case InventoryTransferRequestStatus.ON_DELIVERY:
        return {
          label: 'Display information about Inventory Transfer'
        }
      case InventoryTransferRequestStatus.DELIVERED:
        return {
          label: 'Display all delivery order details'
        }
      default:
        return {
          label: 'Fill the form inventory request information'
        }
    }
  }, [status])

  const stepperData = useMemo(() => {
    return [
      {
        active: currentStep === 0,
        passed: currentStep > 0,
        subtitle: '',
        title: 'Scheduled'
      },
      {
        active: currentStep === 1,
        passed: currentStep > 1,
        subtitle: '',
        title: 'Transport Ready'
      },
      {
        active: currentStep === 2,
        passed: currentStep > 2,
        subtitle: '',
        title: 'Stuffing'
      },
      {
        active: currentStep === 3,
        passed: currentStep > 3,
        subtitle: '',
        title: 'Delivering'
      },
      {
        active: currentStep === 4,
        passed: currentStep > 4,
        subtitle: '',
        title: 'Delivered'
      }
    ]
  }, [currentStep])

  useEffect(() => {
    switch (status) {
      case InventoryTransferRequestStatus.SCHEDULED:
        setCurrentStep(0)
        break
      case InventoryTransferRequestStatus.TRANSPORT_READY:
        setCurrentStep(1)
        break
      case InventoryTransferRequestStatus.READY_FOR_STUFFING:
      case InventoryTransferRequestStatus.READY_FOR_DELIVERY:
        setCurrentStep(2)
        break
      case InventoryTransferRequestStatus.CONFIRM:
        setCurrentStep(3)
        break
      case InventoryTransferRequestStatus.ON_DELIVERY:
      case InventoryTransferRequestStatus.DELIVERED:
        setCurrentStep(4)
        break
      default:
        setCurrentStep(0)
        break
    }
  }, [status])

  return (
    <Stack width={'100%'} alignItems={'start'} rowGap={'20px'}>
      {/* stepper */}
      <Stack width={'100%'} direction={'row'} justifyContent={'center'} alignItems='center'>
        <Box
          width={{
            xs: '100%',
            lg: '80%',
            xl: '80%'
          }}
          display={'flex'}
          justifyContent={'center'}
          alignItems='center'
          sx={{
            fontSize: '12px'
          }}
        >
          {status !== InventoryTransferRequestStatus.DELIVERED && (
            <Stepper data={stepperData} orientation='horizontal' size='large' />
          )}
        </Box>
      </Stack>
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
            Inventory Request Information
          </MvTypography>
          <MvTypography typeSize={'PX'} size={'BODY_MD_NORMAL'} color={theme.colorToken.text.neutral.normal}>
            {subtitleRender.label}
          </MvTypography>
        </Stack>
        <Badge color={statusRender.color} isTransparent style={'circular'} label={statusRender.label} size='medium' />
      </Box>
      {/* form */}
      {currentStep === 0 && <Step1 />}
      {currentStep === 1 && <Step2 />}
      {currentStep === 2 && <Step3 />}
      {currentStep === 3 && <Step4 />}
      {currentStep === 4 && <Step5 />}
      {/* button */}
    </Stack>
  )
}
