import React from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { Box, Grid, Stack, useTheme } from '@mui/material'
import { Breadcrumbs } from '@/components/atoms/breadcrumbs'
import { MvTypography } from '@/components/atoms/mv-typography'
import { BASE_DELIVERY_PLAN_PATH } from '@/modules/dms/common/constants'
import { Badge } from '@/components/atoms/badge'
import { Field } from '@/components/molecules/field'
import { Input } from '@/components/atoms/input'
import { Button, Select } from '@/components/atoms'
import { DateTimePicker } from '@/components/molecules/date-time-picker'
import { Table } from '@/components/molecules'
import { GridColDef } from '@mui/x-data-grid'
import ButtonAction from '@/components/molecules/button-action'

const EditDeliveryPlan = () => {
  const { id } = useParams()
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const theme = useTheme()

  const columns: GridColDef[] = [
    {
      field: 'material_name',
      headerName: 'MATERIAL NAME',
      flex: 1,
      minWidth: 300,
      maxWidth: 385,
      sortable: false,
      disableColumnMenu: true
    },
    {
      field: 'material_code',
      headerName: 'MATERIAL CODE',
      flex: 1,
      minWidth: 300,
      maxWidth: 385,
      sortable: false,
      disableColumnMenu: true
    },
    {
      field: 'type',
      headerName: 'TYPE',
      width: 150,
      sortable: false,
      disableColumnMenu: true
    },
    {
      field: 'quantity',
      headerName: 'QUANTITY',
      width: 150,
      sortable: false,
      disableColumnMenu: true
    },
    {
      field: 'unit',
      headerName: 'UNIT',
      width: 150,
      sortable: false,
      disableColumnMenu: true
    }
  ]

  const rows = [
    {
      id: '0',
      material_name: 'Material A',
      material_code: 'MaterialA001',
      type: 'Finish Good',
      quantity: '200',
      unit: 'Pcs'
    },
    {
      id: '1',
      material_name: 'Material B',
      material_code: 'MaterialB002',
      type: 'Raw Material',
      quantity: '160',
      unit: 'Pcs'
    },
    {
      id: '2',
      material_name: 'Material C',
      material_code: 'MaterialC003',
      type: 'Finish Good',
      quantity: '150',
      unit: 'Kg'
    }
  ]

  return (
    <Stack width={'100%'} rowGap={'12px'}>
      <MvTypography typeSize={'PX'} size={'TITLE_XL'}>
        Edit Delivery Plan
      </MvTypography>
      <Breadcrumbs
        data={[
          {
            label: 'Home',
            path: '/'
          },
          {
            label: 'Delivery Plan',
            path: BASE_DELIVERY_PLAN_PATH
          },
          {
            label: 'Edit Delivery Plan',
            path: pathname
          }
        ]}
      />
      <Box
        bgcolor={theme.colorToken.background.neutral.normal}
        borderRadius={'6px'}
        padding={'16px'}
        marginTop={'12px'}
        width={'100%'}
      >
        <Stack width={'100%'} alignItems={'start'} rowGap={'12px'}>
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
                Detail Delivery Plan
              </MvTypography>
              <MvTypography typeSize={'PX'} size={'BODY_MD_NORMAL'} color={theme.palette.neutral[400]}>
                Please complete the form below to continue the process
              </MvTypography>
            </Stack>
            <Badge color={'primary'} isTransparent style={'circular'} label={'DP Open'} size='medium' />
          </Box>
          <Box
            width={'100%'}
            border={`1px solid ${theme.colorToken.border.neutral.normal}`}
            borderRadius={'6px'}
            display={'flex'}
            flexDirection={'column'}
            alignItems={'flex-start'}
          >
            <Box width={'100%'} padding={'12px'} borderBottom={`1px solid ${theme.colorToken.border.neutral.normal}`}>
              <MvTypography typeSize={'PX'} size={'BODY_LG_BOLDEST'}>
                Delivery Plan
              </MvTypography>
            </Box>
            <Box padding={'16px'} width={'100%'}>
              <Grid container columns={3} spacing={4}>
                <Grid item xs={1}>
                  <Field label='DP Number'>
                    <Input placeholder='DP Number' value={'353446'} disabled width='100%' />
                  </Field>
                </Grid>
                <Grid item xs={1}>
                  <Field label='Delivery Type' isRequired>
                    <Select
                      data={[
                        {
                          id: 'Delivery',
                          label: 'Delivery'
                        },
                        {
                          id: 'Pick Up',
                          label: 'Pick Up'
                        }
                      ]}
                      labelKey={'label'}
                      valueKey={'id'}
                      placeholder='Delivery Type'
                    />
                  </Field>
                </Grid>
                <Grid item xs={1}>
                  <Field label='Delivery Date Request' isRequired>
                    <DateTimePicker type='datePicker' />
                  </Field>
                </Grid>
                <Grid item xs={1} sm={2} md={3}>
                  <Box
                    width={'100%'}
                    border={`1px solid ${theme.colorToken.border.neutral.normal}`}
                    borderRadius={'6px'}
                    padding={'16px'}
                    display={'flex'}
                    flexDirection={'column'}
                    alignItems={'flex-start'}
                    gap={'16px'}
                  >
                    <MvTypography typeSize={'PX'} size={'BODY_LG_BOLDEST'}>
                      List Material
                    </MvTypography>
                    <Box width={'100%'}>
                      <Table columns={columns} rows={rows} checkboxSelection={false} />
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Stack
            direction={'row'}
            width={'100%'}
            justifyContent={'space-between'}
            alignItems={'center'}
            sx={{ marginTop: '40px' }}
          >
            <Button
              variant='outlined'
              color='primary'
              content='textOnly'
              text='Back'
              onClick={() => navigate(BASE_DELIVERY_PLAN_PATH)}
              sx={{ paddingX: '16px', paddingY: '12px', minWidth: 0 }}
            />
            <ButtonAction
              size='medium'
              payload={{}}
              actionService={() => {}}
              confirmationStatusVariant='warning'
              modalOptions='default'
              confirmationText={{
                negativeLabel: 'Cancel',
                positiveLabel: 'Yes',
                title: 'Are you sure want to edit delivery plan?',
                description: 'You won’t be able to revert this!'
              }}
              alertText={{
                error: {
                  title: 'Network Errors.',
                  description: 'Unable to connect to the network or server.'
                },
                success: {
                  title: 'Successfully save data.',
                  description: 'Delivery plan has been saved by our system.'
                }
              }}
              variant='contained'
              color='primary'
              text='Save'
              content='textOnly'
              sx={{
                minWidth: 0,
                paddingX: '16px',
                paddingY: '12px'
              }}
              onSuccessAddition={() => navigate(BASE_DELIVERY_PLAN_PATH)}
            />
          </Stack>
        </Stack>
      </Box>
    </Stack>
  )
}

export default EditDeliveryPlan
