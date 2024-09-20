import React from 'react'
import { ReconfirmModalProps } from '../../types/customer-service-delivery-plan/reconfirmModal.types'
import { Modal } from '@/components/molecules'
import { useForm } from 'react-hook-form'
import { Stack } from '@mui/material'
import { Field } from '@/components/molecules/field'
import { DateTimePicker } from '@/components/molecules/date-time-picker'
import { Button } from '@/components/atoms/button'
import ButtonAction from '@/components/molecules/button-action'
import { useNavigate } from 'react-router-dom'
import { DeliveryPlanStatus } from '@/modules/dms/common/constants'

export const ReconfirmModal: React.FC<ReconfirmModalProps> = ({
  deliveryPlanId = '',
  isOpen,
  setIsOpen,
  onClose = () => {}
}) => {
  const {
    register,
    handleSubmit,
    trigger,
    formState: { isValid }
  } = useForm({
    shouldUseNativeValidation: true
  })

  const navigate = useNavigate()

  const reconfirmAction = () => {
    // TODO: hit api & next step (simulated)
    localStorage.setItem('_simulated_status', DeliveryPlanStatus.SCM_APPROVED)
    navigate(0)
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title='New Delivery Date'
      description='Please input new delivery date!'
      renderAction={false}
      size='medium'
    >
      <Stack alignItems={'start'} spacing={'16px'} paddingY={'20px'}>
        <Field label='New Delivery Date' isRequired>
          <DateTimePicker type='datePicker' />
        </Field>
        <Stack direction={'row'} width={'100%'} justifyContent={'flex-end'} spacing={'8px'}>
          <Button
            variant='outlined'
            content='textOnly'
            text='Cancel'
            sx={{
              minWidth: 0,
              paddingX: '12px',
              paddingY: '8px'
            }}
            onClick={onClose}
          />
          <ButtonAction
            size='medium'
            isValid={isValid}
            payload={{}}
            actionService={reconfirmAction}
            confirmationStatusVariant='warning'
            modalOptions='default'
            onClick={() => {
              trigger()
            }}
            confirmationText={{
              negativeLabel: 'Cancel',
              positiveLabel: 'Yes',
              title: 'Are you sure want to agree the delivery date?',
              description: 'You won’t be able to revert this!'
            }}
            alertText={{
              error: {
                title: 'Network Errors.',
                description: 'Unable to connect to the network or server.'
              },
              success: {
                title: 'Successfully save data.',
                description: 'Delivery plan has been saved by our system.'
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
            onSuccessAddition={() => setIsOpen(false)}
          />
        </Stack>
      </Stack>
    </Modal>
  )
}
