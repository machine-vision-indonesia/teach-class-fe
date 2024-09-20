import { Badge } from '@/components/atoms/badge'
import { MvTypography } from '@/components/atoms/mv-typography'
import { Accordion } from '@/components/molecules/accordion'
import { Box, Grid, Stack, useTheme } from '@mui/material'
import { Suspense } from 'react'
import { IDeliveryPlanDetail } from '../types/deliveryPlanDetail.types'
import { Table } from '@/components/molecules/table'
import { ButtonCopy } from '@/components/atoms/button-copy'

export const DeliveryPlanDetail: React.FC<IDeliveryPlanDetail> = ({ data = [] }) => {
  const theme = useTheme()

  const MaterialListItem = () => {
    return (
      <Stack width={'100%'} rowGap={4}>
        <Grid container columns={{ xs: 1, md: 2 }} rowSpacing={4} columnSpacing={4}>
          <Grid item xs>
            <Stack spacing={'8px'}>
              <MvTypography typeSize={'PX'} size={'LABEL_LG_NORMAL'} color={theme.palette.neutral.subtlestText}>
                Production Location
              </MvTypography>
              <MvTypography typeSize={'PX'} size={'LABEL_LG_NORMAL'} color={theme.colorToken.text.neutral.normal}>
                Jababeka
              </MvTypography>
            </Stack>
          </Grid>
          <Grid item xs>
            <Stack spacing={'8px'}>
              <MvTypography typeSize={'PX'} size={'LABEL_LG_NORMAL'} color={theme.palette.neutral.subtlestText}>
                Ready Material Location
              </MvTypography>
              <MvTypography typeSize={'PX'} size={'LABEL_LG_NORMAL'} color={theme.colorToken.text.neutral.normal}>
                45 Liter
              </MvTypography>
            </Stack>
          </Grid>
        </Grid>
        <Box
          display={'flex'}
          flexDirection={'column'}
          border={`1px solid ${theme.colorToken.border.neutral.normal}`}
          borderRadius={'6px'}
        >
          <Box display={'flex'} padding={'16px'} paddingBottom={0}>
            <MvTypography typeSize={'PX'} size={'LABEL_LG_BOLDEST'}>
              Material Ready
            </MvTypography>
          </Box>
          <Box padding={'16px 18px'}>
            <Table
              columns={[
                {
                  field: 'batch_number',
                  headerName: 'BATCH NUMBER',
                  justifyContent: 'flex-start',
                  flex: 1,
                  minWidth: 250
                },
                {
                  field: 'allocation',
                  headerName: 'ALLOCATION',
                  justifyContent: 'flex-start',
                  flex: 1,
                  minWidth: 250
                },
                {
                  field: 'remark',
                  headerName: 'REMARK',
                  justifyContent: 'flex-start',
                  flex: 1,
                  minWidth: 250
                }
              ]}
              rows={[
                {
                  id: 0,
                  batch_number: 'BatchNumber010',
                  allocation: '30 L',
                  remark: '24235'
                },
                {
                  id: 1,
                  batch_number: 'BatchNumber020',
                  allocation: '15 L',
                  remark: '35667'
                }
              ]}
              checkboxSelection={false}
            />
          </Box>
        </Box>
        <Box
          display={'flex'}
          flexDirection={'column'}
          border={`1px solid ${theme.colorToken.border.neutral.normal}`}
          borderRadius={'6px'}
        >
          <Box display={'flex'} padding={'16px'} paddingBottom={0}>
            <MvTypography typeSize={'PX'} size={'LABEL_LG_BOLDEST'}>
              Remaining Shortage (Production Request)
            </MvTypography>
          </Box>
          <Box padding={'16px 18px'}>
            <Table
              columns={[
                {
                  field: 'formula',
                  headerName: 'FORMULA',
                  justifyContent: 'flex-start',
                  flex: 1,
                  minWidth: 250
                },
                {
                  field: 'quantity',
                  headerName: 'QUANTITY',
                  justifyContent: 'flex-start',
                  flex: 1,
                  minWidth: 250
                },
                {
                  field: 'unit',
                  headerName: 'UNIT',
                  justifyContent: 'flex-start',
                  flex: 1,
                  minWidth: 250
                }
              ]}
              rows={[
                {
                  id: 0,
                  formula: 'Formula01002',
                  quantity: '55 L',
                  unit: 'Liter'
                }
              ]}
              checkboxSelection={false}
            />
          </Box>
          <Box
            display={'flex'}
            flexDirection={'column'}
            border={`1px solid ${theme.colorToken.border.neutral.normal}`}
            borderRadius={'6px'}
            margin={'16px 18px'}
            marginTop={0}
          >
            <Box display={'flex'} padding={'16px'} paddingBottom={0}>
              <MvTypography typeSize={'PX'} size={'LABEL_LG_BOLDEST'}>
                Bill of Material
              </MvTypography>
            </Box>
            <Box padding={'16px 18px'}>
              <Table
                columns={[
                  {
                    field: 'raw_material',
                    headerName: 'RAW MATERIAL',
                    justifyContent: 'flex-start',
                    flex: 1,
                    minWidth: 250
                  },
                  {
                    field: 'material_code',
                    headerName: 'MATERIAL CODE',
                    justifyContent: 'flex-start',
                    flex: 1,
                    minWidth: 250
                  },
                  {
                    field: 'quantity_request',
                    headerName: 'QTY. REQUEST',
                    justifyContent: 'flex-start',
                    width: 200
                  },
                  {
                    field: 'quantity_stock',
                    headerName: 'QTY. STOCK',
                    justifyContent: 'flex-start',
                    width: 200
                  },
                  {
                    field: 'min_stock',
                    headerName: 'MIN. STOCK',
                    justifyContent: 'flex-start',
                    width: 200
                  },
                  {
                    field: 'status',
                    headerName: 'STATUS',
                    justifyContent: 'flex-start',
                    width: 200,
                    renderCell: params => {
                      if (params.row.status == 'Ready') {
                        return <Badge color={'success'} isTransparent label={params.row.status} style={'rect'} />
                      } else {
                        return <Badge color={'danger'} isTransparent label={params.row.status} style={'rect'} />
                      }
                    }
                  }
                ]}
                rows={[
                  {
                    id: 0,
                    raw_material: 'Material A',
                    material_code: 'MaterialA001',
                    quantity_request: '30 L',
                    quantity_stock: '100 L',
                    min_stock: '30 L',
                    status: 'Ready'
                  },
                  {
                    id: 1,
                    raw_material: 'Material D',
                    material_code: 'MaterialD004',
                    quantity_request: '80 L',
                    quantity_stock: '0 L',
                    min_stock: '35 L',
                    status: 'Not Ready'
                  }
                ]}
                checkboxSelection={false}
              />
            </Box>
          </Box>
        </Box>
        <Box
          display={'flex'}
          flexDirection={'column'}
          border={`1px solid ${theme.colorToken.border.neutral.normal}`}
          borderRadius={'6px'}
          padding={'16px'}
          rowGap={'10px'}
        >
          <MvTypography typeSize={'PX'} size={'LABEL_LG_BOLDEST'}>
            Inventory Transfer
          </MvTypography>
          <Box borderRadius={'6px'} border={`1px solid ${theme.colorToken.border.neutral.normal}`} padding={'16px'}>
            <Grid container columns={{ xs: 2, md: 2 }}>
              <Grid item xs={1}>
                <Stack alignItems={'flex-start'} spacing={'8px'}>
                  <MvTypography typeSize={'PX'} size={'LABEL_LG_NORMAL'} color={theme.palette.neutral.subtlestText}>
                    From
                  </MvTypography>
                  <MvTypography typeSize={'PX'} size={'LABEL_LG_NORMAL'}>
                    Jababeka
                  </MvTypography>
                </Stack>
              </Grid>
              <Grid item xs={1}>
                <Stack alignItems={'flex-start'} spacing={'8px'}>
                  <MvTypography typeSize={'PX'} size={'LABEL_LG_NORMAL'} color={theme.palette.neutral.subtlestText}>
                    To
                  </MvTypography>
                  <MvTypography typeSize={'PX'} size={'LABEL_LG_NORMAL'}>
                    KBI
                  </MvTypography>
                </Stack>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Stack>
    )
  }

  const DeliveryPlanItem = props => {
    const { material_list, status } = props
    return (
      <Stack width={'100%'} rowGap={4}>
        <Grid container columns={{ xs: 1, md: 2 }} rowSpacing={4} columnSpacing={4}>
          <Grid item xs>
            <Box
              display={'flex'}
              flexDirection={'column'}
              border={`1px solid ${theme.colorToken.border.neutral.normal}`}
              borderRadius={'6px'}
            >
              <Box
                display={'flex'}
                padding={'12px'}
                borderBottom={`1px solid ${theme.colorToken.border.neutral.normal}`}
              >
                <MvTypography typeSize={'PX'} size={'LABEL_LG_BOLDEST'}>
                  Delivery Plan Information
                </MvTypography>
              </Box>
              <Grid container spacing={4} columns={{ xs: 1, sm: 1, md: 3 }} sx={{ padding: '16px 18px' }}>
                <Grid item xs={1}>
                  <Stack spacing={'8px'}>
                    <MvTypography typeSize={'PX'} size={'LABEL_LG_NORMAL'} color={theme.palette.neutral.subtlestText}>
                      DP Number
                    </MvTypography>
                    <Stack direction={'row'} alignItems={'center'} spacing={'6px'}>
                      <MvTypography
                        typeSize={'PX'}
                        size={'LABEL_LG_NORMAL'}
                        color={theme.colorToken.text.neutral.normal}
                      >
                        234325
                      </MvTypography>
                      <ButtonCopy value={'234325'} title={'DP Number'} />
                    </Stack>
                  </Stack>
                </Grid>
                <Grid item xs={1}>
                  <Stack spacing={'8px'}>
                    <MvTypography typeSize={'PX'} size={'LABEL_LG_NORMAL'} color={theme.palette.neutral.subtlestText}>
                      Delivery Type
                    </MvTypography>
                    <MvTypography typeSize={'PX'} size={'LABEL_LG_NORMAL'} color={theme.colorToken.text.neutral.normal}>
                      Delivery
                    </MvTypography>
                  </Stack>
                </Grid>
                <Grid item xs={1}>
                  <Stack spacing={'8px'}>
                    <MvTypography typeSize={'PX'} size={'LABEL_LG_NORMAL'} color={theme.palette.neutral.subtlestText}>
                      Delivery Date Request
                    </MvTypography>
                    <MvTypography typeSize={'PX'} size={'LABEL_LG_NORMAL'} color={theme.colorToken.text.neutral.normal}>
                      DD/MM/YYYY
                    </MvTypography>
                  </Stack>
                </Grid>
                <Grid item xs={1}>
                  <Stack spacing={'8px'}>
                    <MvTypography typeSize={'PX'} size={'LABEL_LG_NORMAL'} color={theme.palette.neutral.subtlestText}>
                      Preparation Location
                    </MvTypography>
                    <MvTypography typeSize={'PX'} size={'LABEL_LG_NORMAL'} color={theme.colorToken.text.neutral.normal}>
                      Jababeka
                    </MvTypography>
                  </Stack>
                </Grid>
              </Grid>
            </Box>
          </Grid>
          <Grid item xs>
            <Box
              display={'flex'}
              flexDirection={'column'}
              border={`1px solid ${theme.colorToken.border.neutral.normal}`}
              borderRadius={'6px'}
            >
              <Box
                display={'flex'}
                padding={'12px'}
                borderBottom={`1px solid ${theme.colorToken.border.neutral.normal}`}
              >
                <MvTypography typeSize={'PX'} size={'LABEL_LG_BOLDEST'}>
                  Transportation Information
                </MvTypography>
              </Box>
              <Grid container spacing={4} columns={{ xs: 1, sm: 1, md: 3 }} sx={{ padding: '16px 18px' }}>
                <Grid item xs={1}>
                  <Stack spacing={'8px'}>
                    <MvTypography typeSize={'PX'} size={'LABEL_LG_NORMAL'} color={theme.palette.neutral.subtlestText}>
                      Driver
                    </MvTypography>
                    <MvTypography typeSize={'PX'} size={'LABEL_LG_NORMAL'} color={theme.colorToken.text.neutral.normal}>
                      -
                    </MvTypography>
                  </Stack>
                </Grid>
                <Grid item xs={1}>
                  <Stack spacing={'8px'}>
                    <MvTypography typeSize={'PX'} size={'LABEL_LG_NORMAL'} color={theme.palette.neutral.subtlestText}>
                      Vehicle
                    </MvTypography>
                    <MvTypography typeSize={'PX'} size={'LABEL_LG_NORMAL'} color={theme.colorToken.text.neutral.normal}>
                      -
                    </MvTypography>
                  </Stack>
                </Grid>
                <Grid item xs={1}>
                  <Stack spacing={'8px'}>
                    <MvTypography typeSize={'PX'} size={'LABEL_LG_NORMAL'} color={theme.palette.neutral.subtlestText}>
                      Vehicle Number
                    </MvTypography>
                    <MvTypography typeSize={'PX'} size={'LABEL_LG_NORMAL'} color={theme.colorToken.text.neutral.normal}>
                      -
                    </MvTypography>
                  </Stack>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
        {status === 'open' && (
          <Box
            display={'flex'}
            flexDirection={'column'}
            border={`1px solid ${theme.colorToken.border.neutral.normal}`}
            borderRadius={'6px'}
          >
            <Box display={'flex'} padding={'16px'} paddingBottom={0}>
              <MvTypography typeSize={'PX'} size={'LABEL_LG_BOLDEST'}>
                List Material
              </MvTypography>
            </Box>
            <Box padding={'16px 18px'}>
              <Table
                columns={[
                  {
                    field: 'material_name',
                    headerName: 'MATERIAL NAME',
                    justifyContent: 'flex-start',
                    flex: 1,
                    minWidth: 500
                  },
                  {
                    field: 'material_code',
                    headerName: 'MATERIAL CODE',
                    justifyContent: 'flex-start',
                    flex: 1,
                    minWidth: 500
                  },
                  {
                    field: 'type',
                    headerName: 'TYPE',
                    justifyContent: 'flex-start',
                    flex: 1,
                    minWidth: 150
                  },
                  {
                    field: 'quantity',
                    headerName: 'QUANTITY',
                    justifyContent: 'flex-start',
                    flex: 1,
                    minWidth: 100
                  },
                  {
                    field: 'unit',
                    headerName: 'UNIT',
                    justifyContent: 'flex-start',
                    flex: 1,
                    minWidth: 100
                  }
                ]}
                rows={[
                  {
                    id: 0,
                    material_name: 'Material A',
                    material_code: 'MaterialA001',
                    type: 'Finish Good',
                    quantity: '200',
                    unit: 'Pcs'
                  },
                  {
                    id: 1,
                    material_name: 'Material B',
                    material_code: 'MaterialB002',
                    type: 'Raw Material',
                    quantity: '160',
                    unit: 'Pcs'
                  },
                  {
                    id: 2,
                    material_name: 'Material C',
                    material_code: 'MaterialC003',
                    type: 'Finish Good',
                    quantity: '150',
                    unit: 'Kg'
                  }
                ]}
                checkboxSelection={false}
              />
            </Box>
          </Box>
        )}
        {status !== 'open' && (
          <Box
            display={'flex'}
            flexDirection={'column'}
            border={`1px solid ${theme.colorToken.border.neutral.normal}`}
            borderRadius={'6px'}
            gap={'6px'}
          >
            <Box display={'flex'} padding={'12px'} borderBottom={`1px solid ${theme.colorToken.border.neutral.normal}`}>
              <MvTypography typeSize={'PX'} size={'LABEL_LG_BOLDEST'}>
                Material List
              </MvTypography>
            </Box>
            <Box padding={'16px 18px'}>
              {material_list && (
                <Accordion
                  data={material_list.map(material => ({
                    content: <MaterialListItem />,
                    title: material?.name,
                    leftElement: (
                      <Stack direction={'row'} spacing={2} alignItems={'center'}>
                        <MvTypography typeSize={'PX'} size={'LABEL_SM_NORMAL'}>
                          |
                        </MvTypography>
                        <MvTypography typeSize={'PX'} size={'LABEL_SM_NORMAL'}>
                          {material?.code}
                        </MvTypography>
                        <Badge color={'success'} isTransparent style={'rect'} label={material?.type} />
                      </Stack>
                    ),
                    rightElement: (
                      <Stack direction={'row'} spacing={2} alignItems={'center'}>
                        <MvTypography typeSize={'PX'} size={'LABEL_SM_NORMAL'}>
                          Request : 100 L
                        </MvTypography>
                        <MvTypography typeSize={'PX'} size={'LABEL_SM_NORMAL'}>
                          |
                        </MvTypography>
                        <MvTypography typeSize={'PX'} size={'LABEL_SM_NORMAL'}>
                          Ready : 45 L
                        </MvTypography>
                        <MvTypography typeSize={'PX'} size={'LABEL_SM_NORMAL'}>
                          |
                        </MvTypography>
                        <MvTypography typeSize={'PX'} size={'LABEL_SM_NORMAL'}>
                          Production : 55 L
                        </MvTypography>
                        <MvTypography typeSize={'PX'} size={'LABEL_SM_NORMAL'}>
                          |
                        </MvTypography>
                        <MvTypography typeSize={'PX'} size={'LABEL_SM_NORMAL'}>
                          BOM Not Ready : 2 Material
                        </MvTypography>
                      </Stack>
                    )
                  }))}
                />
              )}
            </Box>
          </Box>
        )}
      </Stack>
    )
  }

  return (
    <Suspense fallback={<h1>🌀 Loading...</h1>}>
      <Box
        border={`1px solid ${theme.colorToken.border.neutral.normal}`}
        borderRadius={'6px'}
        padding={'24px'}
        display={'flex'}
        flexDirection={'column'}
        alignItems={'flex-start'}
        rowGap={'16px'}
        width={'100%'}
      >
        <Stack width={'100%'} direction='row' justifyContent='space-between' alignItems='center' spacing={2}>
          <MvTypography typeSize={'PX'} size={'TITLE_SM'}>
            Delivery Plan
          </MvTypography>
          <Stack direction={'row'} alignItems='center' spacing={'4px'}>
            <MvTypography typeSize={'PX'} size={'LABEL_MD_NORMAL'}>
              Total Plan:
            </MvTypography>
            <Box
              bgcolor={theme.colorToken.background.primary.subtlest}
              borderRadius={'100px'}
              padding={'4px'}
              minWidth={'28px'}
              display={'flex'}
              justifyContent={'center'}
              alignItems={'center'}
            >
              <MvTypography typeSize={'PX'} size={'BODY_SM_BOLDEST'}>
                {data.length}
              </MvTypography>
            </Box>
          </Stack>
        </Stack>
        <Accordion
          data={data.map(plan => ({
            content: <DeliveryPlanItem material_list={plan?.material_list} status={plan.status} />,
            title: plan.name,
            rightElement: (
              <Stack direction={'row'} spacing={2}>
                <Badge
                  color={'primary'}
                  size='medium'
                  isTransparent
                  style={'circular'}
                  label={plan?.status?.toUpperCase()}
                />
              </Stack>
            )
          }))}
        />
      </Box>
    </Suspense>
  )
}
