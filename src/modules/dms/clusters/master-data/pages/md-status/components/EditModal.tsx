import React, { useEffect, useState } from 'react'
import { EditModalProps } from '../types/editModal.types'
import { Modal } from '@/components/molecules/modal'
import { Grid, Stack, useTheme } from '@mui/material'
import { Field } from '@/components/molecules/field'
import { Input } from '@/components/atoms/input'
import dynamic from 'next/dynamic'
import { Button, Textarea } from '@/components/atoms'
import { useGetMDStatusById } from '../services/fetch/fetchStatusById.service'
import { editModalSchema, editSchemaType } from '../utils/editModal.schema'
import { Controller, useForm } from 'react-hook-form'
import { MvTypography } from '@/components/atoms/mv-typography'
import ButtonAction from '@/components/molecules/button-action'
import { useQueryClient } from '@tanstack/react-query'
import { ActionUpdateStatus } from '../services/action/actionUpdateStatus.service'
import { yupResolver } from '@hookform/resolvers/yup'

const ColorPicker = dynamic(() => import('@/components/molecules/color-picker/').then(module => module.ColorPicker), {
  ssr: false,
  loading: () => <p>Loading...</p>
})

export const EditModal: React.FC<EditModalProps> = ({ id, setId, isOpen, setIsOpen, onClose }) => {
  const theme = useTheme()
  const {
    register,
    setValue,
    watch,
    trigger,
    getValues,
    control,
    formState: { errors, isValid }
  } = useForm<editSchemaType>({
    resolver: yupResolver(editModalSchema),
    mode: 'all',
    reValidateMode: 'onBlur'
  })

  const status = useGetMDStatusById({
    id: id || ''
  })

  const queryClient = useQueryClient()

  const [payloadData, setPayloadData] = useState({})

  useEffect(() => {
    if (status?.data?.data) {
      const data = status.data.data
      setValue('category', data.category_id.category_name)
      setValue('name', data.name)
      setValue('color', data.color ?? theme.colorToken.background.primary.normal)
      setValue('description', data?.description || '')
    }
  }, [status.isSuccess])

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        title='Edit Status'
        description='Make change to edit this status!'
        renderAction={false}
        closeable
      >
        <Stack
          width={'100%'}
          rowGap={4}
          sx={{
            marginTop: '16px',
            paddingBottom: '12px'
          }}
          position={'relative'}
        >
          <Grid container columns={{ xs: 2 }} columnSpacing={4}>
            <Grid item xs={1}>
              <Controller
                name='category'
                control={control}
                render={({ field, fieldState }) => (
                  <Field
                    label='Category'
                    isRequired
                    error={fieldState.invalid}
                    helperText={fieldState.error?.message}
                    {...field}
                  >
                    <Input placeholder='Category' disabled width='100%' />
                  </Field>
                )}
              />
            </Grid>
            <Grid item xs={1}>
              <Controller
                name='name'
                control={control}
                render={({ field, fieldState }) => (
                  <Field
                    label='Status Name'
                    isRequired
                    error={fieldState.invalid}
                    helperText={fieldState.error?.message}
                    {...field}
                  >
                    <Input placeholder='Status Name' width='100%' />
                  </Field>
                )}
              />
            </Grid>
          </Grid>
          <Field label='Arrival Code' isRequired sx={{ position: 'relative' }}>
            <Stack direction={'row'} width={'100%'} gap={2} alignItems={'start'} position={'relative'}>
              <ColorPicker
                size={'small'}
                {...register('color')}
                onChange={color => {
                  setValue('color', `#${color}`)
                }}
                defaultValue={
                  status.data?.data.color
                    ? status.data?.data.color.startsWith('#')
                      ? watch('color')
                      : `#${watch('color')}`
                    : theme.colorToken.background.primary.normal
                }
                isPreview
                nameText='Preview'
              />
            </Stack>
            {errors.color && (
              <MvTypography typeSize='PX' size='HELPER_TEXT_SM' color='red'>
                {errors.color.message}
              </MvTypography>
            )}
          </Field>
          <Controller
            name='description'
            control={control}
            render={({ field, fieldState }) => (
              <Field label='Description' {...field}>
                <Textarea
                  style={{
                    minWidth: '100%',
                    maxWidth: '100%'
                  }}
                />
              </Field>
            )}
          />
          <Stack direction={'row'} width={'100%'} justifyContent={'flex-end'} gap={2}>
            <Button
              variant={'outlined'}
              content='textOnly'
              size='medium'
              text='Cancel'
              onClick={onClose}
              sx={{
                paddingY: '8px',
                paddingX: '6px'
              }}
            />
            <ButtonAction
              isValid={isValid}
              onClick={async () => {
                const isValid = await trigger()
                if (isValid) {
                  const data = getValues()
                  setPayloadData(data)
                }
              }}
              size='medium'
              payload={payloadData}
              actionService={() => {
                const payload = getValues()
                const actionPayload = {
                  id: id,
                  ...payload
                }

                ActionUpdateStatus(actionPayload)
              }}
              confirmationStatusVariant='warning'
              modalOptions='default'
              confirmationText={{
                negativeLabel: 'Cancel',
                positiveLabel: 'Yes',
                title: 'Are you sure want to edit status?',
                description: 'You won’t be able to revert this!'
              }}
              alertText={{
                error: {
                  title: 'Network Errors.',
                  description: 'Unable to connect to the network or server.'
                },
                success: {
                  title: 'Successfully save data.',
                  description: 'Status has been saved by our system.'
                }
              }}
              variant='contained'
              color='primary'
              text='Save'
              content='textOnly'
              onSuccessAddition={() => {
                queryClient.invalidateQueries()
                setIsOpen(false)
              }}
            />
          </Stack>
        </Stack>
      </Modal>
    </>
  )
}
