import { Button } from '@/components/atoms'
import { Input } from '@/components/atoms/input'
import { MvTypography } from '@/components/atoms/mv-typography'
import ButtonAction from '@/components/molecules/button-action'
import { Field } from '@/components/molecules/field'
import { SectionGroup } from '@/components/molecules/section-group'
import { SelectAsync } from '@/components/molecules/select-async'
import { Table } from '@/components/molecules/table'
import { UploadFile } from '@/components/molecules/upload-file'
import { schemaStep2 } from '@/modules/dms/clusters/inventory-transfer/pages/delivery/utils/schema'
import { BASE_DELIVERY_PLAN_PATH } from '@/modules/dms/common/constants'
import { InventoryTransferRequestStatus } from '@/modules/dms/common/constants/inventoryTransferRequestStatus'
import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Grid, useTheme } from '@mui/material'
import Stack from '@mui/material/Stack'
import { GridColDef } from '@mui/x-data-grid'
import { Controller, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

export const Step2 = () => {
  const theme = useTheme()
  const navigate = useNavigate()

  const formStep2 = useForm({
    mode: 'onChange',
    resolver: yupResolver(schemaStep2)
  })

  const onSubmitStep2 = () => {
    // TODO: hit api for update status & next step (simulated)
    localStorage.setItem(
      '_simulated_status_[CLUSTER:InventoryTransfer][PAGES:Delivery-ITR]',
      InventoryTransferRequestStatus.READY_FOR_STUFFING
    )
    navigate(0)
  }

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
      field: 'batch_number',
      headerName: 'BATCH NUMBER',
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
    <>
      <Stack width={'100%'} alignItems={'start'} rowGap={'12px'}>
        {/* sales order information */}
        <SectionGroup color='default' title='Inventory Transfer Information'>
          <Grid container columns={{ xs: 1, md: 3 }} rowSpacing={6} columnSpacing={4}>
            <Grid item xs={1}>
              <Stack alignItems={'start'} rowGap={'8px'}>
                <MvTypography typeSize={'PX'} size={'BODY_LG_NORMAL'} color={theme.colorToken.text.neutral.subtlest}>
                  ITR Number
                </MvTypography>
                <MvTypography typeSize={'PX'} size={'BODY_LG_NORMAL'}>
                  234325
                </MvTypography>
              </Stack>
            </Grid>
            <Grid item xs={1}>
              <Stack alignItems={'start'} rowGap={'8px'}>
                <MvTypography typeSize={'PX'} size={'BODY_LG_NORMAL'} color={theme.colorToken.text.neutral.subtlest}>
                  Transfer Date Request
                </MvTypography>
                <MvTypography typeSize={'PX'} size={'BODY_LG_NORMAL'}>
                  DD/MM/YYYY
                </MvTypography>
              </Stack>
            </Grid>
            <Grid item xs={1}>
              <Stack alignItems={'start'} rowGap={'8px'}>
                <MvTypography typeSize={'PX'} size={'BODY_LG_NORMAL'} color={theme.colorToken.text.neutral.subtlest}>
                  Transfer Date Sceduled
                </MvTypography>
                <MvTypography typeSize={'PX'} size={'BODY_LG_NORMAL'}>
                  DD/MM/YYYY
                </MvTypography>
              </Stack>
            </Grid>
            <Grid item xs={1}>
              <Stack alignItems={'start'} rowGap={'8px'}>
                <MvTypography typeSize={'PX'} size={'BODY_LG_NORMAL'} color={theme.colorToken.text.neutral.subtlest}>
                  From
                </MvTypography>
                <MvTypography typeSize={'PX'} size={'BODY_LG_NORMAL'}>
                  KBI
                </MvTypography>
              </Stack>
            </Grid>
            <Grid item xs={1}>
              <Stack alignItems={'start'} rowGap={'8px'}>
                <MvTypography typeSize={'PX'} size={'BODY_LG_NORMAL'} color={theme.colorToken.text.neutral.subtlest}>
                  To
                </MvTypography>
                <MvTypography typeSize={'PX'} size={'BODY_LG_NORMAL'}>
                  Jababeka
                </MvTypography>
              </Stack>
            </Grid>
          </Grid>
        </SectionGroup>

        {/* transport information */}
        <SectionGroup color='default' title='Transport Information'>
          <Grid container columns={{ xs: 1, md: 3 }} rowSpacing={6} columnSpacing={4}>
            <Grid item xs={1}>
              <Stack alignItems={'start'} rowGap={'8px'}>
                <MvTypography typeSize={'PX'} size={'BODY_LG_NORMAL'} color={theme.colorToken.text.neutral.subtlest}>
                  Driver
                </MvTypography>
                <MvTypography typeSize={'PX'} size={'BODY_LG_NORMAL'}>
                  Driver Name
                </MvTypography>
              </Stack>
            </Grid>
            <Grid item xs={1}>
              <Stack alignItems={'start'} rowGap={'8px'}>
                <MvTypography typeSize={'PX'} size={'BODY_LG_NORMAL'} color={theme.colorToken.text.neutral.subtlest}>
                  Vehicle
                </MvTypography>
                <MvTypography typeSize={'PX'} size={'BODY_LG_NORMAL'}>
                  Vehicle Name
                </MvTypography>
              </Stack>
            </Grid>
            <Grid item xs={1}>
              <Stack alignItems={'start'} rowGap={'8px'}>
                <MvTypography typeSize={'PX'} size={'BODY_LG_NORMAL'} color={theme.colorToken.text.neutral.subtlest}>
                  Vehicle Number
                </MvTypography>
                <MvTypography typeSize={'PX'} size={'BODY_LG_NORMAL'}>
                  D 87685 UE
                </MvTypography>
              </Stack>
            </Grid>
          </Grid>
        </SectionGroup>

        {/* material request */}
        <SectionGroup color='default' title='Material Request'>
          <Table
            columns={columns}
            rows={[
              {
                id: 0,
                material_name: 'Material A',
                material_code: 'MaterialA001',
                batch_number: '2054.07.0A2',
                type: 'Finish Good',
                qty_request: 200,
                unit: 'Pcs',
                actual_qty: 20
              },
              {
                id: 1,
                material_name: 'Material B',
                material_code: 'MaterialB002',
                batch_number: '2054.07.0A2',
                type: 'Raw Material',
                qty_request: 160,
                unit: 'Pcs',
                actual_qty: 20
              },
              {
                id: 2,
                material_name: 'Material C',
                material_code: 'MaterialC003',
                batch_number: '2054.07.0A2',
                type: 'Finish Good',
                qty_request: 150,
                unit: 'Kg',
                actual_qty: 20
              }
            ]}
            checkboxSelection={false}
          />
        </SectionGroup>

        {/* transportation used */}
        <SectionGroup color='default' title='Transportation Used'>
          <Grid container columns={{ xs: 1, sm: 1, md: 2 }} spacing={4}>
            <Grid item xs={1}>
              <Controller
                name='driverName'
                control={formStep2.control}
                render={({ field, fieldState }) => {
                  return (
                    <Field
                      label='Driver Name'
                      isRequired
                      error={fieldState.invalid}
                      helperText={fieldState.error?.message}
                      {...field}
                    >
                      <Input width='100%' placeholder='Input Driver Name' />
                    </Field>
                  )
                }}
              />
            </Grid>
            <Grid item xs={1}>
              <Controller
                name='roadLetterNumber'
                control={formStep2.control}
                render={({ field, fieldState }) => {
                  return (
                    <Field
                      label='Road Letter Number'
                      isRequired
                      error={fieldState.invalid}
                      helperText={fieldState.error?.message}
                      {...field}
                    >
                      <Input width='100%' placeholder='Input Road Letter Number' />
                    </Field>
                  )
                }}
              />
            </Grid>
            <Grid item xs={1}>
              <Controller
                name='vehicle'
                control={formStep2.control}
                render={({ field, fieldState }) => {
                  return (
                    <Field
                      label='Vehicle'
                      isRequired
                      error={fieldState.invalid}
                      helperText={fieldState.error?.message}
                      {...field}
                    >
                      <SelectAsync
                        dataFetchService={() =>
                          ({
                            data: {
                              pages: [
                                {
                                  data: {
                                    id: 1,
                                    title: 'Vehicle A'
                                  }
                                },
                                {
                                  data: {
                                    id: 2,
                                    title: 'Vehicle B'
                                  }
                                },
                                {
                                  data: {
                                    id: 3,
                                    title: 'Vehicle C'
                                  }
                                }
                              ]
                            }
                          }) as any
                        }
                        labelKey={'title'}
                        valueKey={'id'}
                        placeholder='Select Vehicle'
                      />
                    </Field>
                  )
                }}
              />
            </Grid>
            <Grid item xs={1}>
              <Controller
                name='vehicleRegistrationNumber'
                control={formStep2.control}
                render={({ field, fieldState }) => {
                  return (
                    <Field
                      label='Vehicle Registration Number'
                      isRequired
                      error={fieldState.invalid}
                      helperText={fieldState.error?.message}
                      {...field}
                    >
                      <Input width='100%' placeholder='Input Vehicle Registration Number' />
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
                      control={formStep2.control}
                      render={({ field, fieldState }) => {
                        return (
                          <Field
                            label='Front'
                            isRequired
                            error={fieldState.invalid}
                            helperText={fieldState.error?.message}
                          >
                            <UploadFile
                              type='dragndrop'
                              onDelete={() => field.onChange(null)}
                              onChange={field.onChange}
                            />
                          </Field>
                        )
                      }}
                    />
                  </Grid>
                  <Grid item xs={1}>
                    <Controller
                      name='containerBack'
                      control={formStep2.control}
                      render={({ field, fieldState }) => {
                        return (
                          <Field
                            label='Back'
                            isRequired
                            error={fieldState.invalid}
                            helperText={fieldState.error?.message}
                          >
                            <UploadFile
                              type='dragndrop'
                              onDelete={() => field.onChange(null)}
                              onChange={field.onChange}
                            />
                          </Field>
                        )
                      }}
                    />
                  </Grid>
                  <Grid item xs={1}>
                    <Controller
                      name='containerRight'
                      control={formStep2.control}
                      render={({ field, fieldState }) => {
                        return (
                          <Field
                            label='Right'
                            isRequired
                            error={fieldState.invalid}
                            helperText={fieldState.error?.message}
                          >
                            <UploadFile
                              type='dragndrop'
                              onDelete={() => field.onChange(null)}
                              onChange={field.onChange}
                            />
                          </Field>
                        )
                      }}
                    />
                  </Grid>
                  <Grid item xs={1}>
                    <Controller
                      name='containerLeft'
                      control={formStep2.control}
                      render={({ field, fieldState }) => {
                        return (
                          <Field
                            label='Left'
                            isRequired
                            error={fieldState.invalid}
                            helperText={fieldState.error?.message}
                          >
                            <UploadFile
                              type='dragndrop'
                              onDelete={() => field.onChange(null)}
                              onChange={field.onChange}
                            />
                          </Field>
                        )
                      }}
                    />
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </SectionGroup>
      </Stack>

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
        <ButtonAction
          size='large'
          confirmationStatusVariant='warning'
          modalOptions='default'
          confirmationText={{
            negativeLabel: 'Cancel',
            positiveLabel: 'Yes',
            title: 'Are you sure want to Stuffing?',
            description: 'You won’t be able to revert this!'
          }}
          alertText={{
            error: {
              title: 'Network Errors.',
              description: 'Unable to connect to the network or server.'
            },
            success: {
              title: 'Successfully save data.',
              description: 'Schedule ITR has been saved by our system.'
            }
          }}
          variant='contained'
          color='primary'
          content='textOnly'
          payload={formStep2.getValues()}
          actionService={payload => {
            onSubmitStep2()
          }}
          isValid={formStep2.formState.isValid}
          onClick={() => formStep2.trigger()}
          text='Ready for Stuffing'
        />
      </Stack>
    </>
  )
}
