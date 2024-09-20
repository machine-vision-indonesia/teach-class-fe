import React, { useState } from 'react'
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import { Box, Stack, useTheme } from '@mui/material'

import { Badge } from '@/components/atoms/badge'
import { MvTypography } from '@/components/atoms/mv-typography'
import { Table } from '@/components/molecules'
import { Alert } from '@/components/molecules/alert'
import { Input } from '@/components/atoms/input'

import { DeliveryPlanStatus } from '@/modules/dms/common/constants'

interface IMaterialProductionItemProps {
  status: DeliveryPlanStatus
}

export const MaterialProductionItem = ({ status }: IMaterialProductionItemProps) => {
  const theme = useTheme()

  const [selectedMaterial, setSelectedMaterial] = useState<string[]>([])

  const [materialReady, setMaterialReady] = useState([
    {
      id: 'MR1',
      batch_number: 'Batch 1',
      stock: 30,
      status: 'Ready',
      allocation: 10,
      remark: 'Lorem Ipsum'
    }
  ])

  const [productionRequest, setProductionRequest] = useState([
    {
      id: 'PR1',
      formula: 'Formula 1',
      quantity: 55,
      unit: 'Liter'
    }
  ])

  const [delivaryScheduled, setDeliveryScheduled] = useState([
    {
      id: 'DS1',
      batch_number: 'BatchNumber001',
      allocation: 30
    },
    {
      id: 'DS2',
      batch_number: 'BatchNumber002',
      allocation: 25
    }
  ])

  const [billMaterial, setBillMaterial] = useState([
    {
      id: 'BM1',
      raw_material: 'Material A',
      code: 'Material001',
      qty_quantity: 30,
      qty_stock: 100,
      min_stock: 30,
      status: 'Ready'
    }
  ])

  const handleAllocationChange = (id: string, newAllocation: number) => {
    setMaterialReady(prevData =>
      prevData.map(dt => {
        if (dt.id === id) {
          if (newAllocation > dt.stock) {
            newAllocation = dt.stock
          }
          return { ...dt, allocation: newAllocation }
        }
        return dt
      })
    )
  }

  const handleRemarkChange = (id: string, newRemark: string) => {
    setMaterialReady(prevData =>
      prevData.map(dt => {
        if (dt.id === id) {
          return { ...dt, remark: newRemark }
        }
        return dt
      })
    )
  }

  const columnMaterial: GridColDef[] = [
    {
      field: 'batch_number',
      headerName: 'BATCH NUMBER',
      flex: 1,
      sortable: false,
      editable: false,
      disableColumnMenu: true
    },
    {
      field: 'stock',
      headerName: 'QTY. STOCK',
      flex: 1,
      sortable: false,
      editable: false,
      disableColumnMenu: true,
      renderCell: (params: GridRenderCellParams) => {
        return (
          <MvTypography typeSize={'PX'} size={'LABEL_MD_NORMAL'}>
            {params.row?.stock || '0'} L
          </MvTypography>
        )
      }
    },
    {
      field: 'status',
      headerName: 'STATUS',
      flex: 0,
      sortable: false,
      editable: false,
      disableColumnMenu: true,
      renderCell: (params: GridRenderCellParams) => {
        return <Badge label={params.row?.status} color='success' isTransparent style='rect' size='medium' />
      }
    },
    {
      field: 'allocation',
      headerName: 'ALLOCATION',
      flex: 1,
      sortable: false,
      editable: false,
      disableColumnMenu: true,
      renderCell: (params: GridRenderCellParams) => {
        if (status === DeliveryPlanStatus.SCM_APPROVED) {
          return (
            <Input
              type='number'
              width='100%'
              InputProps={{
                inputProps: {
                  min: 0,
                  max: params.row.stock
                }
              }}
              value={params.row?.allocation}
              placeholder='0'
              onChange={e => handleAllocationChange(params.row.id, parseInt(e.target.value))}
              disabled={!selectedMaterial.includes(params.row.id)}
            />
          )
        } else {
          return (
            <MvTypography typeSize={'PX'} size={'LABEL_MD_NORMAL'}>
              {params.row?.allocation || '0'} L
            </MvTypography>
          )
        }
      }
    },
    {
      field: 'remaining',
      headerName: 'REMAINING',
      flex: 1,
      sortable: false,
      editable: false,
      disableColumnMenu: true,
      renderCell: (params: GridRenderCellParams) => {
        const remaining = params.row?.stock - params.row?.allocation

        return <Input type='number' width='100%' value={remaining} placeholder='0' disabled />
      }
    },
    {
      field: 'remark',
      headerName: 'REMARK',
      flex: 1,
      sortable: false,
      editable: false,
      disableColumnMenu: true,
      renderCell: (params: GridRenderCellParams) => {
        if (status === DeliveryPlanStatus.SCM_APPROVED) {
          return (
            <Input
              width='100%'
              value={params.row?.remark}
              placeholder='Input Remark'
              onChange={e => handleRemarkChange(params.row.id, e.target.value)}
              disabled={!selectedMaterial.includes(params.row.id)}
            />
          )
        } else {
          return (
            <MvTypography typeSize={'PX'} size={'LABEL_MD_NORMAL'}>
              {params.row?.remark}
            </MvTypography>
          )
        }
      }
    }
  ]

  const columnProductionRequest: GridColDef[] = [
    {
      field: 'formula',
      headerName: 'FORMULA',
      flex: 1,
      sortable: false,
      editable: false,
      disableColumnMenu: true
    },
    {
      field: 'quantity',
      headerName: 'QUANTITY',
      flex: 1,
      sortable: false,
      editable: false,
      disableColumnMenu: true
    },
    {
      field: 'unit',
      headerName: 'UNIT',
      flex: 1,
      sortable: false,
      editable: false,
      disableColumnMenu: true
    }
  ]

  const columnDeliveryScheduled: GridColDef[] = [
    {
      field: 'batch_number',
      headerName: 'BATCH NUMBER',
      flex: 1,
      sortable: false,
      editable: false,
      disableColumnMenu: true
    },
    {
      field: 'allocation',
      headerName: 'ALLOCATION',
      flex: 1,
      sortable: false,
      editable: false,
      disableColumnMenu: true,
      renderCell: (params: GridRenderCellParams) => {
        return (
          <MvTypography typeSize={'PX'} size={'LABEL_MD_NORMAL'}>
            {params.row?.allocation || '0'} L
          </MvTypography>
        )
      }
    }
  ]

  const columnBillMaterial: GridColDef[] = [
    {
      field: 'raw_material',
      headerName: 'RAW MATERIAL',
      flex: 1,
      sortable: false,
      editable: false,
      disableColumnMenu: true
    },
    {
      field: 'code',
      headerName: 'MATERIAL CODE',
      flex: 1,
      sortable: false,
      editable: false,
      disableColumnMenu: true
    },
    {
      field: 'qty_request',
      headerName: 'QTY. REQUEST',
      flex: 1,
      sortable: false,
      editable: false,
      disableColumnMenu: true,
      renderCell: (params: GridRenderCellParams) => {
        return (
          <MvTypography typeSize={'PX'} size={'LABEL_MD_NORMAL'}>
            {params.row?.qty_request || '0'} L
          </MvTypography>
        )
      }
    },
    {
      field: 'qty_stock',
      headerName: 'QTY. STOCK',
      flex: 1,
      sortable: false,
      editable: false,
      disableColumnMenu: true,
      renderCell: (params: GridRenderCellParams) => {
        return (
          <MvTypography typeSize={'PX'} size={'LABEL_MD_NORMAL'}>
            {params.row?.qty_stock || '0'} L
          </MvTypography>
        )
      }
    },
    {
      field: 'min_stock',
      headerName: 'MIN. STOCK',
      flex: 1,
      sortable: false,
      editable: false,
      disableColumnMenu: true,
      renderCell: (params: GridRenderCellParams) => {
        return (
          <MvTypography typeSize={'PX'} size={'LABEL_MD_NORMAL'}>
            {params.row?.min_stock || '0'} L
          </MvTypography>
        )
      }
    },
    {
      field: 'status',
      headerName: 'STATUS',
      flex: 1,
      sortable: false,
      editable: false,
      disableColumnMenu: true,
      renderCell: (params: GridRenderCellParams) => {
        return <Badge label={params.row?.status} color='success' isTransparent style='rect' size='medium' />
      }
    }
  ]

  return (
    <>
      <Stack spacing={4}>
        {/* MATERIAL INFO */}
        <Stack direction={'row'} spacing={4}>
          <Stack spacing={2} width={'100%'}>
            <MvTypography typeSize='PX' size='BODY_LG_NORMAL'>
              Production Location
            </MvTypography>
            <MvTypography typeSize='PX' size='LABEL_LG_NORMAL'>
              Lorem Ipsum
            </MvTypography>
          </Stack>
          <Stack spacing={2} width={'100%'}>
            <MvTypography typeSize='PX' size='BODY_LG_NORMAL'>
              Ready Material Allocation
            </MvTypography>
            <MvTypography typeSize='PX' size='LABEL_LG_NORMAL'>
              30 L
            </MvTypography>
          </Stack>
        </Stack>

        {/* MATERIAL READY */}
        <Stack
          spacing={4}
          sx={{ padding: '16px', border: `1px solid ${theme.colorToken.border.neutral.normal}`, borderRadius: '6px' }}
        >
          <Stack direction={'row'} spacing={4} sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
            <MvTypography typeSize={'PX'} size={'TITLE_XS'}>
              Material Ready
            </MvTypography>
            {status === DeliveryPlanStatus.SCM_APPROVED && (
              <Alert
                title='Please select the batch number of the Material to be allocated!'
                variant='warning'
                size='small'
              />
            )}
          </Stack>

          {materialReady.length > 0 ? (
            <Table
              checkboxSelection={status === DeliveryPlanStatus.SCM_APPROVED}
              columns={columnMaterial}
              rows={materialReady}
              onRowSelectionModelChange={e => setSelectedMaterial(e as string[])}
              initialState={{
                columns: {
                  columnVisibilityModel: {
                    stock: status === DeliveryPlanStatus.SCM_APPROVED,
                    status: status === DeliveryPlanStatus.SCM_APPROVED,
                    remaining: status === DeliveryPlanStatus.SCM_APPROVED
                  }
                }
              }}
            />
          ) : (
            <Box sx={{ padding: '20px', textAlign: 'center' }}>
              <MvTypography typeSize='PX' size='BODY_MD_BOLDEST' color={theme.palette.info[600]}>
                There are no materials available!
              </MvTypography>
            </Box>
          )}
        </Stack>

        {/* PRODUCTION REQUEST */}
        <Stack
          spacing={4}
          sx={{ padding: '16px', border: `1px solid ${theme.colorToken.border.neutral.normal}`, borderRadius: '6px' }}
        >
          <MvTypography typeSize={'PX'} size={'TITLE_XS'}>
            Remaining Shortage (Production Request)
          </MvTypography>

          {status === DeliveryPlanStatus.DELIVERY_SCHEDULED ? (
            <Stack
              spacing={4}
              sx={{
                padding: '16px',
                border: `1px solid ${theme.colorToken.border.neutral.normal}`,
                borderRadius: '6px'
              }}
            >
              <Stack direction={'row'} spacing={4} sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
                <Stack direction={'row'} sx={{ gap: '5px', alignItems: 'center' }}>
                  <MvTypography typeSize={'PX'} size={'BODY_LG_BOLDEST'}>
                    Formula :
                  </MvTypography>
                  <MvTypography typeSize={'PX'} size={'LABEL_LG_NORMAL'}>
                    Formula1001
                  </MvTypography>
                </Stack>

                <Stack direction={'row'} sx={{ gap: '5px', alignItems: 'center' }}>
                  <MvTypography typeSize={'PX'} size={'TITLE_XS'}>
                    Quatity Allocation :
                  </MvTypography>
                  <Badge color='primary' label={'55 Liter'} style='rect' isTransparent />
                </Stack>
              </Stack>
              <Table columns={columnDeliveryScheduled} rows={delivaryScheduled} checkboxSelection={false} />
            </Stack>
          ) : (
            <Table columns={columnProductionRequest} rows={productionRequest} checkboxSelection={false} />
          )}

          {/* BILL OF MATERIAL */}
          <Stack
            spacing={4}
            sx={{ padding: '16px', border: `1px solid ${theme.colorToken.border.neutral.normal}`, borderRadius: '6px' }}
          >
            <MvTypography typeSize={'PX'} size={'TITLE_XS'}>
              Bill of Material
            </MvTypography>
            <Table columns={columnBillMaterial} rows={billMaterial} checkboxSelection={false} />
          </Stack>
        </Stack>

        {/* INVENTORY TRANSFER */}
        <Stack
          spacing={4}
          sx={{ padding: '16px', border: `1px solid ${theme.colorToken.border.neutral.normal}`, borderRadius: '6px' }}
        >
          <MvTypography typeSize={'PX'} size={'TITLE_XS'}>
            Inventory Transfer
          </MvTypography>

          <Stack
            direction={'row'}
            spacing={4}
            sx={{ padding: '16px', border: `1px solid ${theme.colorToken.border.neutral.normal}`, borderRadius: '6px' }}
          >
            <Stack spacing={2} width={'100%'}>
              <MvTypography typeSize='PX' size='BODY_LG_NORMAL'>
                From
              </MvTypography>
              <MvTypography typeSize='PX' size='LABEL_LG_NORMAL'>
                -
              </MvTypography>
            </Stack>
            <Stack spacing={2} width={'100%'}>
              <MvTypography typeSize='PX' size='BODY_LG_NORMAL'>
                To
              </MvTypography>
              <MvTypography typeSize='PX' size='LABEL_LG_NORMAL'>
                -
              </MvTypography>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </>
  )
}
