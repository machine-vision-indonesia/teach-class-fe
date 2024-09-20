import React, { useEffect, useState } from 'react'
import { Stack, useTheme } from '@mui/material'
import { useForm, Controller } from 'react-hook-form'

import { MvTypography } from '@/components/atoms/mv-typography'
import { Textarea } from '@/components/atoms/textarea'
import { Checkbox } from '@/components/atoms/checkbox'
import { Button } from '@/components/atoms/button'
import { Input } from '@/components/atoms/input'
import { Modal } from '@/components/molecules/modal'
import { Field } from '@/components/molecules/field'

import { IVehicleModalProps } from '../types/modal.types'
import { generateNextCode } from '../utils/generateNextCode'
import { yupResolver } from '@hookform/resolvers/yup'
import { schemaMDVehicle } from './formVehicle.scema'
import { ActionCreateVehicle, ActionUpdateVehicle } from '../services/action/actionVehicle.service'
import { AllVehicle, GetAllVehicle } from '../services/fetch/fetchAllVehicle.service'
import ButtonAction from '@/components/molecules/button-action'
import { useQueryClient } from '@tanstack/react-query'

export const FormVehicleModal: React.FC<IVehicleModalProps> = ({
  isOpen,
  setIsOpen,
  onClose,
  modalData,
  modalType,
  onSubmit
}) => {
  const theme = useTheme()
  const dataAllVehicle = GetAllVehicle<AllVehicle>()

  const wordingModal = {
    'add-vehicle': {
      title: 'Create Vehicle',
      desc: 'Please fill these informations to create!',
      confirmTitle: 'Are you sure you want to create this vehicle?'
    },
    'edit-vehicle': {
      title: 'Edit Vehicle',
      desc: 'Make changes to edit this vehicle!',
      confirmTitle: 'Are you sure you want to edit this vehicle?'
    }
  }

  const {
    control,
    formState: { errors, isValid },
    trigger,
    reset,
    getValues
  } = useForm({
    resolver: yupResolver(schemaMDVehicle),
    reValidateMode: 'onBlur',
    mode: 'all',
    defaultValues: {
      code: '',
      vehicle_name: '',
      is_active: true,
      description: ''
    }
  })

  useEffect(() => {
    if (modalData) {
      reset({
        code: modalData?.code,
        vehicle_name: modalData?.vehicle_name || '',
        is_active: modalData?.is_active ?? true,
        description: modalData?.description || ''
      })
    } else {
      reset()
    }
  }, [modalData, reset])

  const queryClient = useQueryClient()

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        title={wordingModal[modalType as keyof typeof wordingModal].title}
        description={wordingModal[modalType as keyof typeof wordingModal].desc}
        renderAction={false}
        closeable
      >
        <form>
          <Stack
            width={'100%'}
            rowGap={4}
            sx={{ marginTop: '16px', paddingBottom: '12px' }}
            position={'relative'}
            alignItems={'flex-start'}
          >
            <Field label='Code' helperText={errors?.code?.message as string} error={Boolean(errors?.code?.message)}>
              <Input placeholder='AutoFill' value={'Autofill'} width='100%' disabled />
            </Field>

            <Controller
              name='vehicle_name'
              control={control}
              render={({ field }) => (
                <Field
                  label='Vehicle Name'
                  helperText={errors?.vehicle_name?.message as string}
                  error={Boolean(errors?.vehicle_name?.message)}
                  isRequired
                >
                  <Input {...field} placeholder='Input Vehicle Name' width='100%' />
                </Field>
              )}
            />

            <Controller
              name='description'
              control={control}
              render={({ field }) => (
                <Field
                  label='Description'
                  helperText={errors?.description?.message as string}
                  error={Boolean(errors?.description?.message)}
                >
                  <Textarea {...field} placeholder='Input Description' rows={3} />
                </Field>
              )}
            />

            {modalType === 'edit-vehicle' && (
              <>
                <Controller
                  name='is_active'
                  control={control}
                  render={({ field }) => (
                    <Checkbox {...field} checked={field.value} size='large' label='Set as Active' />
                  )}
                />
                <MvTypography
                  typeSize='PX'
                  size='LABEL_MD_NORMAL'
                  color={theme.colorToken.text.danger.normal}
                  sx={{ marginLeft: '28px', marginTop: '-16px' }}
                >
                  If deactivated, this data record will be hidden and no longer be accessible in dropdown menus or other
                  parts of the application. Use with caution.
                </MvTypography>
              </>
            )}

            <Stack direction='row' width='100%' justifyContent='flex-end' gap={2}>
              <Button
                variant='outlined'
                content='textOnly'
                size='medium'
                text='Cancel'
                onClick={onClose}
                sx={{ paddingY: '8px', paddingX: '6px' }}
              />
              <ButtonAction
                isValid={isValid}
                onClick={() => {
                  trigger()
                }}
                size='medium'
                payload={modalType === 'edit-vehicle' ? modalData : getValues()}
                actionService={async () => {
                  const payload = getValues()
                  const actionPayload = {
                    id: modalData?.id || '',
                    ...payload
                  }
                  if (modalType === 'edit-vehicle') {
                    await ActionUpdateVehicle(actionPayload)
                  } else {
                    try {
                      const refetchData = await dataAllVehicle.refetch()
                      const firstEntry = refetchData?.data?.data?.[0] ?? null
                      if (firstEntry && firstEntry.code && /^VehiCod\d{3}$/.test(firstEntry.code)) {
                        payload.code = generateNextCode(firstEntry.code)
                      } else {
                        payload.code = 'VehiCod001'
                      }
                      await ActionCreateVehicle(payload)
                    } catch (error) {}
                  }
                }}
                confirmationStatusVariant='warning'
                modalOptions='default'
                confirmationText={{
                  negativeLabel: 'Cancel',
                  positiveLabel: 'Yes',
                  title: `Are you sure want to ${modalType === 'edit-vehicle' ? 'edit' : 'create'} Vehicle?`,
                  description: 'You won’t be able to revert this!'
                }}
                alertText={{
                  error: {
                    title: 'Network Errors.',
                    description: 'Unable to connect to the network or server.'
                  },
                  success: {
                    title: 'Successfully save data.',
                    description: 'Vehicle has been saved by our system.'
                  }
                }}
                variant='contained'
                color='primary'
                text='Save'
                content='textOnly'
                onSuccessAddition={() => {
                  queryClient.invalidateQueries()
                  setIsOpen(null)
                }}
              />
            </Stack>
          </Stack>
        </form>
      </Modal>
    </>
  )
}
