import React, { useEffect, useMemo, useState } from 'react'
import { ILocation, IMaterialListItem, IMaterialReady } from '../../types/supply-chain-dp/materialListItem.types'
import { Box, Grid, Stack, useTheme } from '@mui/material'
import { MvTypography } from '@/components/atoms/mv-typography'
import { Button, Select } from '@/components/atoms'
import { generateUUID } from '@/modules/dms/common/utils'
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import { Table } from '@/components/molecules'
import { Badge } from '@/components/atoms/badge'
import { Input } from '@/components/atoms/input'
import { Alert } from '@/components/molecules/alert'

export const MaterialListItem: React.FC<IMaterialListItem> = ({ selectedPreparationLocation, material }) => {
  const theme = useTheme()
  const [selectedProductionLocation, setSelectedProductionLocation] = useState<ILocation>()
  const [locationFulfilled, setLocationFulfilled] = useState(false)
  const [showBillOfMaterial, setShowBillOfMaterial] = useState(false)
  const [showITR, setShowITR] = useState(false)

  const renderIndicatorText = useMemo(() => {
    if (!selectedPreparationLocation) {
      setLocationFulfilled(false)
      return (
        <Box
          width={'100%'}
          display={'flex'}
          flexDirection={'column'}
          alignItems={'flex-start'}
          border={`1px solid ${theme.colorToken.border.neutral.normal}`}
          borderRadius={'6px'}
          padding={'16px'}
        >
          <Stack width={'100%'} direction={'row'} alignItems={'center'} paddingY={'20px'} justifyContent={'center'}>
            <MvTypography typeSize={'PX'} size={'BODY_MD_BOLDEST'} color={theme.colorToken.text.info.normal}>
              Please select a preparation location first!
            </MvTypography>
          </Stack>
        </Box>
      )
    } else if (!selectedProductionLocation) {
      setLocationFulfilled(false)
      return (
        <Box
          width={'100%'}
          display={'flex'}
          flexDirection={'column'}
          alignItems={'flex-start'}
          border={`1px solid ${theme.colorToken.border.neutral.normal}`}
          borderRadius={'6px'}
          padding={'16px'}
        >
          <Stack width={'100%'} direction={'row'} alignItems={'center'} paddingY={'20px'} justifyContent={'center'}>
            <MvTypography typeSize={'PX'} size={'BODY_MD_BOLDEST'} color={theme.colorToken.text.info.normal}>
              Please select a production location first!
            </MvTypography>
          </Stack>
        </Box>
      )
    } else {
      setLocationFulfilled(true)
      return null
    }
  }, [selectedPreparationLocation, selectedProductionLocation])

  const [materialReady, setMaterialReady] = useState<IMaterialReady[]>([
    {
      id: material.id,
      quantity_stock: material.stock,
      status: 'Ready',
      allocation: 0,
      remaining: material.remaining
    }
  ])

  const [selectedFormula, setSelectedFormula] = useState<{
    id: string
    label: string
  } | null>()

  const [allocationIsChanged, setAllocationIsChanged] = useState(false)

  const handleAllocationChange = (id, newAllocation) => {
    setMaterialReady(prevData =>
      prevData.map(row => {
        if (row.id === id) {
          if (newAllocation > row.quantity_stock) {
            newAllocation = row.quantity_stock // Batasi nilai ke max (quantity)
          }

          const updatedRemaining = row.quantity_stock - newAllocation
          return {
            ...row,
            allocation: newAllocation,
            remaining: updatedRemaining
          }
        }
        return row
      })
    )
  }

  const columnsMaterialReady: GridColDef[] = [
    {
      field: 'quantity_stock',
      headerName: 'QTY. STOCK',
      flex: 1,
      minWidth: 120,
      maxWidth: 140,
      editable: false,
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params: GridRenderCellParams) => {
        return (
          <MvTypography typeSize={'PX'} size={'LABEL_MD_NORMAL'}>
            {params.row?.quantity_stock} L
          </MvTypography>
        )
      }
    },
    {
      field: 'status',
      headerName: 'STATUS',
      flex: 1,
      minWidth: 120,
      maxWidth: 140,
      editable: false,
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params: GridRenderCellParams) => {
        return (
          <Badge
            label={params.row?.quantity_stock == 0 ? 'Not Ready' : 'Ready'}
            color={params.row?.quantity_stock == 0 ? 'danger' : 'success'}
            isTransparent
            style='rect'
            size='medium'
          />
        )
      }
    },
    {
      field: 'allocation',
      headerName: 'ALLOCATION',
      flex: 1,
      minWidth: 150,
      maxWidth: 305,
      editable: false,
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params: GridRenderCellParams) => {
        return (
          <Input
            type='number'
            width='100%'
            InputProps={{
              inputProps: {
                min: 0,
                max: params.row.quantity_stock
              }
            }}
            value={params.row?.allocation}
            placeholder='0'
            onChange={e => {
              if (selectedFormula) {
                setAllocationIsChanged(true)
              }
              handleAllocationChange(params.row.id, parseInt(e.target.value))
            }}
          />
        )
      }
    },
    {
      field: 'remaining',
      headerName: 'REMAINING',
      flex: 1,
      minWidth: 150,
      maxWidth: 305,
      editable: false,
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params: GridRenderCellParams) => {
        return <Input type='number' width='100%' disabled value={params.row?.remaining} />
      }
    }
  ]

  const columnsShortage: GridColDef[] = [
    {
      field: 'quantity',
      headerName: 'QUANTITY',
      flex: 1,
      minWidth: 250,
      editable: false,
      sortable: false,
      disableColumnMenu: true
    },
    {
      field: 'unit',
      headerName: 'UNIT',
      flex: 1,
      minWidth: 250,
      editable: false,
      sortable: false,
      disableColumnMenu: true
    }
  ]

  const columnsBillOfMaterial: GridColDef[] = [
    {
      field: 'raw_material',
      headerName: 'RAW MATERIAL',
      flex: 1,
      minWidth: 200,
      maxWidth: 350,
      editable: false,
      sortable: false,
      disableColumnMenu: true
    },
    {
      field: 'quantity_request',
      headerName: 'QTY. REQUEST',
      flex: 1,
      minWidth: 100,
      maxWidth: 150,
      editable: false,
      sortable: false,
      disableColumnMenu: true
    },
    {
      field: 'quantity_stock',
      headerName: 'QTY. STOCK',
      flex: 1,
      minWidth: 100,
      maxWidth: 130,
      editable: false,
      sortable: false,
      disableColumnMenu: true
    },
    {
      field: 'minimum_stock',
      headerName: 'MIN. STOCK',
      flex: 1,
      minWidth: 100,
      maxWidth: 130,
      editable: false,
      sortable: false,
      disableColumnMenu: true
    },
    {
      field: 'status',
      headerName: 'STATUS',
      flex: 1,
      minWidth: 100,
      maxWidth: 130,
      editable: false,
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params: GridRenderCellParams) => {
        return <Badge color={'success'} style={'rect'} isTransparent label={params.row.status} size='medium' />
      }
    }
  ]

  const renderBillOfMaterial = () => {
    if (material.stock >= material.request) {
      return true
    } else if (material.stock < material.request) {
      return false
    } else {
      if (!materialReady[0].allocation && materialReady[0].allocation !== material.request) {
        return true
      } else {
        return false
      }
    }
  }

  useEffect(() => {
    if (selectedPreparationLocation?.id && selectedProductionLocation?.id) {
      if (selectedPreparationLocation.id !== selectedProductionLocation.id) {
        setShowITR(true)
      }
      if (selectedPreparationLocation.id === selectedProductionLocation.id) {
        setShowITR(false)
      }
    }
  }, [selectedPreparationLocation, selectedProductionLocation])

  return (
    <Stack alignItems={'start'} width={'100%'} spacing={'16px'}>
      <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} width={'100%'}>
        <MvTypography typeSize={'PX'} size={'BODY_LG_BOLDEST'}>
          Production Location
        </MvTypography>
        <Stack direction={'row'} alignItems={'center'} spacing={'10px'}>
          {!selectedProductionLocation && (
            <MvTypography typeSize={'PX'} size={'BODY_MD_BOLDEST'} color={theme.colorToken.text.warning.normal}>
              Production Location must be selected!
            </MvTypography>
          )}
          <Select
            placeholder='Select Production Location'
            data={[
              {
                id: 'Jababeka',
                label: 'Jababeka'
              },
              {
                id: 'KBI',
                label: 'KBI'
              }
            ]}
            variant='default'
            labelKey={'label'}
            valueKey={'id'}
            sx={{
              minWidth: '265px'
            }}
            onChange={value => setSelectedProductionLocation(value)}
            selected={selectedProductionLocation}
          />
        </Stack>
      </Stack>
      {renderIndicatorText}

      {locationFulfilled && (
        <Stack alignItems={'start'} width={'100%'} spacing={'16px'}>
          <Box
            width={'100%'}
            border={`1px solid ${theme.colorToken.border.neutral.normal}`}
            borderRadius={'6px'}
            padding={'16px'}
            display={'flex'}
            flexDirection={'column'}
            alignItems={'flex-start'}
            gap={'10px'}
          >
            <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} width={'100%'}>
              <MvTypography typeSize={'PX'} size={'BODY_LG_BOLDEST'}>
                Material Ready
              </MvTypography>
              {materialReady[0].quantity_stock < material.request &&
                (allocationIsChanged ? (
                  <Alert
                    variant='warning'
                    title={'Changed the allocation amount, please reset the remaining shortage!'}
                    size='small'
                  />
                ) : (
                  <Alert variant='warning' title={'Unfulfilled request, please check bill of material!'} size='small' />
                ))}
            </Stack>
            <Box width={'100%'}>
              <Table columns={columnsMaterialReady} rows={materialReady} checkboxSelection={false} />
            </Box>
          </Box>
          <Box
            width={'100%'}
            border={
              allocationIsChanged
                ? `1px solid ${theme.colorToken.border.warning.normal}`
                : `1px solid ${theme.colorToken.border.neutral.normal}`
            }
            borderRadius={'6px'}
            padding={'16px'}
            display={'flex'}
            flexDirection={'column'}
            alignItems={'flex-start'}
            gap={'10px'}
          >
            <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} width={'100%'}>
              <MvTypography typeSize={'PX'} size={'BODY_LG_BOLDEST'}>
                Remaining Shortage (Production Request)
              </MvTypography>
              {!showBillOfMaterial ? (
                <MvTypography typeSize={'PX'} size={'BODY_MD_NORMAL'}>
                  Shortage: {material.request - materialReady[0].allocation} L
                </MvTypography>
              ) : (
                <Stack direction={'row'} alignItems={'center'} spacing={'8px'}>
                  <MvTypography typeSize={'PX'} size={'BODY_MD_BOLDEST'} color={theme.colorToken.text.warning.normal}>
                    Formula must be selected!
                  </MvTypography>
                  <Select
                    data={[
                      {
                        id: 'Formula01001',
                        label: 'Formula01001'
                      },
                      {
                        id: 'Formula01002',
                        label: 'Formula01002'
                      },
                      {
                        id: 'Formula01003',
                        label: 'Formula01003'
                      }
                    ]}
                    placeholder='Select Formula'
                    labelKey={'label'}
                    valueKey={'id'}
                    variant='default'
                    selected={selectedFormula || null}
                    onChange={value => {
                      setAllocationIsChanged(false)
                      setSelectedFormula(value)
                    }}
                    setSelected={setSelectedFormula}
                    sx={{
                      minWidth: '245px'
                    }}
                  />
                </Stack>
              )}
            </Stack>
            {material.status !== 'Raw Material' && !showBillOfMaterial && (
              <Box
                width={'100%'}
                display={'flex'}
                flexDirection={'column'}
                justifyContent={'center'}
                alignItems={'center'}
                padding={'18px'}
                gap={'16px'}
                border={`1px solid ${theme.colorToken.border.neutral.normal}`}
                borderRadius={'6px'}
              >
                <MvTypography typeSize={'PX'} size={'BODY_MD_BOLDEST'}>
                  Please check bill of material!
                </MvTypography>
                <Button
                  variant='contained'
                  content='textOnly'
                  text='Check Bill of Material'
                  color='primary'
                  disabled={renderBillOfMaterial()}
                  size='medium'
                  sx={{
                    minWidth: 0,
                    paddingX: '12px',
                    paddingY: '8px'
                  }}
                  onClick={() => {
                    setShowBillOfMaterial(true)
                  }}
                />
              </Box>
            )}
            {material.status !== 'Raw Material' &&
              showBillOfMaterial &&
              (selectedFormula && selectedFormula.id ? (
                <Stack width={'100%'} alignItems={'start'} spacing={'16px'}>
                  <Box width={'100%'}>
                    <Table
                      columns={columnsShortage}
                      rows={[
                        {
                          id: 0,
                          quantity: material.request - materialReady[0].allocation,
                          unit: 'Liter'
                        }
                      ]}
                      checkboxSelection={false}
                    />
                  </Box>
                  <Box
                    width={'100%'}
                    border={`1px solid ${theme.colorToken.border.neutral.normal}`}
                    borderRadius={'6px'}
                    padding={'16px'}
                    display={'flex'}
                    flexDirection={'column'}
                    alignItems={'start'}
                    gap={'16px'}
                  >
                    <MvTypography typeSize={'PX'} size={'BODY_LG_BOLDEST'}>
                      Bill of Material
                    </MvTypography>
                    <Box width={'100%'}>
                      <Table
                        columns={columnsBillOfMaterial}
                        rows={[
                          {
                            id: generateUUID(),
                            raw_material: 'Material A',
                            quantity_request: 30,
                            quantity_stock: 100,
                            minimum_stock: 30,
                            status: 'Ready'
                          }
                        ]}
                        checkboxSelection={false}
                        sx={{
                          maxHeight: '248px'
                        }}
                      />
                    </Box>
                  </Box>
                  <Stack direction={'row'} width={'100%'} justifyContent={'end'}>
                    <Button
                      variant='contained'
                      content='textOnly'
                      text='Reset'
                      color='warning'
                      size='medium'
                      fontWeight={500}
                      disabled={!allocationIsChanged}
                      onClick={() => {
                        setSelectedFormula({})
                        setAllocationIsChanged(false)
                      }}
                      sx={{
                        minWidth: 0,
                        paddingX: '12px',
                        paddingY: '8px'
                      }}
                    />
                  </Stack>
                </Stack>
              ) : (
                <Box
                  width={'100%'}
                  border={`1px solid ${theme.colorToken.border.neutral.normal}`}
                  borderRadius={'6px'}
                  paddingY={'48px'}
                  display={'flex'}
                  justifyContent={'center'}
                  alignItems={'center'}
                >
                  <MvTypography typeSize={'PX'} size={'BODY_MD_BOLDEST'} color={theme.colorToken.text.info.normal}>
                    Please select a formula first!
                  </MvTypography>
                </Box>
              ))}
          </Box>
          {showITR && (
            <Box
              width={'100%'}
              border={`1px solid ${theme.colorToken.border.neutral.normal}`}
              borderRadius={'6px'}
              padding={'16px'}
              display={'flex'}
              flexDirection={'column'}
              alignItems={'flex-start'}
              gap={'10px'}
            >
              <MvTypography typeSize={'PX'} size={'BODY_LG_BOLDEST'}>
                Inventory Transfer
              </MvTypography>
              <Box
                width={'100%'}
                border={`1px solid ${theme.colorToken.border.neutral.normal}`}
                borderRadius={'6px'}
                padding={'16px'}
              >
                <Grid container columns={2}>
                  <Grid item xs={1}>
                    <Stack alignItems={'start'} rowGap={'8px'} width={'100%'}>
                      <MvTypography typeSize={'PX'} size={'BODY_LG_NORMAL'} color={theme.palette.neutral.subtlestText}>
                        From
                      </MvTypography>
                      <MvTypography typeSize={'PX'} size={'BODY_LG_NORMAL'}>
                        {selectedProductionLocation?.label}
                      </MvTypography>
                    </Stack>
                  </Grid>
                  <Grid item xs={1}>
                    <Stack alignItems={'start'} rowGap={'8px'} width={'100%'}>
                      <MvTypography typeSize={'PX'} size={'BODY_LG_NORMAL'} color={theme.palette.neutral.subtlestText}>
                        To
                      </MvTypography>
                      <MvTypography typeSize={'PX'} size={'BODY_LG_NORMAL'}>
                        {selectedPreparationLocation?.label}
                      </MvTypography>
                    </Stack>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          )}
        </Stack>
      )}
    </Stack>
  )
}
