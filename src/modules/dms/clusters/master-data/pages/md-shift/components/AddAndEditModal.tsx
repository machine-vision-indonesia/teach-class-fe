import { Select } from '@/components/atoms'
import { Button } from '@/components/atoms/button'
import { Checkbox } from '@/components/atoms/checkbox'
import { Input } from '@/components/atoms/input'
import { MvTypography } from '@/components/atoms/mv-typography'
import { Radio } from '@/components/atoms/radio'
import ButtonAction from '@/components/molecules/button-action'
import { DateTimePicker } from '@/components/molecules/date-time-picker'
import { Field } from '@/components/molecules/field'
import { Modal } from '@/components/molecules/modal'
import { ActionCreateShift } from '@/modules/dms/clusters/master-data/pages/md-shift/services/action/actionCreateShift.service'
import { ActionUpdateShift } from '@/modules/dms/clusters/master-data/pages/md-shift/services/action/actionUpdateShift.service'
import { useGetMDDriverById } from '@/modules/dms/clusters/master-data/pages/md-shift/services/fetch/fetchStatusById.service'
import { yupResolver } from '@hookform/resolvers/yup'
import { Grid, Stack, useTheme } from '@mui/material'
import { useQueryClient } from '@tanstack/react-query'
import React, { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { EditModalProps } from '../types/addAndEditModal.types'
import { GetTableMDShift } from '../services/table/fetchShiftList.service'
import { generateNextCode } from '../utils/generateNextCode'
import { FormShiftSchema, formShiftSchemaType } from '../utils/formShift.schema'
import { FetchListLocation } from '../services/fetch/fetchListLocation.service'

const COMPANY = {
  id: '6209aa86-c2d8-49e9-8103-fa1d21d27e4d',
  name: 'ZEUS KIMIATAMA INDONESIA, PT.'
}

export const AddAndEditModal: React.FC<EditModalProps> = ({ modalType, id, isOpen, setIsOpen, onClose }) => {
  const queryClient = useQueryClient()
  const theme = useTheme()

  const form = useForm<formShiftSchemaType>({
    mode: 'all',
    reValidateMode: 'onBlur',
    resolver: yupResolver(FormShiftSchema),
    defaultValues: {
      company: COMPANY.name,
      type: 'Regular'
    }
  })

  const shifts = GetTableMDShift()

  const getListLocationQuery = FetchListLocation()

  if (modalType === 'EDIT') {
    const getMDDriverByIdQuery = useGetMDDriverById({ id: id || '' })
    useEffect(() => {
      form.reset({
        name: getMDDriverByIdQuery.data?.data.name,
        type: getMDDriverByIdQuery.data?.data.is_overtime ? 'Overtime' : 'Regular',
        start: getMDDriverByIdQuery.data?.data?.start,
        end: getMDDriverByIdQuery.data?.data?.end,
        company: getMDDriverByIdQuery.data?.data?.company_id?.name || '',
        location: {
          id: getMDDriverByIdQuery.data?.data?.plant_id?.id,
          name: getMDDriverByIdQuery.data?.data?.plant_id?.name
        },
        isActive: getMDDriverByIdQuery.data?.data.is_active
      })
    }, [getMDDriverByIdQuery.data])
  }

  useEffect(() => {
    if (modalType === 'ADD') {
      form.setValue('code', '')
    }
  }, [])

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`${modalType === 'ADD' ? 'Create' : 'Edit'} Shift`}
      description='Please fill these informations to create'
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
        <Controller
          name='name'
          control={form.control}
          render={({ field, fieldState }) => (
            <Field label='Name' isRequired error={fieldState.invalid} helperText={fieldState.error?.message} {...field}>
              <Input placeholder='Shift name...' width='100%' />
            </Field>
          )}
        />
        <Controller
          name='type'
          control={form.control}
          render={({ field, fieldState }) => (
            <Field
              label='Shift Type'
              isRequired
              error={fieldState.invalid}
              helperText={fieldState.error?.message}
              {...field}
            >
              <Stack direction={'row'} gap={2} alignItems={'center'}>
                <Radio
                  color={'primary'}
                  label='Regular'
                  checked={form.watch('type') === 'Regular'}
                  onChange={() => field.onChange('Regular')}
                  value={'Regular'}
                />
                <Radio
                  color={'primary'}
                  label='Overtime'
                  checked={form.watch('type') === 'Overtime'}
                  onChange={() => field.onChange('Overtime')}
                  value={'Overtime'}
                />
              </Stack>
            </Field>
          )}
        />
        <Grid container columns={{ xs: 1, sm: 3, md: 3 }} spacing={4}>
          <Grid item xs={1}>
            <Controller
              name='start'
              control={form.control}
              render={({ field, fieldState }) => (
                <Field label='Start Shift' isRequired error={fieldState.invalid} helperText={fieldState.error?.message}>
                  <DateTimePicker onChange={field.onChange} type='timePicker' value={new Date(field.value)} />
                </Field>
              )}
            />
          </Grid>
          <Grid item xs={1}>
            <Controller
              name='end'
              control={form.control}
              render={({ field, fieldState }) => (
                <Field label='End Shift' isRequired error={fieldState.invalid} helperText={fieldState.error?.message}>
                  <DateTimePicker onChange={field.onChange} type='timePicker' value={new Date(field.value)} />
                </Field>
              )}
            />
          </Grid>
        </Grid>
        <Controller
          name='company'
          control={form.control}
          render={({ field, fieldState }) => (
            <Field
              label='Company'
              isRequired
              error={fieldState.invalid}
              helperText={fieldState.error?.message}
              {...field}
            >
              <Input placeholder='Company' disabled width='100%' />
            </Field>
          )}
        />
        <Controller
          name='location'
          control={form.control}
          render={({ field, fieldState }) => (
            <Field
              label='Location'
              isRequired
              error={fieldState.invalid}
              helperText={fieldState.error?.message}
              {...field}
            >
              <Select
                loading={getListLocationQuery.isLoading}
                data={getListLocationQuery.data?.data || []}
                labelKey='name'
                valueKey='id'
              />
            </Field>
          )}
        />

        {modalType === 'EDIT' ? (
          <>
            <Controller
              name='isActive'
              control={form.control}
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
        ) : null}

        <Stack direction={'row'} width={'100%'} justifyContent={'flex-end'} gap={2}>
          <Button
            variant={'outlined'}
            content='textOnly'
            size='medium'
            text='Cancel'
            onClick={onClose}
            sx={{
              minWidth: 0,
              paddingY: '8px',
              paddingX: '12px'
            }}
          />
          {modalType === 'EDIT' ? (
            <ButtonAction
              isValid={form.formState.isValid}
              size='medium'
              payload={null}
              actionService={() => {
                const payload = form.getValues()

                ActionUpdateShift(id, {
                  name: payload.name,
                  code: payload.code,
                  start: payload.start,
                  end: payload.end,
                  is_overtime: payload.type === 'Overtime',
                  company_id: COMPANY.id,
                  plant_id: payload.location.id,
                  is_active: !!payload.isActive
                })
              }}
              confirmationStatusVariant='warning'
              modalOptions='default'
              confirmationText={{
                negativeLabel: 'Cancel',
                positiveLabel: 'Yes',
                title: 'Are you sure want to edit shift?',
                description: 'You won’t be able to revert this!'
              }}
              alertText={{
                error: {
                  title: 'Network Errors.',
                  description: 'Unable to connect to the network or server.'
                },
                success: {
                  title: 'Successfully save data.',
                  description: 'Shift has been saved by our system.'
                }
              }}
              variant='contained'
              color='primary'
              text='Save'
              content='textOnly'
              onClick={() => {
                form.trigger()
              }}
              onSuccessAddition={() => {
                queryClient.invalidateQueries()
                setIsOpen(false)
              }}
            />
          ) : (
            <ButtonAction
              isValid={form.formState.isValid}
              size='medium'
              payload={null}
              actionService={async () => {
                const payload = form.getValues()
                try {
                  await shifts.refetch()

                  const firstEntry = shifts?.data?.data?.[0] ?? null

                  if (firstEntry && firstEntry.code && /^ShiftCod\d{3}$/.test(firstEntry.code)) {
                    payload.code = generateNextCode(firstEntry.code)
                  } else {
                    payload.code = 'ShiftCod001'
                  }

                  await ActionCreateShift({
                    name: payload.name,
                    code: payload.code,
                    start: payload.start,
                    end: payload.end,
                    is_overtime: payload.type === 'Overtime',
                    company_id: COMPANY.id,
                    plant_id: payload.location.id
                  })
                } catch (error) {}
              }}
              confirmationStatusVariant='warning'
              modalOptions='default'
              confirmationText={{
                negativeLabel: 'Cancel',
                positiveLabel: 'Yes',
                title: 'Are you sure want to create shift?',
                description: 'You won’t be able to revert this!'
              }}
              alertText={{
                error: {
                  title: 'Network Errors.',
                  description: 'Unable to connect to the network or server.'
                },
                success: {
                  title: 'Successfully save data.',
                  description: 'Shift has been saved by our system.'
                }
              }}
              variant='contained'
              color='primary'
              text='Save'
              content='textOnly'
              onClick={() => {
                form.trigger()
              }}
              onSuccessAddition={() => {
                queryClient.invalidateQueries()
                setIsOpen(false)
              }}
            />
          )}
        </Stack>
      </Stack>
    </Modal>
  )
}
