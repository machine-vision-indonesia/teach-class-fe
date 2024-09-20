import { Badge } from '@/components/atoms/badge'
import { MvTypography } from '@/components/atoms/mv-typography'
import { Accordion } from '@/components/molecules/accordion'
import { Box, Grid, Stack, useTheme } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import DeliveryPlanAnalysis from './DeliveryPlanAnalysis'
import { Table } from '@/components/molecules/table'
import { Button } from '@/components/atoms/button'
import { BASE_DELIVERY_PLAN_PATH, DeliveryPlanStatus } from '@/modules/dms/common/constants'
import ButtonAction from '@/components/molecules/button-action'
import { ReconfirmModal } from './ReconfirmModal'
import { ICustomerService } from '../../types/customer-service-delivery-plan/customerService.types'
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import { Input } from '@/components/atoms/input'
import { formatDateString, generateUUID } from '@/modules/dms/common/utils'
import { DateConfirmation } from '@/components/molecules/date-confirmation'

export const CustomerService: React.FC<ICustomerService> = ({ status = '' }) => {
  const { id } = useParams()
  const navigate = useNavigate()

  const theme = useTheme()

  // contoh data
  const sampleData = {
    name: 'Delivery Plan 1',
    status: status,
    material_list: [
      {
        id: generateUUID(),
        name: 'Material A',
        code: 'Material Code',
        type: 'Finish Goods',
        color: 'success',
        remaining_shortage: 100
      },
      {
        id: generateUUID(),
        name: 'Material B',
        code: 'Material Code',
        type: 'Raw Material',
        color: 'info',
        remaining_shortage: 50
      }
    ]
  }

  // parent formula = ini bisa dipake buat action nantinya
  const [parentFormula, setParentFormula] = useState()

  const DynamicFormulaTable = ({ id, initialQuantity }) => {
    const [quantity, setQuantity] = useState(initialQuantity)
    const [rows, setRows] = useState([
      {
        id: generateUUID(),
        batch_number: '',
        allocation: 0
      }
    ])

    const columns: GridColDef[] = [
      {
        field: 'batch_number',
        headerName: 'BATCH NUMBER',
        flex: 1,
        minWidth: 250,
        maxWidth: 552,
        disableColumnMenu: true,
        sortable: false,
        filterable: false,
        renderCell: (params: GridRenderCellParams) => {
          const id = params.row.id
          const batchNumber = rows.find(row => row.id === id)?.batch_number || ''

          return (
            <Box width={'100%'} marginY={'8px'}>
              <Input
                width='100%'
                placeholder='Input Batch Number'
                value={batchNumber}
                onChange={e => handleBatchNumberChange(e, id)}
              />
            </Box>
          )
        }
      },
      {
        field: 'allocation',
        headerName: 'ALLOCATION*',
        flex: 1,
        minWidth: 250,
        maxWidth: 552,
        disableColumnMenu: true,
        sortable: false,
        filterable: false,
        renderCell: (params: GridRenderCellParams) => {
          const id = params.row.id // Mengambil id dari baris
          const allocation = rows.find(row => row.id === id)?.allocation || 0

          return (
            <Box width={'100%'} marginY={'8px'}>
              <Input
                type='number'
                width='100%'
                placeholder='Input Allocation'
                inputProps={{ min: 0, max: quantity + allocation }}
                value={allocation}
                onChange={e => handleAllocationChange(e, params.row.id)}
                onBlur={e => handleAllocationChange(e, params.row.id)}
              />
            </Box>
          )
        }
      },
      {
        field: 'delete',
        headerName: '',
        width: 100,
        editable: false,
        sortable: false,
        disableColumnMenu: true,
        renderCell: (params: GridRenderCellParams) => {
          return (
            <Button
              variant='text'
              content='iconOnly'
              icon={'tabler:circle-x'}
              color='error'
              onClick={() => handleDeleteRow(params.row.id)}
            />
          )
        }
      }
    ]

    const handleBatchNumberChange = (event, id) => {
      const newBatchNumber = event.target.value

      const updatedRows = rows.map(row => (row.id === id ? { ...row, batch_number: newBatchNumber } : row))

      setRows(updatedRows)
    }

    const handleAllocationChange = (event, id) => {
      let newAllocation = parseFloat(event.target.value) || 0

      // Cari baris yang akan diubah
      const rowToEdit = rows.find(row => row.id === id)

      if (rowToEdit) {
        const oldAllocation = rowToEdit.allocation || 0
        const maxAllocation = quantity + oldAllocation

        // Jika nilai baru melebihi maxAllocation, set nilai ke maxAllocation
        if (newAllocation > maxAllocation) {
          newAllocation = maxAllocation
        }

        const updatedQuantity = quantity + oldAllocation - newAllocation
        setQuantity(updatedQuantity)

        // Perbarui baris dengan nilai allocation yang baru
        const updatedRows = rows.map(row => (row.id === id ? { ...row, allocation: newAllocation } : row))

        setRows(updatedRows)
      }
    }

    const handleAddRow = () => {
      setRows(prevRows => [...prevRows, { id: generateUUID(), batch_number: '', allocation: 0 }])
    }

    const handleDeleteRow = (id: string) => {
      const rowToDelete = rows.find(row => row.id === id)

      if (rowToDelete) {
        setQuantity(prevQuantity => prevQuantity + rowToDelete.allocation)

        const updatedRows = rows.filter(row => row.id !== id)
        setRows(updatedRows)
      }
    }

    // useEffect(() => {
    //   setParentFormula(prev => ({
    //     ...prev,
    //     ...test
    //   }))
    // }, [test])

    return (
      <Box
        width={'100%'}
        border={`1px solid ${theme.colorToken.border.neutral.normal}`}
        borderRadius={'6px'}
        padding={'18px 16px'}
        display={'flex'}
        flexDirection={'column'}
        alignItems={'start'}
        rowGap={'18px'}
      >
        <Stack width={'100%'} justifyContent={'space-between'} alignItems={'center'} direction={'row'}>
          <Stack direction={'row'} alignItems={'center'} spacing={'16px'}>
            <MvTypography typeSize={'PX'} size={'BODY_LG_BOLDEST'} color={theme.palette.neutral.subtlestText}>
              Formula:
            </MvTypography>
            <MvTypography typeSize={'PX'} size={'LABEL_LG_NORMAL'}>
              Formula1002
            </MvTypography>
          </Stack>
          <Stack direction={'row'} alignItems={'center'} spacing={'16px'}>
            <MvTypography typeSize={'PX'} size={'LABEL_LG_NORMAL'}>
              Production Quantity:
            </MvTypography>
            <Badge style='circular' color='primary' isTransparent label={`${quantity} Liter`} size='medium' />
          </Stack>
        </Stack>
        <Box width={'100%'}>
          <Table columns={columns} rows={rows} checkboxSelection={false} />
          {quantity > 0 && (
            <Button
              variant='text'
              content='iconText'
              size='medium'
              icon={'tabler:plus'}
              text='Add Batch Number'
              disabled={quantity === 0}
              onClick={() => handleAddRow()}
            />
          )}
        </Box>
      </Box>
    )
  }

  const ReconfirmShortageTable = () => {
    const [rows, setRows] = useState([
      {
        id: generateUUID(),
        formula: 'Formula01002',
        quantity: 55,
        unit: 'Liter'
      }
    ])

    const columns: GridColDef[] = [
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
    ]

    return (
      <Box
        width={'100%'}
        border={`1px solid ${theme.colorToken.border.neutral.normal}`}
        borderRadius={'6px'}
        padding={'18px 16px'}
        display={'flex'}
        flexDirection={'column'}
        alignItems={'start'}
        rowGap={'18px'}
      >
        <Stack width={'100%'} justifyContent={'space-between'} alignItems={'center'} direction={'row'}>
          <Stack direction={'row'} alignItems={'center'} spacing={'16px'}>
            <MvTypography typeSize={'PX'} size={'BODY_LG_BOLDEST'} color={theme.palette.neutral.subtlestText}>
              Formula:
            </MvTypography>
            <MvTypography typeSize={'PX'} size={'LABEL_LG_NORMAL'}>
              Formula1002
            </MvTypography>
          </Stack>
        </Stack>
        <Box width={'100%'}>
          <Table columns={columns} rows={rows} checkboxSelection={false} />
        </Box>
      </Box>
    )
  }

  const MaterialListItem = props => {
    const { id, quantity } = props
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
          {status === DeliveryPlanStatus.DP_DELIVERY_APPROVED && (
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
          )}
          {status === DeliveryPlanStatus.INQUIRY_CONFIRMED && (
            <Box padding={'16px 18px'}>
              <DynamicFormulaTable id={id} initialQuantity={quantity} />
            </Box>
          )}
          {status === DeliveryPlanStatus.INQUIRY_RECONFIRM && (
            <Box padding={'16px 18px'}>
              <ReconfirmShortageTable />
            </Box>
          )}
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

  const [reconfirmDialog, setReconfirmDialog] = useState(false)

  const confirmAction = () => {
    // TODO: hit api & next step (simulated)
    localStorage.setItem('_simulated_status', DeliveryPlanStatus.INQUIRY_CONFIRMED)
    navigate(0)
  }

  const saveAction = () => {
    // TODO: hit api & next step (simulated)
    localStorage.setItem('_simulated_status', DeliveryPlanStatus.DELIVERY_SCHEDULED)
    navigate(0)
  }

  return (
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
            Delivery Plan Information
          </MvTypography>
          <MvTypography typeSize={'PX'} size={'BODY_MD_NORMAL'} color={theme.palette.neutral[400]}>
            Display all delivery plan details
          </MvTypography>
        </Stack>
        <Badge color={'danger'} isTransparent style={'circular'} label={status} size='medium' />
      </Box>
      <Accordion
        data={[
          {
            content: <DeliveryPlanAnalysis />,
            title: 'Delivery Plan Analysis'
          }
        ]}
      />
      <Box
        display={'flex'}
        flexDirection={'column'}
        border={`1px solid ${theme.colorToken.border.neutral.normal}`}
        borderRadius={'6px'}
      >
        <Box display={'flex'} padding={'12px'}>
          <MvTypography typeSize={'PX'} size={'LABEL_LG_BOLDEST'}>
            Sales Order Information
          </MvTypography>
        </Box>
        <Grid container columnSpacing={4} rowSpacing={8} columns={{ xs: 1, sm: 2 }} sx={{ padding: '16px 18px' }}>
          <Grid item xs={1}>
            <Stack spacing={'8px'}>
              <MvTypography typeSize={'PX'} size={'LABEL_LG_NORMAL'} color={theme.palette.neutral.subtlestText}>
                PO Number Customer
              </MvTypography>
              <MvTypography typeSize={'PX'} size={'LABEL_LG_NORMAL'} color={theme.colorToken.text.neutral.normal}>
                12345678
              </MvTypography>
            </Stack>
          </Grid>
          <Grid item xs={1}>
            <Stack spacing={'8px'}>
              <MvTypography typeSize={'PX'} size={'LABEL_LG_NORMAL'} color={theme.palette.neutral.subtlestText}>
                ID SO DMS
              </MvTypography>
              <MvTypography typeSize={'PX'} size={'LABEL_LG_NORMAL'} color={theme.colorToken.text.neutral.normal}>
                234325
              </MvTypography>
            </Stack>
          </Grid>
          <Grid item xs={1} sm={2}>
            <Stack spacing={'8px'}>
              <MvTypography typeSize={'PX'} size={'LABEL_LG_NORMAL'} color={theme.palette.neutral.subtlestText}>
                Customer
              </MvTypography>
              <MvTypography typeSize={'PX'} size={'LABEL_LG_NORMAL'} color={theme.colorToken.text.neutral.normal}>
                Customer Name
              </MvTypography>
            </Stack>
          </Grid>
          <Grid item xs={1}>
            <Stack spacing={'8px'}>
              <MvTypography typeSize={'PX'} size={'LABEL_LG_NORMAL'} color={theme.palette.neutral.subtlestText}>
                Delivery Address
              </MvTypography>
              <MvTypography typeSize={'PX'} size={'LABEL_LG_NORMAL'} color={theme.colorToken.text.neutral.normal}>
                Lorem ipsum dolor sit amet consectetur. Ullamcorper volutpat mauris pretium mauris feugiat. Vestibulum
                fermentum est semper molestie commodo duis id amet amet.
              </MvTypography>
            </Stack>
          </Grid>
          <Grid item xs={1}>
            <Stack spacing={'8px'}>
              <MvTypography typeSize={'PX'} size={'LABEL_LG_NORMAL'} color={theme.palette.neutral.subtlestText}>
                Remark
              </MvTypography>
              <MvTypography typeSize={'PX'} size={'LABEL_LG_NORMAL'} color={theme.colorToken.text.neutral.normal}>
                Lorem ipsum dolor sit amet consectetur. Ullamcorper volutpat mauris pretium mauris feugiat. Vestibulum
                fermentum est semper molestie commodo duis id amet amet.
              </MvTypography>
            </Stack>
          </Grid>
        </Grid>
      </Box>
      <Grid container columns={{ xs: 1, md: 2 }} rowSpacing={4} columnSpacing={4}>
        <Grid item xs>
          <Box
            display={'flex'}
            flexDirection={'column'}
            border={`1px solid ${theme.colorToken.border.neutral.normal}`}
            borderRadius={'6px'}
          >
            <Box display={'flex'} padding={'12px'} borderBottom={`1px solid ${theme.colorToken.border.neutral.normal}`}>
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
                  <MvTypography typeSize={'PX'} size={'LABEL_LG_NORMAL'} color={theme.colorToken.text.neutral.normal}>
                    234325
                  </MvTypography>
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
                    {formatDateString(new Date())}
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
            <Box display={'flex'} padding={'12px'} borderBottom={`1px solid ${theme.colorToken.border.neutral.normal}`}>
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
            Date Confirmation
          </MvTypography>
        </Box>
        <Box width={'100%'} padding={'16px'}>
          <DateConfirmation
            sectionTitles={['Supply Chain', 'Production', 'Delivery']}
            initialValues={{
              supplyChain: { date: null, selectedOption: '' },
              production: { date: null, selectedOption: '' },
              delivery: { date: null, selectedOption: '' }
            }}
            disabledSections={{
              supplyChain: true,
              production: true,
              delivery: true
            }}
            onChange={() => {}}
            direction='row'
          />
        </Box>
      </Box>
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
        <Box padding={'16px 18px'}>
          <Accordion
            data={sampleData.material_list.map(material => ({
              content: (
                <MaterialListItem
                  id={material.id}
                  quantity={material.remaining_shortage}
                  setParentFormula={setParentFormula}
                />
              ),
              title: material?.name,
              leftElement: (
                <Stack direction={'row'} spacing={2} alignItems={'center'}>
                  <MvTypography typeSize={'PX'} size={'LABEL_SM_NORMAL'}>
                    |
                  </MvTypography>
                  <MvTypography typeSize={'PX'} size={'LABEL_SM_NORMAL'}>
                    {material?.code}
                  </MvTypography>
                  <Badge color={material.color} isTransparent style={'rect'} label={material?.type} />
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
        {status !== DeliveryPlanStatus.INQUIRY_RECONFIRM && (
          <Stack direction={'row'} alignItems={'center'} spacing={2}>
            {status! == DeliveryPlanStatus.DELIVERY_APPROVED && (
              <Button
                variant='contained'
                color='warning'
                content='textOnly'
                text='Re-Confirm'
                onClick={() => {
                  setReconfirmDialog(true)
                }}
                sx={{ paddingX: '16px', paddingY: '12px', minWidth: 0 }}
              />
            )}
            <ButtonAction
              size='medium'
              payload={{}}
              actionService={status === DeliveryPlanStatus.DELIVERY_APPROVED ? confirmAction : saveAction}
              confirmationStatusVariant='warning'
              modalOptions='default'
              confirmationText={{
                negativeLabel: 'Cancel',
                positiveLabel: 'Yes',
                title: 'Are you sure want to agree the delivery date?',
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
              text={status === DeliveryPlanStatus.DELIVERY_APPROVED ? 'Confirm' : 'Save'}
              content='textOnly'
              sx={{
                minWidth: 0,
                paddingX: '16px',
                paddingY: '12px'
              }}
            />
          </Stack>
        )}
      </Stack>
      {reconfirmDialog && (
        <ReconfirmModal
          deliveryPlanId={''}
          isOpen={reconfirmDialog}
          setIsOpen={setReconfirmDialog}
          onClose={() => setReconfirmDialog(false)}
        />
      )}
    </Stack>
  )
}
