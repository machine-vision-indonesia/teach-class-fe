import { Button } from '@/components/atoms'
import { Box, Grid, Stack, useTheme } from '@mui/material'
import { useAtom } from 'jotai'
import { useStepAction } from '../../hooks/step.hook'
import { activeStepAtom } from '../../stores/step.store'
import { StepState } from '../../constant/step.constant'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Field } from '@/components/molecules/field'
import { Input } from '@/components/atoms/input'
import { SectionGroup } from '@/components/molecules/section-group'
import ButtonAction from '@/components/molecules/button-action'
import { MvTypography } from '@/components/atoms/mv-typography'
import { useMemo } from 'react'
import { Table } from '@/components/molecules'
import { columns } from './Step2.constant'
import { DateTimePicker } from '@/components/molecules/date-time-picker'

const schema = yup.object().shape({
  from: yup.string().required(),
  to: yup.string().required(),
  itrNumber: yup.string().required(),
  transferDateRequest: yup.string().required()
})

export const Step2 = () => {
  const col = useMemo(() => columns, [])
  const theme = useTheme()

  const [activeStep] = useAtom(activeStepAtom)
  const { handleBackFrom, handleCancel, handleNextFrom } = useStepAction()

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  })
  return (
    <Box
      borderRadius={'6px'}
      display={'flex'}
      flexDirection={'column'}
      alignItems={'flex-start'}
      rowGap={'16px'}
      padding={'16px'}
      marginTop={'12px'}
      width={'100%'}
      border={`1px solid ${theme.colorToken.border.neutral.normal}`}
    >
      <MvTypography width={'100%'} typeSize={'PX'} size={'TITLE_SM'}>
        Transfer Plan
      </MvTypography>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Controller
            name='itrNumber'
            control={control}
            render={({ field: { name, ...rest }, fieldState }) => {
              return (
                <Field
                  size='medium'
                  label='ITR Number'
                  error={fieldState.invalid}
                  helperText={errors && errors[name]?.message}
                  fullWidth
                  {...rest}
                >
                  <Input {...rest} disabled />
                </Field>
              )
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <Controller
            name='transferDateRequest'
            control={control}
            render={({ field: { name, ...rest }, fieldState }) => {
              return (
                <Field
                  size='medium'
                  label='Transfer Date Request'
                  isRequired
                  error={fieldState.invalid}
                  helperText={errors && errors[name]?.message}
                  fullWidth
                  {...rest}
                >
                  <DateTimePicker type='datePicker' />
                </Field>
              )
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <Controller
            name='from'
            control={control}
            render={({ field: { name, ...rest }, fieldState }) => {
              return (
                <Field
                  size='medium'
                  label='From'
                  error={fieldState.invalid}
                  helperText={errors && errors[name]?.message}
                  fullWidth
                  {...rest}
                >
                  <Input {...rest} disabled />
                </Field>
              )
            }}
          />{' '}
        </Grid>
        <Grid item xs={6}>
          <Controller
            name='to'
            control={control}
            render={({ field: { name, ...rest }, fieldState }) => {
              return (
                <Field
                  size='medium'
                  label='To'
                  error={fieldState.invalid}
                  helperText={errors && errors[name]?.message}
                  fullWidth
                  {...rest}
                >
                  <Input {...rest} disabled />
                </Field>
              )
            }}
          />{' '}
        </Grid>
      </Grid>

      <SectionGroup color='default' title='Material List'>
        <Table
          checkboxSelection
          onRowSelectionModelChange={par => {}}
          columns={col}
          rows={[
            {
              id: 1,
              material_name: 'Steel Rod',
              material_code: 'SR-102',
              bach_number: 'BN-345',
              from: 'Warehouse A',
              to: 'Site B',
              type: 'Raw Material',
              quantity: 150,
              unit: 'kg'
            },
            {
              id: 2,

              material_name: 'Copper Wire',
              material_code: 'CW-204',
              bach_number: 'BN-678',
              from: 'Warehouse C',
              to: 'Site D',
              type: 'Finished Goods',
              quantity: 200,
              unit: 'meters'
            },
            {
              id: 3,

              material_name: 'Aluminum Sheet',
              material_code: 'AS-309',
              bach_number: 'BN-910',
              from: 'Warehouse B',
              to: 'Site A',
              type: 'Raw Material',
              quantity: 300,
              unit: 'sheets'
            },
            {
              id: 4,

              material_name: 'Plastic Pipe',
              material_code: 'PP-453',
              bach_number: 'BN-112',
              from: 'Warehouse D',
              to: 'Site C',
              type: 'Raw Material',
              quantity: 120,
              unit: 'meters'
            },
            {
              id: 5,
              material_name: 'Glass Panel',
              material_code: 'GP-876',
              bach_number: 'BN-321',
              from: 'Warehouse E',
              to: 'Site F',
              type: 'Finished Goods',
              quantity: 50,
              unit: 'panels'
            }
          ]}
        />
      </SectionGroup>

      <Stack width={'100%'} justifyContent={'space-between'} alignItems={'center'} direction='row' spacing={2}>
        {activeStep === 0 ? (
          <Button
            variant='outlined'
            color='primary'
            content='textOnly'
            text='Cancel'
            onClick={handleCancel}
            sx={{ paddingX: '16px', paddingY: '12px', minWidth: 0 }}
          />
        ) : (
          <Button
            variant='outlined'
            color='primary'
            content='textOnly'
            onClick={() => handleBackFrom(StepState.SELECT_MATERIAL)}
            text='Back'
            sx={{ paddingX: '16px', paddingY: '12px', minWidth: 0 }}
          />
        )}
        <ButtonAction
          size='large'
          payload={{}}
          actionService={() => {}}
          confirmationStatusVariant='warning'
          modalOptions='default'
          confirmationText={{
            negativeLabel: 'Cancel',
            positiveLabel: 'Yes',
            title: 'Are you sure want to Save Transfer Request?',
            description: 'You won’t be able to revert this!'
          }}
          alertText={{
            error: {
              title: 'Network Errors.',
              description: 'Unable to connect to the network or server.'
            },
            success: {
              title: 'Successfully save data.',
              description: 'Inventory request has been saved by our system.'
            }
          }}
          variant='contained'
          color='primary'
          text='Save'
          content='textOnly'
        ></ButtonAction>
      </Stack>
    </Box>
  )
}
