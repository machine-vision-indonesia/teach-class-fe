import { Button } from '@/components/atoms'
import { Input } from '@/components/atoms/input'
import { MvTypography } from '@/components/atoms/mv-typography'
import ButtonAction from '@/components/molecules/button-action'
import { DateTimePicker } from '@/components/molecules/date-time-picker'
import { Field } from '@/components/molecules/field'
import { SectionGroup } from '@/components/molecules/section-group'
import { Table } from '@/components/molecules/table'
import { schemaStep1 } from '@/modules/dms/clusters/inventory-transfer/pages/delivery/utils/schema'
import { BASE_DELIVERY_PLAN_PATH } from '@/modules/dms/common/constants'
import { InventoryTransferRequestStatus } from '@/modules/dms/common/constants/inventoryTransferRequestStatus'
import { yupResolver } from '@hookform/resolvers/yup'
import { Grid, Select, useTheme } from '@mui/material'
import MenuItem from '@mui/material/MenuItem'
import Stack from '@mui/material/Stack'
import { GridColDef } from '@mui/x-data-grid'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

export const Step1 = () => {
  const theme = useTheme()
  const navigate = useNavigate()

  const formStep1 = useForm({
    mode: 'onChange',
    resolver: yupResolver(schemaStep1)
  })

  const onSubmitStep1 = () => {
    // TODO: hit api for update status & next step (simulated)
    localStorage.setItem(
      '_simulated_status_[CLUSTER:InventoryTransfer][PAGES:Delivery-ITR]',
      InventoryTransferRequestStatus.TRANSPORT_READY
    )
    navigate(0)
  }

  const [date, setDate] = useState<Date | null>(new Date())
  const onDateChange = (date: Date | null) => {
    setDate(date)
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
                <Controller
                  name='transferDateSceduled'
                  control={formStep1.control}
                  render={({ field, fieldState }) => {
                    return (
                      <Field
                        label='Transfer Date Scheduled'
                        isRequired
                        error={fieldState.invalid}
                        helperText={fieldState.error?.message}
                        {...field}
                      >
                        <DateTimePicker type='datePicker' value={date} onChange={onDateChange} />
                      </Field>
                    )
                  }}
                />
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
                <MvTypography typeSize={'PX'} size={'BODY_LG_NORMAL'} color={theme.palette.neutral.subtlestText}>
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
                <Controller
                  name='driver'
                  control={formStep1.control}
                  render={({ field, fieldState }) => {
                    return (
                      <Field
                        label='Driver'
                        error={fieldState.invalid}
                        helperText={fieldState.error?.message}
                        {...field}
                      >
                        <Input width='100%' placeholder='Input Driver Name' />
                      </Field>
                    )
                  }}
                />
              </Stack>
            </Grid>
            <Grid item xs={1}>
              <Stack alignItems={'start'} rowGap={'8px'}>
                <Controller
                  name='vehicle'
                  control={formStep1.control}
                  render={({ field, fieldState }) => {
                    return (
                      <Field
                        label='Vehicle'
                        isRequired
                        error={fieldState.invalid}
                        helperText={fieldState.error?.message}
                        {...field}
                      >
                        <Select variant='outlined' fullWidth size='small' placeholder='Input Vehicle Name'>
                          <MenuItem value='L300'>L300</MenuItem>
                          <MenuItem value='CDE'>CDE</MenuItem>
                          <MenuItem value='CDD'>CDD</MenuItem>
                          <MenuItem value='Fuso'>Fuso</MenuItem>
                          <MenuItem value='Eksternal'>Eksternal</MenuItem>
                        </Select>
                      </Field>
                    )
                  }}
                />
              </Stack>
            </Grid>
            <Grid item xs={1}>
              <Stack alignItems={'start'} rowGap={'8px'}>
                <Controller
                  name='vehicleNumber'
                  control={formStep1.control}
                  render={({ field, fieldState }) => {
                    return (
                      <Field
                        label='Vehicle Number'
                        error={fieldState.invalid}
                        helperText={fieldState.error?.message}
                        {...field}
                      >
                        <Input width='100%' placeholder='Input Vehicle Number' />
                      </Field>
                    )
                  }}
                />
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
          payload={formStep1.getValues()}
          actionService={payload => {
            onSubmitStep1()
          }}
          isValid={formStep1.formState.isValid}
          onClick={() => formStep1.trigger()}
          text='Transport Ready'
        />
      </Stack>
    </>
  )
}
