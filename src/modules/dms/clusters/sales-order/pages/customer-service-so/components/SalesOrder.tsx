import { ButtonCopy } from '@/components/atoms/button-copy'
import { Input } from '@/components/atoms/input'
import { MvTypography } from '@/components/atoms/mv-typography'
import { Select } from '@/components/atoms/select'
import { Textarea } from '@/components/atoms/textarea'
import { Alert } from '@/components/molecules/alert'
import { ChecklistGroup } from '@/components/molecules/checklist-group'
import { ChecklistRequest } from '@/components/molecules/checklist-request'
import { Field } from '@/components/molecules/field'
import { TableAppend } from '@/components/molecules/table-append'
import { GetTableUsers } from '@/components/molecules/table-append/services/example.service'
import { CustomGridColDef } from '@/components/molecules/table-append/types/tableAppend.type'
import { Autocomplete, Box, Grid, Stack, useTheme } from '@mui/material'
import { GridRenderCellParams } from '@mui/x-data-grid'
import React, { useMemo } from 'react'
import { Controller, useFieldArray, useForm } from 'react-hook-form'
import { ISalesOrder } from '../types/salesOrder.types'
import { PageType } from '@/modules/dms/common/constants'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

export const SalesOrder: React.FC<ISalesOrder> = ({ pageType = PageType.ADD }) => {
  const theme = useTheme()

  const schema = yup.object().shape({
    material_list: yup.array().of(
      yup.object().shape({
        material: yup.string().required().default(''),
        material_code: yup.string().required().default(''),
        type: yup.string().optional().default(''),
        quantity: yup.string().required().default(''),
        unit: yup.string().optional().default('')
      })
    )
  })

  const { data, isLoading } = GetTableUsers({})

  const { control, handleSubmit } = useForm({
    // defaultValues: {
    //   rows: []
    // },
    mode: 'onChange',
    resolver: yupResolver(schema)
  })

  // Memoize columns to prevent unnecessary re-renders
  const columns: CustomGridColDef[] = useMemo(
    () => [
      {
        field: 'material',
        headerName: 'MATERIAL',
        flex: 1,
        minWidth: 200,
        maxWidth: 320,
        editable: false,
        sortable: false,
        disableColumnMenu: true,
        required: true,
        renderCell: (params: GridRenderCellParams) => {
          const rowIndex = params.api.getAllRowIds().indexOf(params.id)

          return (
            <Controller
              name={`rows.${rowIndex}.material`}
              control={control}
              rules={{ required: 'Material is required' }}
              render={({ field, fieldState: { error } }) => (
                <Autocomplete
                  size='small'
                  loading={isLoading}
                  options={data?.data ?? []}
                  getOptionLabel={option => option.email || ''}
                  onChange={(event, newValue) => {
                    field.onChange(newValue?.id || '')
                  }}
                  sx={{ width: '100%' }}
                  renderInput={params => (
                    <Input
                      {...params}
                      width='100%'
                      fullWidth={true}
                      size='small'
                      placeholder='Select Material'
                      error={!!error?.message}
                      helperText={error?.message?.toString()}
                    />
                  )}
                />
              )}
            />
          )
        }
      },
      {
        field: 'material_code',
        headerName: 'MATERIAL CODE',
        flex: 1,
        minWidth: 200,
        maxWidth: 320,
        editable: false,
        sortable: false,
        disableColumnMenu: true,
        required: true,
        renderCell: (params: GridRenderCellParams) => {
          const rowIndex = params.api.getAllRowIds().indexOf(params.id)

          return (
            <Controller
              name={`rows.${rowIndex}.material`}
              control={control}
              rules={{ required: 'Material is required' }}
              render={({ field, fieldState: { error } }) => (
                <Autocomplete
                  size='small'
                  loading={isLoading}
                  options={data?.data ?? []}
                  getOptionLabel={option => option.email || ''}
                  onChange={(event, newValue) => {
                    field.onChange(newValue?.id || '')
                  }}
                  sx={{ width: '100%' }}
                  renderInput={params => (
                    <Input
                      {...params}
                      width='100%'
                      fullWidth={true}
                      size='small'
                      placeholder='Select Material Code'
                      error={!!error?.message}
                      helperText={error?.message?.toString()}
                    />
                  )}
                />
              )}
            />
          )
        }
      },
      {
        field: 'type',
        headerName: 'TYPE',
        width: 200,
        editable: false,
        sortable: false,
        disableColumnMenu: true,
        required: true,
        renderCell: (params: GridRenderCellParams) => {
          const rowIndex = params.api.getAllRowIds().indexOf(params.id)

          return (
            <Controller
              name={`rows.${rowIndex}.type`}
              control={control}
              rules={{ required: 'Type is required' }}
              render={({ field, fieldState: { error } }) => (
                <Autocomplete
                  disabled
                  size='small'
                  loading={isLoading}
                  options={data?.data ?? []}
                  getOptionLabel={option => option.email || ''}
                  onChange={(event, newValue) => {
                    field.onChange(newValue?.id || '')
                  }}
                  sx={{ width: '100%' }}
                  renderInput={params => (
                    <Input
                      {...params}
                      width='100%'
                      fullWidth={true}
                      size='small'
                      placeholder='Type'
                      error={!!error?.message}
                      helperText={error?.message?.toString()}
                    />
                  )}
                />
              )}
            />
          )
        }
      },
      {
        field: 'quantity',
        headerName: 'QUANTITY',
        width: 200,
        editable: false,
        sortable: false,
        disableColumnMenu: true,
        required: true,
        renderCell: (params: GridRenderCellParams) => {
          const rowIndex = params.api.getAllRowIds().indexOf(params.id)

          return (
            <Controller
              name={`rows.${rowIndex}.quantity`}
              control={control}
              rules={{ required: 'Quantity is required' }}
              render={({ field, fieldState: { error } }) => (
                <Input
                  size='medium'
                  type='number'
                  width='100%'
                  value={field.value}
                  onChange={field.onChange}
                  placeholder='Enter quantity'
                  error={!!error?.message}
                  helperText={error?.message?.toString()}
                />
              )}
            />
          )
        }
      },
      {
        field: 'unit',
        headerName: 'UNIT',
        width: 200,
        editable: false,
        sortable: false,
        disableColumnMenu: true,
        required: true,
        renderCell: (params: GridRenderCellParams) => {
          const rowIndex = params.api.getAllRowIds().indexOf(params.id)

          return (
            <Controller
              name={`rows.${rowIndex}.quantity`}
              control={control}
              rules={{ required: 'Quantity is required' }}
              render={({ field, fieldState: { error } }) => (
                <Input
                  size='medium'
                  disabled
                  type='text'
                  width='100%'
                  value={field.value}
                  onChange={field.onChange}
                  placeholder='Unit'
                  error={!!error?.message}
                  helperText={error?.message?.toString()}
                />
              )}
            />
          )
        }
      },
      {
        field: 'delete',
        headerName: '',
        width: 200,
        editable: false,
        sortable: false,
        disableColumnMenu: true,
        required: false
      }
    ],
    [control, data, isLoading]
  )
  return (
    <Stack width={'100%'} alignItems={'flex-start'} rowGap={'18px'}>
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
            Sales Order Information
          </MvTypography>
          <MvTypography typeSize={'PX'} size={'BODY_MD_NORMAL'} color={theme.palette.neutral[400]}>
            Please complete the form below to continue the process
          </MvTypography>
        </Stack>
        <Alert
          title={
            pageType === PageType.ADD
              ? 'SO is not yet connected to intacs. Please copy the SO Id to intacs.'
              : 'When changing the item quantity, you also need to adjust the delivery plan!'
          }
          variant='warning'
          size='small'
        />
      </Box>
      <Grid container columns={{ xs: 1, sm: 2, md: 3 }} spacing={5}>
        <Grid item xs={1}>
          <Field label='PO Number Customer'>
            <Input placeholder='-' value={'-'} width='100%' disabled />
          </Field>
        </Grid>
        <Grid item xs={1}>
          <Field label='ID SO DMS'>
            <Stack direction={'row'} alignItems={'center'} spacing={'10px'}>
              <Input placeholder='-' value={'7867686'} width='100%' disabled />
              <ButtonCopy value={'7867686'} title={'ID SO DMS'} variant='contained' />
            </Stack>
          </Field>
        </Grid>
        <Grid item xs={1}>
          <Field label='Customer'>
            <Select data={[]} labelKey={''} valueKey={''} placeholder='Select Customer' />
          </Field>
        </Grid>
        <Grid item xs={1} sm={2} md={3}>
          <Field label='Delivery Address'>
            <Textarea onChange={() => {}} disabled placeholder='Autofill' />
          </Field>
        </Grid>
        <Grid item xs={1} sm={2} md={3}>
          <Field label='Description'>
            <Textarea onChange={() => {}} placeholder='Input Remark' />
          </Field>
        </Grid>
      </Grid>
      <Box
        width={'100%'}
        flexDirection={'column'}
        alignItems={'flex-start'}
        border={`1px solid ${theme.colorToken.border.neutral.normal}`}
        borderRadius={'6px'}
      >
        <Box width={'100%'} padding={'12px'} borderBottom={`1px solid ${theme.colorToken.border.neutral.normal}`}>
          <MvTypography typeSize={'PX'} size={'BODY_LG_BOLDEST'}>
            Material Request
          </MvTypography>
        </Box>
        <Box padding={'12px'}>
          <TableAppend
            columns={columns}
            textButton='Add Material'
            sx={{
              '& .MuiDataGrid-cell': {
                border: 0
              }
            }}
            controllerName={'material_list'}
            control={control}
            values={[]}
            initialNewValue={{
              material: '',
              material_code: '',
              type: '',
              quantity: 0,
              unit: ''
            }}
          />
        </Box>
      </Box>
      <Box width={'100%'}>
        <ChecklistGroup
          title={'Order Request Checklist'}
          checklistRequests={[
            <ChecklistRequest
              title='Document/Label/Stiker'
              options={[
                { id: 'surat_jalan', label: 'Surat Jalan' },
                { id: 'coa', label: 'COA' },
                { id: 'msds', label: 'MSDS' },
                { id: 'packing_list', label: 'Packing List' },
                { id: 'surat_pernyataan_bermaterai', label: 'Surat Pernyataan Bermaterai' },
                { id: 'po', label: 'PO' },
                { id: 'titipan_dokumen', label: 'Titipan Dokumen' },
                { id: 'label_product', label: 'Label Product' },
                { id: 'hazzard_nfpa', label: 'Hazzard + NFPA' }
              ]}
              valueKey='id'
              labelKey='label'
              value={[]}
            />,
            <ChecklistRequest
              title='Packing'
              options={[
                { id: 'strapping', label: 'Strapping' },
                { id: 'wrapping', label: 'Wrapping' },
                { id: 'shipping_marks', label: 'Shipping Marks' },
                { id: 'hazzard_nfpa', label: 'Hazzard + NFPA' },
                { id: 'label_product', label: 'Label Product' },
                { id: 'msds', label: 'MSDS' },
                { id: 'pallet', label: 'Pallet' },
                { id: 'ibc_frame', label: 'IBC Frame' }
              ]}
              valueKey='id'
              labelKey='label'
              value={[]}
            />
          ]}
        />
      </Box>
    </Stack>
  )
}
