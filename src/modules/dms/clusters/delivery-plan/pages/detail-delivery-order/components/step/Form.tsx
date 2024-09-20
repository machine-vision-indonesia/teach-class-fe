import { Badge } from '@/components/atoms/badge'
import { Button } from '@/components/atoms/button'
import { MvTypography } from '@/components/atoms/mv-typography'
import ButtonAction from '@/components/molecules/button-action'
import { Stepper } from '@/components/molecules/stepper'
import { Step2 } from '@/modules/dms/clusters/delivery-plan/pages/detail-delivery-order/components/step/Step2'
import { Step3 } from '@/modules/dms/clusters/delivery-plan/pages/detail-delivery-order/components/step/Step3'
import { BASE_DELIVERY_PLAN_PATH, DeliveryOrderStatus } from '@/modules/dms/common/constants'
import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Stack, useTheme } from '@mui/material'
import React, { useEffect, useMemo, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import * as yup from 'yup'
import { FormProps } from '../../types/form.types'
import { Step1 } from './Step1'

const schema = yup.object().shape({
  driverName: yup.string().required(),
  roadLetterNumber: yup.string().required(),
  vehicle: yup.object().shape({ id: yup.number().required() }).required(),
  vehicleRegistrationNumber: yup.string().required(),
  containerFront: yup.mixed().required(),
  containerBack: yup.mixed().required(),
  containerRight: yup.mixed().required(),
  containerLeft: yup.mixed().required()
})

export const Form: React.FC<FormProps> = ({ status }) => {
  const theme = useTheme()
  const navigate = useNavigate()
  const formMethod = useForm({
    resolver: yupResolver(schema)
  })

  const onSubmitStep1 = () => {
    // TODO: hit api for update status & next step (simulated)
    localStorage.setItem('_simulated_status', DeliveryOrderStatus.ON_GOING_STUFFING)
    navigate(0)
  }

  const onSubmitStep2 = () => {
    // TODO: hit api for update status & next step (simulated)
    localStorage.setItem('_simulated_status', DeliveryOrderStatus.ON_DELIVERY)
    navigate(0)
  }

  const onSubmitStep3 = () => {
    // TODO: hit api for update status & next step (simulated)
    localStorage.setItem('_simulated_status', DeliveryOrderStatus.DELIVERED)
    navigate(0)
  }

  const [currentStep, setCurrentStep] = useState<0 | 1 | 2>(0)

  const statusRender = useMemo(() => {
    switch (status) {
      case DeliveryOrderStatus.READY_FOR_DELIVERY:
        return {
          color: '#AAE7EB',
          label: 'Ready for Delivery'
        }
      case DeliveryOrderStatus.ON_GOING_STUFFING:
        return {
          color: '#FDD0B5',
          label: 'On Going Stuffing'
        }
      case DeliveryOrderStatus.ON_DELIVERY:
        return {
          color: '#DAB2FA',
          label: 'On Delivery'
        }
      case DeliveryOrderStatus.DELIVERED:
        return {
          color: '#84F5B7',
          label: 'Delivered'
        }
      default:
        return {
          color: '#AAE7EB',
          label: 'Ready for Delivery'
        }
    }
  }, [status])

  const buttonRender = useMemo<{
    label: string
    type: 'button' | 'submit'
    form: string
    isValid: boolean
    onClick: () => void
  }>(() => {
    switch (status) {
      case DeliveryOrderStatus.READY_FOR_DELIVERY:
        return {
          label: 'Ready for Stuffing',
          type: 'submit',
          form: 'formStep1',
          isValid: formMethod.formState.isValid,
          onClick: () => onSubmitStep1()
        }
      case DeliveryOrderStatus.ON_GOING_STUFFING:
        return {
          label: 'On Delivery',
          type: 'button',
          form: '',
          isValid: true,
          onClick: () => onSubmitStep2()
        }
      case DeliveryOrderStatus.ON_DELIVERY:
        return {
          label: 'Delivered',
          type: 'button',
          form: '',
          isValid: true,
          onClick: () => onSubmitStep3()
        }
      default:
        return {
          label: '',
          type: 'button',
          form: '',
          isValid: true,
          onClick: () => {}
        }
    }
  }, [status, formMethod.formState.isValid])

  const stepperData = useMemo(() => {
    return [
      {
        active: currentStep === 0,
        passed: currentStep > 0,
        subtitle: '',
        title: 'Start Delivery'
      },
      {
        active: currentStep === 1,
        passed: currentStep > 1,
        subtitle: '',
        title: 'Stuffing'
      },
      {
        active: currentStep === 2,
        passed: currentStep > 2,
        subtitle: '',
        title: 'Delivered'
      }
    ]
  }, [currentStep])

  const renderButton = () => {
    return (
      <Stack
        width={'100%'}
        direction={'row'}
        justifyContent={'space-between'}
        alignItems={'center'}
        sx={{
          marginTop: '18px'
        }}
      >
        <Button
          variant='outlined'
          content='textOnly'
          color='primary'
          text='Cancel'
          onClick={() => navigate(BASE_DELIVERY_PLAN_PATH)}
          sx={{ paddingX: '16px', paddingY: '12px', minWidth: 0 }}
        />

        {status !== DeliveryOrderStatus.DELIVERED && (
          <ButtonAction
            size='medium'
            payload={{}}
            actionService={() => buttonRender.onClick()}
            confirmationStatusVariant='warning'
            modalOptions='default'
            confirmationText={{
              negativeLabel: 'Cancel',
              positiveLabel: 'Yes',
              title: 'Are you sure want to proceed?',
              description: 'You won’t be able to revert this!'
            }}
            alertText={{
              error: {
                title: 'Network Errors.',
                description: 'Unable to connect to the network or server.'
              },
              success: {
                title: 'Successfully save data.',
                description: 'Delivery order has been saved by our system.'
              }
            }}
            variant='contained'
            color='primary'
            content='textOnly'
            text={buttonRender.label}
            isValid={buttonRender.isValid}
            form={buttonRender.form}
            type={buttonRender.type}
            sx={{
              minWidth: 0,
              paddingX: '16px',
              paddingY: '12px'
            }}
          />
        )}
      </Stack>
    )
  }

  useEffect(() => {
    switch (status) {
      case DeliveryOrderStatus.READY_FOR_DELIVERY:
        setCurrentStep(0)
        break
      case DeliveryOrderStatus.ON_GOING_STUFFING:
        setCurrentStep(1)
        break
      case DeliveryOrderStatus.ON_DELIVERY:
      case DeliveryOrderStatus.DELIVERED:
        setCurrentStep(2)
        break
      default:
        setCurrentStep(0)
        break
    }
  }, [status])

  return (
    <Stack width={'100%'} alignItems={'start'} rowGap={'12px'}>
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
            Detail Delivery Order
          </MvTypography>
          <MvTypography typeSize={'PX'} size={'BODY_MD_NORMAL'} color={theme.palette.neutral[400]}>
            Display all delivery plan details
          </MvTypography>
        </Stack>
        <Badge color={statusRender.color} isTransparent style={'circular'} label={statusRender.label} size='medium' />
      </Box>
      {/* stepper */}
      <Stack width={'100%'} direction={'row'} justifyContent={'center'}>
        <Box
          width={{
            xs: '100%',
            lg: '30%',
            xl: '50%'
          }}
          display={'flex'}
          justifyContent={'center'}
          sx={{
            fontSize: '12px'
          }}
        >
          {status !== DeliveryOrderStatus.DELIVERED && (
            <Stepper data={stepperData} orientation='horizontal' size='large' />
          )}
        </Box>
      </Stack>
      {/* form */}
      {currentStep === 0 && (
        <FormProvider {...formMethod}>
          <form id='formStep1' onSubmit={formMethod.handleSubmit(() => {})} style={{ width: '100%' }}>
            <Step1 />
          </form>
        </FormProvider>
      )}
      {currentStep === 1 && <Step2 />}
      {currentStep === 2 && <Step3 />}
      {/* button */}
      {renderButton()}
    </Stack>
  )
}
