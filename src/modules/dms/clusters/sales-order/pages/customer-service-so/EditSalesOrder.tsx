import { Button } from '@/components/atoms'
import { Breadcrumbs } from '@/components/atoms/breadcrumbs'
import { MvTypography } from '@/components/atoms/mv-typography'
import { Stepper } from '@/components/molecules/stepper'
import { Box, Stack, useTheme } from '@mui/material'
import React, { useState } from 'react'
import { SalesOrder } from './components/SalesOrder'
import { DeliveryPlan } from './components/DeliveryPlan'
import { ModalDialog } from '@/components/molecules/modal-dialog'
import { useLocation, useParams } from 'react-router-dom'
import { BASE_SALES_ORDER_PATH, PageType } from '@/modules/dms/common/constants'
import ButtonAction from '@/components/molecules/button-action'

const EditSalesOrder = () => {
  const theme = useTheme()
  const { id } = useParams() // ambil id dari sales order terpilih
  const { pathname } = useLocation()

  const [currentStep, setCurrentStep] = useState<0 | 1>(0)
  const [stepperData, setStepperData] = useState([
    {
      active: true,
      passed: false,
      subtitle: '',
      title: 'Sales Order'
    },
    {
      active: false,
      passed: false,
      subtitle: '',
      title: 'Delivery Plan'
    }
  ])
  const [confirmModalOpen, setConfirmModalOpen] = useState(false)

  const handleNext = () => {
    setCurrentStep(1)
    setStepperData(prevData =>
      prevData.map((step, index) =>
        index === 0
          ? { ...step, active: false, passed: true }
          : index === 1
            ? { ...step, active: true, passed: false }
            : step
      )
    )

    if (currentStep === 1) {
      setConfirmModalOpen(true)
    }
  }

  const handleBack = () => {
    setCurrentStep(0)
    setStepperData(prevData =>
      prevData.map((step, index) =>
        index === 0
          ? { ...step, active: true, passed: false }
          : index === 1
            ? { ...step, active: false, passed: false }
            : step
      )
    )
  }

  return (
    <Stack width={'100%'} rowGap={'12px'}>
      <MvTypography typeSize={'PX'} size={'TITLE_XL'}>
        Edit Sales Order
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
            label: 'Edit Sales Order',
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
        padding={'32px 24px'}
        marginTop={'12px'}
        width={'100%'}
      >
        <Stack width={'100%'} direction={'row'} justifyContent={'center'}>
          <Box
            width={{
              xs: '100%',
              lg: '30%',
              xl: '27%'
            }}
            display={'flex'}
            justifyContent={'center'}
            sx={{
              fontSize: '12px'
            }}
          >
            <Stepper data={stepperData} orientation='horizontal' size='large' />
          </Box>
        </Stack>
        {currentStep === 0 && <SalesOrder pageType={PageType.EDIT} />}
        {currentStep === 1 && <DeliveryPlan />}
        <Stack
          direction={'row'}
          width={'100%'}
          justifyContent={'space-between'}
          alignItems={'center'}
          sx={{ marginTop: '40px' }}
        >
          {currentStep === 0 ? (
            <Button
              variant='outlined'
              color='primary'
              content='textOnly'
              text='Cancel'
              sx={{ paddingX: '16px', paddingY: '12px', minWidth: 0 }}
            />
          ) : (
            <Button
              variant='outlined'
              color='primary'
              content='textOnly'
              onClick={handleBack}
              text='Back'
              sx={{ paddingX: '16px', paddingY: '12px', minWidth: 0 }}
            />
          )}

          {currentStep === 0 ? (
            <Button
              variant='contained'
              color='primary'
              content='textOnly'
              onClick={handleNext}
              text='Next'
              sx={{ paddingX: '16px', paddingY: '12px', minWidth: 0 }}
            />
          ) : (
            <ButtonAction
              size='medium'
              payload={{}}
              actionService={() => {}}
              confirmationStatusVariant='warning'
              modalOptions='default'
              confirmationText={{
                negativeLabel: 'Cancel',
                positiveLabel: 'Yes',
                title: 'Are you sure want to edit sales order?',
                description: 'You won’t be able to revert this!'
              }}
              alertText={{
                error: {
                  title: 'Network Errors.',
                  description: 'Unable to connect to the network or server.'
                },
                success: {
                  title: 'Successfully save data.',
                  description: 'Schedule ITR has been saved by our system.'
                }
              }}
              variant='contained'
              color='primary'
              text='Save'
              content='textOnly'
              sx={{
                minWidth: 0,
                paddingX: '16px',
                paddingY: '12px'
              }}
            />
          )}
        </Stack>
      </Box>
    </Stack>
  )
}

export default EditSalesOrder
