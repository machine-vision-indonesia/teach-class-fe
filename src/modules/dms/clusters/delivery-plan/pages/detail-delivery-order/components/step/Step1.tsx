import { Input } from '@/components/atoms/input'
import { MvTypography } from '@/components/atoms/mv-typography'
import { ChecklistGroup } from '@/components/molecules/checklist-group'
import { ChecklistRequest } from '@/components/molecules/checklist-request'
import { Field } from '@/components/molecules/field'
import { SelectAsync } from '@/components/molecules/select-async'
import { Table } from '@/components/molecules/table'
import { UploadFile } from '@/components/molecules/upload-file'
import { formatDateString } from '@/modules/dms/common/utils'
import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Grid, useTheme } from '@mui/material'
import Stack from '@mui/material/Stack'
import { GridColDef } from '@mui/x-data-grid'
import React from 'react'
import { Controller, useForm, useFormContext } from 'react-hook-form'
import * as yup from 'yup'

export const Step1 = () => {
  const theme = useTheme()

  const formContext = useFormContext()

  const columns: GridColDef[] = [
    {
      field: 'material_name',
      headerName: 'MATERIAL',
      flex: 1,
      minWidth: 180,
      maxWidth: 220
    },
    {
      field: 'material_code',
      headerName: 'MATERIAL CODE',
      flex: 1,
      minWidth: 180,
      maxWidth: 220
    },
    {
      field: 'type',
      headerName: 'TYPE',
      flex: 1,
      minWidth: 180,
      maxWidth: 220
    },
    {
      field: 'qty_request',
      headerName: 'QTY REQUEST',
      flex: 1,
      minWidth: 180,
      maxWidth: 220
    },
    {
      field: 'unit',
      headerName: 'UNIT',
      flex: 1,
      minWidth: 180,
      maxWidth: 220
    },
    {
      field: 'actual_qty',
      headerName: 'ACTUAL QTY',
      flex: 1,
      minWidth: 180,
      maxWidth: 220
    }
  ]

  return (
    <Stack width={'100%'} alignItems={'start'} rowGap={'12px'}>
      {/* sales order information */}
      <Box width={'100%'} border={`1px solid ${theme.colorToken.border.neutral.normal}`} borderRadius={'6px'}>
        <Box width={'100%'} padding={'12px'} borderBottom={`1px solid ${theme.colorToken.border.neutral.normal}`}>
          <MvTypography typeSize={'PX'} size={'BODY_LG_BOLDEST'}>
            Sales Order Information
          </MvTypography>
        </Box>
        <Stack width={'100%'} alignItems={'start'} padding={'20px 16px'}>
          <Grid container columns={{ xs: 1, md: 2 }} rowSpacing={6} columnSpacing={4}>
            <Grid item xs={1}>
              <Stack alignItems={'start'} rowGap={'8px'}>
                <MvTypography typeSize={'PX'} size={'BODY_LG_NORMAL'} color={theme.palette.neutral.subtlestText}>
                  PO Number Customer
                </MvTypography>
                <MvTypography typeSize={'PX'} size={'BODY_LG_NORMAL'}>
                  12345678
                </MvTypography>
              </Stack>
            </Grid>
            <Grid item xs={1}>
              <Stack alignItems={'start'} rowGap={'8px'}>
                <MvTypography typeSize={'PX'} size={'BODY_LG_NORMAL'} color={theme.palette.neutral.subtlestText}>
                  ID SO DMS
                </MvTypography>
                <MvTypography typeSize={'PX'} size={'BODY_LG_NORMAL'}>
                  234325
                </MvTypography>
              </Stack>
            </Grid>
            <Grid item xs={1} md={2}>
              <Stack alignItems={'start'} rowGap={'8px'}>
                <MvTypography typeSize={'PX'} size={'BODY_LG_NORMAL'} color={theme.palette.neutral.subtlestText}>
                  Customer
                </MvTypography>
                <MvTypography typeSize={'PX'} size={'BODY_LG_NORMAL'}>
                  Customer Name
                </MvTypography>
              </Stack>
            </Grid>
            <Grid item xs={1}>
              <Stack alignItems={'start'} rowGap={'8px'}>
                <MvTypography typeSize={'PX'} size={'BODY_LG_NORMAL'} color={theme.palette.neutral.subtlestText}>
                  Delivery Address
                </MvTypography>
                <MvTypography typeSize={'PX'} size={'BODY_LG_NORMAL'}>
                  Lorem ipsum dolor sit amet consectetur. Ullamcorper volutpat mauris pretium mauris feugiat. Vestibulum
                  fermentum est semper molestie commodo duis id amet amet.
                </MvTypography>
              </Stack>
            </Grid>
            <Grid item xs={1}>
              <Stack alignItems={'start'} rowGap={'8px'}>
                <MvTypography typeSize={'PX'} size={'BODY_LG_NORMAL'} color={theme.palette.neutral.subtlestText}>
                  Remark
                </MvTypography>
                <MvTypography typeSize={'PX'} size={'BODY_LG_NORMAL'}>
                  Lorem ipsum dolor sit amet consectetur. Ullamcorper volutpat mauris pretium mauris feugiat. Vestibulum
                  fermentum est semper molestie commodo duis id amet amet.
                </MvTypography>
              </Stack>
            </Grid>
          </Grid>
        </Stack>
      </Box>
      {/* delivery order information */}
      <Box width={'100%'} border={`1px solid ${theme.colorToken.border.neutral.normal}`} borderRadius={'6px'}>
        <Box width={'100%'} padding={'12px'} borderBottom={`1px solid ${theme.colorToken.border.neutral.normal}`}>
          <MvTypography typeSize={'PX'} size={'BODY_LG_BOLDEST'}>
            Delivery Order Information
          </MvTypography>
        </Box>
        <Stack width={'100%'} alignItems={'start'} padding={'20px 16px'}>
          <Grid container columns={{ xs: 1, md: 2 }} rowSpacing={6} columnSpacing={4}>
            <Grid item xs={1}>
              <Stack alignItems={'start'} rowGap={'8px'}>
                <MvTypography typeSize={'PX'} size={'BODY_LG_NORMAL'} color={theme.palette.neutral.subtlestText}>
                  DO Number
                </MvTypography>
                <MvTypography typeSize={'PX'} size={'BODY_LG_NORMAL'}>
                  234325
                </MvTypography>
              </Stack>
            </Grid>
            <Grid item xs={1}>
              <Stack alignItems={'start'} rowGap={'8px'}>
                <MvTypography typeSize={'PX'} size={'BODY_LG_NORMAL'} color={theme.palette.neutral.subtlestText}>
                  Delivery Type
                </MvTypography>
                <MvTypography typeSize={'PX'} size={'BODY_LG_NORMAL'}>
                  Delivery
                </MvTypography>
              </Stack>
            </Grid>
            <Grid item xs={1}>
              <Stack alignItems={'start'} rowGap={'8px'}>
                <MvTypography typeSize={'PX'} size={'BODY_LG_NORMAL'} color={theme.palette.neutral.subtlestText}>
                  Delivery Date Request
                </MvTypography>
                <MvTypography typeSize={'PX'} size={'BODY_LG_NORMAL'}>
                  {formatDateString(new Date())}
                </MvTypography>
              </Stack>
            </Grid>
            <Grid item xs={1}>
              <Stack alignItems={'start'} rowGap={'8px'}>
                <MvTypography typeSize={'PX'} size={'BODY_LG_NORMAL'} color={theme.palette.neutral.subtlestText}>
                  Preparation Location
                </MvTypography>
                <MvTypography typeSize={'PX'} size={'BODY_LG_NORMAL'}>
                  Jababeka
                </MvTypography>
              </Stack>
            </Grid>
          </Grid>
        </Stack>
      </Box>
      {/* transport information */}
      <Box width={'100%'} border={`1px solid ${theme.colorToken.border.neutral.normal}`} borderRadius={'6px'}>
        <Box width={'100%'} padding={'12px'} borderBottom={`1px solid ${theme.colorToken.border.neutral.normal}`}>
          <MvTypography typeSize={'PX'} size={'BODY_LG_BOLDEST'}>
            Transport Information
          </MvTypography>
        </Box>
        <Stack width={'100%'} alignItems={'start'} padding={'20px 16px'}>
          <Grid container columns={{ xs: 1, md: 3 }} rowSpacing={6} columnSpacing={4}>
            <Grid item xs={1}>
              <Stack alignItems={'start'} rowGap={'8px'}>
                <MvTypography typeSize={'PX'} size={'BODY_LG_NORMAL'} color={theme.palette.neutral.subtlestText}>
                  Driver
                </MvTypography>
                <MvTypography typeSize={'PX'} size={'BODY_LG_NORMAL'}>
                  Driver Name
                </MvTypography>
              </Stack>
            </Grid>
            <Grid item xs={1}>
              <Stack alignItems={'start'} rowGap={'8px'}>
                <MvTypography typeSize={'PX'} size={'BODY_LG_NORMAL'} color={theme.palette.neutral.subtlestText}>
                  Vehicle
                </MvTypography>
                <MvTypography typeSize={'PX'} size={'BODY_LG_NORMAL'}>
                  Vehicle Name
                </MvTypography>
              </Stack>
            </Grid>
            <Grid item xs={1}>
              <Stack alignItems={'start'} rowGap={'8px'}>
                <MvTypography typeSize={'PX'} size={'BODY_LG_NORMAL'} color={theme.palette.neutral.subtlestText}>
                  Vehicle Number
                </MvTypography>
                <MvTypography typeSize={'PX'} size={'BODY_LG_NORMAL'}>
                  D 87685 UE
                </MvTypography>
              </Stack>
            </Grid>
          </Grid>
        </Stack>
      </Box>
      {/* material list */}
      <Box
        display={'flex'}
        flexDirection={'column'}
        border={`1px solid ${theme.colorToken.border.neutral.normal}`}
        borderRadius={'6px'}
        gap={'6px'}
        width={'100%'}
      >
        <Box display={'flex'} padding={'12px'} borderBottom={`1px solid ${theme.colorToken.border.neutral.normal}`}>
          <MvTypography typeSize={'PX'} size={'LABEL_LG_BOLDEST'}>
            Material List
          </MvTypography>
        </Box>
        <Box display={'flex'} padding={'20px 16px'}>
          <Table
            columns={columns}
            rows={[
              {
                id: 0,
                material_name: 'Material A',
                material_code: 'MaterialA001',
                type: 'Finish Good',
                qty_request: 200,
                unit: 'Pcs',
                actual_qty: 20
              },
              {
                id: 1,
                material_name: 'Material B',
                material_code: 'MaterialB002',
                type: 'Raw Material',
                qty_request: 160,
                unit: 'Pcs',
                actual_qty: 20
              },
              {
                id: 2,
                material_name: 'Material C',
                material_code: 'MaterialC003',
                type: 'Finish Good',
                qty_request: 150,
                unit: 'Kg',
                actual_qty: 20
              }
            ]}
            checkboxSelection={false}
          />
        </Box>
      </Box>
      {/* checklist group */}
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
              value={[
                { id: 'surat_jalan', label: 'Surat Jalan' },
                { id: 'coa', label: 'COA' },
                { id: 'msds', label: 'MSDS' }
              ]}
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
              value={[{ id: 'msds', label: 'MSDS' }]}
            />
          ]}
          disabled
        />
      </Box>
      {/* transportation used */}
      <Box
        display={'flex'}
        flexDirection={'column'}
        border={`1px solid ${theme.colorToken.border.neutral.normal}`}
        borderRadius={'6px'}
        gap={'6px'}
        width={'100%'}
      >
        <Box display={'flex'} padding={'12px'} borderBottom={`1px solid ${theme.colorToken.border.neutral.normal}`}>
          <MvTypography typeSize={'PX'} size={'LABEL_LG_BOLDEST'}>
            Transportation Used
          </MvTypography>
        </Box>
        <Box width={'100%'} padding={'20px 16px'}>
          <Grid container columns={{ xs: 1, sm: 1, md: 2 }} spacing={4}>
            <Grid item xs={1}>
              <Controller
                name='driverName'
                control={formContext.control}
                render={({ field: { name, onChange, value, ...rest }, fieldState }) => {
                  return (
                    <Field
                      label='Driver Name'
                      isRequired
                      error={fieldState.invalid}
                      helperText={fieldState.error?.message}
                      {...rest}
                    >
                      <Input width='100%' value={value} placeholder='Input Driver Name' onChange={onChange} />
                    </Field>
                  )
                }}
              />
            </Grid>
            <Grid item xs={1}>
              <Controller
                name='roadLetterNumber'
                control={formContext.control}
                render={({ field: { name, onChange, value, ...rest }, fieldState }) => {
                  return (
                    <Field
                      label='Road Letter Number'
                      isRequired
                      error={fieldState.invalid}
                      helperText={fieldState.error?.message}
                      {...rest}
                    >
                      <Input width='100%' value={value} placeholder='Input Road Letter Number' onChange={onChange} />
                    </Field>
                  )
                }}
              />
            </Grid>
            <Grid item xs={1}>
              <Controller
                name='vehicle'
                control={formContext.control}
                render={({ field: { name, onChange, value, ...rest }, fieldState }) => {
                  return (
                    <Field
                      label='Vehicle'
                      isRequired
                      error={fieldState.invalid}
                      helperText={fieldState.invalid ? 'Vehicle is a required field' : ''}
                      {...rest}
                    >
                      <SelectAsync
                        dataFetchService={() =>
                          ({
                            data: {
                              pages: [
                                {
                                  data: {
                                    id: '1',
                                    title: 'Vehicle 1'
                                  }
                                },
                                {
                                  data: {
                                    id: '2',
                                    title: 'Vehicle 2'
                                  }
                                },
                                {
                                  data: {
                                    id: '3',
                                    title: 'Vehicle 3'
                                  }
                                }
                              ]
                            }
                          }) as any
                        }
                        labelKey={'title'}
                        valueKey={'id'}
                        placeholder='Select Vehicle'
                        onChange={onChange}
                      />
                    </Field>
                  )
                }}
              />
            </Grid>
            <Grid item xs={1}>
              <Controller
                name='vehicleRegistrationNumber'
                control={formContext.control}
                render={({ field: { name, onChange, value, ...rest }, fieldState }) => {
                  return (
                    <Field
                      label='Vehicle Registration Number'
                      isRequired
                      error={fieldState.invalid}
                      helperText={fieldState.error?.message}
                      {...rest}
                    >
                      <Input
                        width='100%'
                        value={value}
                        placeholder='Input Vehicle Registration Number'
                        onChange={onChange}
                      />
                    </Field>
                  )
                }}
              />
            </Grid>
            <Grid item xs={1} md={2}>
              <Box
                width={'100%'}
                border={`1px solid ${theme.colorToken.border.neutral.normal}`}
                borderRadius={'6px'}
                padding={'16px'}
                display={'flex'}
                flexDirection={'column'}
                rowGap={'16px'}
              >
                <MvTypography typeSize={'PX'} size={'BODY_LG_BOLDEST'}>
                  Container
                </MvTypography>
                <Grid container columns={{ xs: 1, sm: 1, md: 2 }} spacing={4}>
                  <Grid item xs={1}>
                    <Controller
                      name='containerFront'
                      control={formContext.control}
                      render={({ field: { name, onChange, value, ...rest }, fieldState }) => {
                        return (
                          <Field
                            label='Front'
                            isRequired
                            error={fieldState.invalid}
                            helperText={fieldState.error?.message}
                            {...rest}
                          >
                            <UploadFile onDelete={() => onChange(null)} onChange={onChange} type='dragndrop' />
                          </Field>
                        )
                      }}
                    />
                  </Grid>
                  <Grid item xs={1}>
                    <Controller
                      name='containerBack'
                      control={formContext.control}
                      render={({ field: { name, onChange, value, ...rest }, fieldState }) => {
                        return (
                          <Field
                            label='Back'
                            isRequired
                            error={fieldState.invalid}
                            helperText={fieldState.error?.message}
                            {...rest}
                          >
                            <UploadFile onDelete={() => onChange(null)} onChange={onChange} type='dragndrop' />
                          </Field>
                        )
                      }}
                    />
                  </Grid>
                  <Grid item xs={1}>
                    <Controller
                      name='containerRight'
                      control={formContext.control}
                      render={({ field: { name, onChange, value, ...rest }, fieldState }) => {
                        return (
                          <Field
                            label='Right Side'
                            isRequired
                            error={fieldState.invalid}
                            helperText={fieldState.error?.message}
                            {...rest}
                          >
                            <UploadFile onDelete={() => onChange(null)} onChange={onChange} type='dragndrop' />
                          </Field>
                        )
                      }}
                    />
                  </Grid>
                  <Grid item xs={1}>
                    <Controller
                      name='containerLeft'
                      control={formContext.control}
                      render={({ field: { name, onChange, value, ...rest }, fieldState }) => {
                        return (
                          <Field
                            label='Left Side'
                            isRequired
                            error={fieldState.invalid}
                            helperText={fieldState.error?.message}
                            {...rest}
                          >
                            <UploadFile onDelete={() => onChange(null)} onChange={onChange} type='dragndrop' />
                          </Field>
                        )
                      }}
                    />
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Stack>
  )
}
