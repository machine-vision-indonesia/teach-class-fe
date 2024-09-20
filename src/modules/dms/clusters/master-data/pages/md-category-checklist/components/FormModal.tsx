import React, { useEffect, useState } from 'react'
import { FormModalProps } from '../types/formModal.types'
import { Modal } from '@/components/molecules/modal'
import { Stack, useTheme } from '@mui/material'
import { Button } from '@/components/atoms/button'
import { Field } from '@/components/molecules/field'
import { Input } from '@/components/atoms/input'
import { Textarea } from '@/components/atoms/textarea'
import { Checkbox } from '@/components/atoms/checkbox'
import { MvTypography } from '@/components/atoms/mv-typography'
import { Controller, useForm } from 'react-hook-form'
import { useGetMDCategoryChecklistById } from '../services/fetch/fetchCategoryChecklistById.service'
import { useQueryClient } from '@tanstack/react-query'
import ButtonAction from '@/components/molecules/button-action'
import { categoryChecklistSchema, categoryChecklistSchemaType } from '../utils/categoryChecklist.schema'
import { ActionUpdateCategoryChecklist } from '../services/action/actionUpdateCategoryChecklist.service'
import { ActionCreateCategoryChecklist } from '../services/action/actionCreateCategoryChecklist.service'
import { GetTableMDCategoryChecklist } from '../services/table/fetchCategoryChecklist.service'
import { generateNextCode } from '../utils/generateNextCode'
import { yupResolver } from '@hookform/resolvers/yup'

export const FormModal: React.FC<FormModalProps> = ({
  id,
  setId,
  isOpen,
  setIsOpen,
  onClose,
  actionType = 'CREATE'
}) => {
  const theme = useTheme()
  const {
    register,
    reset,
    setValue,
    watch,
    trigger,
    getValues,
    control,
    formState: { errors, isValid }
  } = useForm<categoryChecklistSchemaType>({
    resolver: yupResolver(categoryChecklistSchema),
    mode: 'all',
    reValidateMode: 'onBlur'
  })

  const categories = GetTableMDCategoryChecklist()

  const categoryChecklist = useGetMDCategoryChecklistById({
    id: id || ''
  })

  const queryClient = useQueryClient()

  const [payloadData, setPayloadData] = useState({})

  useEffect(() => {
    if (actionType === 'UPDATE' && categoryChecklist?.data?.data) {
      const data = categoryChecklist.data.data
      setValue('code', data.code)
      setValue('name', data.name)
      setValue('description', data?.description || '')
      setValue('is_active', data.is_active ?? false)
    } else {
      reset({
        code: '',
        name: '',
        description: '',
        is_active: false
      })
    }
  }, [categoryChecklist?.data?.data])

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        title={`${actionType === 'CREATE' ? 'Create' : 'Edit'} Category Checklist`}
        description='Please fill these informations to edit!'
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
          alignItems={'flex-start'}
        >
          <Field label='Code'>
            {actionType === 'UPDATE' ? (
              <Input disabled placeholder='Autofill' value={watch('code')} {...register('code')} width='100%' />
            ) : (
              <Input disabled placeholder='Autofill' width='100%' />
            )}
          </Field>
          <Controller
            name='name'
            control={control}
            render={({ field, fieldState }) => (
              <Field
                label='Name'
                isRequired
                error={fieldState.invalid}
                helperText={fieldState.error?.message}
                {...field}
              >
                <Input placeholder='Category Name...' width='100%' />
              </Field>
            )}
          />
          <Controller
            name='description'
            control={control}
            render={({ field }) => (
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
          {actionType === 'UPDATE' && (
            <>
              <Controller
                name='is_active'
                control={control}
                render={({ field }) => (
                  <Checkbox size='large' checked={!!field.value} onChange={field.onChange} label='Set as Active' />
                )}
              />
              <MvTypography
                typeSize={'PX'}
                size={'LABEL_MD_NORMAL'}
                color={theme.colorToken.text.danger.normal}
                sx={{
                  marginLeft: '28px',
                  marginTop: '-16px'
                }}
              >
                If deactivated, this data record will hidden and no longer be accessible in such as dropdown value and
                other parts of the application. Use with caution.
              </MvTypography>
            </>
          )}
          <Stack direction={'row'} width={'100%'} justifyContent={'flex-end'} gap={2} sx={{ marginTop: '24px' }}>
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
              actionService={async () => {
                const payload = getValues()
                const actionPayload = {
                  id: id || '',
                  ...payload
                }

                if (actionType === 'CREATE') {
                  try {
                    await categories.refetch()

                    const firstEntry = categories?.data?.data?.[0] ?? null

                    if (firstEntry && firstEntry.code && /^CatCod\d{3}$/.test(firstEntry.code)) {
                      payload.code = generateNextCode(firstEntry.code)
                    } else {
                      payload.code = 'CatCod001'
                    }

                    await ActionCreateCategoryChecklist(payload)
                  } catch (error) {}
                }

                if (actionType === 'UPDATE') {
                  ActionUpdateCategoryChecklist(actionPayload)
                }
              }}
              confirmationStatusVariant='warning'
              modalOptions='default'
              confirmationText={{
                negativeLabel: 'Cancel',
                positiveLabel: 'Yes',
                title: `Are you sure want to ${actionType === 'CREATE' ? 'create' : 'edit'} category checklist?`,
                description: 'You won’t be able to revert this!'
              }}
              alertText={{
                error: {
                  title: 'Network Errors.',
                  description: 'Unable to connect to the network or server.'
                },
                success: {
                  title: 'Successfully save data.',
                  description: 'Category checklist has been saved by our system.'
                }
              }}
              variant='contained'
              color='primary'
              text='Save'
              content='textOnly'
              onError={() => {
                queryClient.invalidateQueries()
                setId('')
                setIsOpen(false)
              }}
              onSuccessAddition={() => {
                queryClient.invalidateQueries()
                setId('')
                setIsOpen(false)
              }}
            />
          </Stack>
        </Stack>
      </Modal>
    </>
  )
}
