import { Button } from '@/components/atoms'
import { Breadcrumbs } from '@/components/atoms/breadcrumbs'
import { Input } from '@/components/atoms/input'
import { MvTypography } from '@/components/atoms/mv-typography'
import ButtonAction from '@/components/molecules/button-action'
import { DateTimePicker } from '@/components/molecules/date-time-picker'
import { Field } from '@/components/molecules/field'
import { SectionGroup } from '@/components/molecules/section-group'
import { TableAppend } from '@/components/molecules/table-append'
import { CustomGridColDef } from '@/components/molecules/table-append/types/tableAppend.type'
import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Grid, Stack, useTheme } from '@mui/material'
import { GridRenderCellParams } from '@mui/x-data-grid'
import React, { useMemo } from 'react'
import { Controller, useFieldArray, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import * as yup from 'yup'

const schema = yup.object().shape({
  from: yup.string().optional(),
  to: yup.string().optional(),
  itr_number: yup.string().optional(),
  transfer_date_request: yup.string().optional(),
  material_list: yup.array().of(
    yup.object().shape({
      material_name: yup.string().required(),
      material_code: yup.string().required(),
      bach_number: yup.string().required(),
      type: yup.string().optional(),
      stock: yup.string().optional(),
      quantity: yup.string().required(),
      unit: yup.string().optional()
    })
  )
})

const PageCreateEditManual: React.FC<{
  type: 'CREATE' | 'EDIT'
}> = ({ type = 'CREATE' }) => {
  const theme = useTheme()
  const navigate = useNavigate()

  const {
    control,
    trigger,
    formState: { errors, isValid }
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema)
  })

  const { fields } = useFieldArray({
    control,
    name: 'material_list'
  })
  // Memoize columns to prevent unnecessary re-renders
  const columns: CustomGridColDef[] = useMemo(
    () => [
      {
        field: 'material_name',
        headerName: 'ITEM NAME',
        width: 200,
        editable: false,
        sortable: false,
        required: true,
        justifyContent: 'flex-start',
        disableColumnMenu: true,
        renderCell: (params: GridRenderCellParams) => (
          <Controller
            name={`material_list.${params.row.index}.material_name`}
            control={control}
            rules={{ required: 'Material is required' }}
            render={({ field, fieldState: { error } }) => (
              <Input
                size='small'
                type='text'
                width='100%'
                value={field.value}
                onChange={field.onChange}
                placeholder='Enter material'
                error={!!error?.message}
                helperText={error?.message?.toString()}
              />
            )}
          />
        )
      },
      {
        field: 'material_code',
        headerName: 'ITEM CODE',
        width: 200,
        editable: false,
        sortable: false,
        required: true,
        justifyContent: 'flex-start',
        disableColumnMenu: true,
        renderCell: (params: GridRenderCellParams) => (
          <Controller
            name={`material_list.${params.row.index}.material_code`}
            control={control}
            rules={{ required: 'Material is required' }}
            render={({ field, fieldState: { error } }) => (
              <Input
                size='small'
                type='text'
                width='100%'
                value={field.value}
                onChange={field.onChange}
                placeholder='Enter material'
                error={!!error?.message}
                helperText={error?.message?.toString()}
              />
            )}
          />
        )
      },
      {
        field: 'bach_number',
        headerName: 'BATCH NUMBER',
        width: 150,
        editable: false,
        sortable: false,
        required: true,
        justifyContent: 'center',
        disableColumnMenu: true,
        renderCell: (params: GridRenderCellParams) => (
          <Controller
            name={`material_list.${params.row.index}.bach_number`}
            control={control}
            rules={{ required: 'Material is required' }}
            render={({ field, fieldState: { error } }) => (
              <Input
                size='small'
                type='text'
                width='100%'
                value={field.value}
                onChange={field.onChange}
                placeholder='Enter material'
                error={!!error?.message}
                helperText={error?.message?.toString()}
              />
            )}
          />
        )
      },
      {
        field: 'type',
        headerName: 'TYPE',
        width: 200,
        editable: false,
        sortable: false,
        required: false,
        justifyContent: 'flex-start',
        disableColumnMenu: true,
        renderCell: (params: GridRenderCellParams) => (
          <Controller
            name={`material_list.${params.row.index}.type`}
            control={control}
            render={({ field, fieldState: { error } }) => (
              <Input
                size='small'
                type='text'
                width='100%'
                value={field.value}
                onChange={field.onChange}
                placeholder='Enter material'
                error={!!error?.message}
                helperText={error?.message?.toString()}
              />
            )}
          />
        )
      },
      {
        field: 'stock',
        headerName: 'STOCK',
        width: 200,
        editable: false,
        sortable: false,
        required: false,
        justifyContent: 'flex-start',
        disableColumnMenu: true,
        renderCell: (params: GridRenderCellParams) => (
          <Controller
            name={`material_list.${params.row.index}.stock`}
            control={control}
            render={({ field, fieldState: { error } }) => (
              <Input
                size='small'
                type='text'
                width='100%'
                value={field.value}
                onChange={field.onChange}
                placeholder='Enter material'
                error={!!error?.message}
                helperText={error?.message?.toString()}
              />
            )}
          />
        )
      },
      {
        field: 'quantity',
        headerName: 'QUANTITY',
        width: 200,
        editable: false,
        sortable: false,
        required: true,
        justifyContent: 'flex-start',
        disableColumnMenu: true,
        renderCell: (params: GridRenderCellParams) => (
          <Controller
            name={`material_list.${params.row.index}.quantity`}
            control={control}
            rules={{ required: 'Material is required' }}
            render={({ field, fieldState: { error } }) => (
              <Input
                size='small'
                type='text'
                width='100%'
                value={field.value}
                onChange={field.onChange}
                placeholder='Enter material'
                error={!!error?.message}
                helperText={error?.message?.toString()}
              />
            )}
          />
        )
      },
      {
        field: 'unit',
        headerName: 'UNIT',
        width: 200,
        editable: false,
        sortable: false,
        required: false,
        justifyContent: 'flex-start',
        disableColumnMenu: true,
        renderCell: (params: GridRenderCellParams) => (
          <Controller
            name={`material_list.${params.row.index}.unit`}
            control={control}
            render={({ field, fieldState: { error } }) => (
              <Input
                size='small'
                type='text'
                width='100%'
                value={field.value}
                onChange={field.onChange}
                placeholder='Enter material'
                error={!!error?.message}
                helperText={error?.message?.toString()}
              />
            )}
          />
        )
      },
      {
        disableColumnMenu: true,
        field: 'delete',
        headerName: '',
        width: 200,
        editable: false,
        sortable: false,
        required: false
      }
    ],
    [control]
  )

  return (
    <Stack width={'100%'} rowGap={'12px'}>
      <MvTypography typeSize={'PX'} size={'TITLE_XL'}>
        {`${type === 'CREATE' ? 'Create' : 'Edit'} Inventory Transfer`}
      </MvTypography>
      <Breadcrumbs
        data={[
          {
            label: 'Home',
            path: '/'
          },
          {
            label: 'Inventory Transfer Request',
            path: 'solutions/dms/inventory-transfer'
          },
          {
            label: `${type === 'CREATE' ? 'Create' : 'Edit'} Inventory Transfer`,
            path: '/'
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
        border={`1px solid ${theme.colorToken.border.neutral.normal}`}
      >
        <Stack width={'100%'} rowGap={2}>
          <MvTypography width={'100%'} typeSize={'PX'} size={'TITLE_SM'}>
            Select Material to Transfer Request
          </MvTypography>
          <MvTypography
            width={'100%'}
            color={theme.colorToken.text.neutral.subtlest}
            typeSize={'PX'}
            size={'SUBTITLE_SM'}
          >
            Please select the Material first to make a transfer request
          </MvTypography>
          <Grid container spacing={4} mt={2}>
            <Grid item xs={6}>
              <Controller
                name='itr_number'
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
                name='transfer_date_request'
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
                      <DateTimePicker type='datePicker' {...rest} />
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
          <Box mt={2}>
            <SectionGroup color='default' title='Item List'>
              <TableAppend
                control={control}
                columns={columns}
                controllerName={'material_list'}
                values={[]}
                initialNewValue={{
                  material_name: '',
                  material_code: '',
                  bach_number: '',
                  type: '',
                  stock: '',
                  quantity: '',
                  unit: ''
                }}
              />
            </SectionGroup>
          </Box>

          <Stack
            width={'100%'}
            justifyContent={'space-between'}
            alignItems={'center'}
            direction='row'
            spacing={2}
            mt={2}
          >
            <Button
              variant='outlined'
              color='primary'
              content='textOnly'
              text='Cancel'
              onClick={() => {
                navigate('/solutions/dms/inventory-transfer')
              }}
              size='large'
            />
            <ButtonAction
              onClick={() => {
                trigger()
              }}
              isValid={isValid}
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
              variant='solid'
              color='primary'
              text='Save'
              content='textOnly'
            ></ButtonAction>
          </Stack>
        </Stack>
      </Box>
    </Stack>
  )
}

export default PageCreateEditManual
