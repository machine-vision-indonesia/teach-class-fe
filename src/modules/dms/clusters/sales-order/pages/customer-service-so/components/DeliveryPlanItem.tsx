import { Select } from '@/components/atoms'
import { Input } from '@/components/atoms/input'
import { MvTypography } from '@/components/atoms/mv-typography'
import { Table } from '@/components/molecules'
import { DateTimePicker } from '@/components/molecules/date-time-picker'
import { Field } from '@/components/molecules/field'
import { Icon } from '@iconify/react/dist/iconify.js'
import { Box, Grid, Stack, useTheme } from '@mui/material'
import { GridColDef } from '@mui/x-data-grid'
import React, { useState } from 'react'
import { IListMaterial } from '../types/listMaterial.types'
import { IDeliveryPlanItem } from '../types/deliveryPlanItem.types'

const DeliveryPlanItem: React.FC<IDeliveryPlanItem> = ({ dp_number, delivery_type, delivery_date_request }) => {
  const theme = useTheme()

  const [selectedRows, setSelectedRows] = useState<number[]>([])

  const rows: IListMaterial[] = [
    {
      id: 0,
      material_name: 'Material A',
      material_code: 'MaterialA001',
      type: 'Finish Good',
      quantity: 200,
      unit: 'Pcs',
      delivery_quantity: 0,
      remaining: 200
    },
    {
      id: 1,
      material_name: 'Material B',
      material_code: 'MaterialB002',
      type: 'Finish Good',
      quantity: 200,
      unit: 'Pcs',
      delivery_quantity: 0,
      remaining: 200
    },
    {
      id: 2,
      material_name: 'Material C',
      material_code: 'MaterialC003',
      type: 'Finish Good',
      quantity: 200,
      unit: 'Pcs',
      delivery_quantity: 0,
      remaining: 200
    }
  ]

  const [rowData, setRowData] = useState(rows)

  const handleDeliveryQuantityChange = (id, newDeliveryQuantity) => {
    setRowData(prevData =>
      prevData.map(row => {
        if (row.id === id) {
          if (newDeliveryQuantity > row.quantity) {
            newDeliveryQuantity = row.quantity // Batasi nilai ke max (quantity)
          }
          const updatedQuantity = row.quantity - newDeliveryQuantity
          return {
            ...row,
            delivery_quantity: newDeliveryQuantity,
            remaining: updatedQuantity
          }
        }
        return row
      })
    )
  }

  const columns: GridColDef[] = [
    {
      field: 'material_name',
      headerName: 'MATERIAL NAME',
      flex: 1,
      minWidth: 150,
      maxWidth: 170,
      editable: false,
      sortable: false,
      disableColumnMenu: true
    },
    {
      field: 'material_code',
      headerName: 'MATERIAL CODE',
      flex: 1,
      minWidth: 150,
      maxWidth: 170,
      editable: false,
      sortable: false,
      disableColumnMenu: true
    },
    {
      field: 'type',
      headerName: 'TYPE',
      flex: 1,
      minWidth: 140,
      maxWidth: 150,
      editable: false,
      sortable: false,
      disableColumnMenu: true
    },
    {
      field: 'quantity',
      headerName: 'QUANTITY',
      flex: 1,
      minWidth: 110,
      maxWidth: 130,
      editable: false,
      sortable: false,
      disableColumnMenu: true
    },
    {
      field: 'unit',
      headerName: 'UNIT',
      flex: 1,
      minWidth: 110,
      maxWidth: 130,
      editable: false,
      sortable: false,
      disableColumnMenu: true
    },
    {
      field: 'delivery_quantity',
      headerName: 'DELIVERY QUANTITY',
      flex: 1,
      minWidth: 170,
      maxWidth: 200,
      editable: false,
      sortable: false,
      disableColumnMenu: true,
      renderCell: params => {
        const isSelected = selectedRows.includes(params.row.id)
        return (
          <Input
            InputProps={{
              inputProps: {
                min: 0,
                max: params.row.quantity
              }
            }}
            type='number'
            value={params.row.delivery_quantity}
            width='100%'
            disabled={!isSelected}
            onChange={e => handleDeliveryQuantityChange(params.row.id, parseInt(e.target.value))}
          />
        )
      }
    },
    {
      field: 'remaining',
      headerName: 'REMAINING',
      flex: 1,
      minWidth: 170,
      maxWidth: 200,
      editable: false,
      sortable: false,
      disableColumnMenu: true,
      renderCell: params => {
        return <Input type='number' value={params.row.remaining} width='100%' disabled />
      }
    }
  ]

  const handleRowSelection = selectionModel => {
    setSelectedRows(selectionModel)
  }

  return (
    <Stack alignItems={'flex-start'} width={'100%'} spacing={'16px'}>
      <Grid container width={'100%'} columns={{ xs: 1, sm: 2, md: 3 }} spacing={4}>
        <Grid
          item
          xs={1}
          width={'100%'}
          sx={{
            paddingLeft: 0 + ' !important'
          }}
        >
          <Field label='DP Number'>
            <Input placeholder='DP Number' value={dp_number} disabled width='100%' />
          </Field>
        </Grid>
        <Grid item xs={1}>
          <Field label='Delivery Type' isRequired>
            <Select placeholder='Select Delivery Type' data={[]} labelKey={''} valueKey={''} />
          </Field>
        </Grid>
        <Grid item xs={1}>
          <Field label='Delivery Date Request' isRequired>
            <DateTimePicker type='datePicker' />
          </Field>
        </Grid>
        <Grid
          item
          xs={1}
          sm={2}
          md={3}
          sx={{
            paddingLeft: 0 + ' !important'
          }}
        >
          <Box
            width={'100%'}
            padding={'16px'}
            borderRadius={'6px'}
            border={`1px solid ${theme.colorToken.border.neutral.normal}`}
            display={'flex'}
            flexDirection={'column'}
            alignItems={'flex-start'}
            rowGap={'10px'}
          >
            <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} width={'100%'}>
              <MvTypography typeSize={'PX'} size={'LABEL_LG_BOLDEST'}>
                List Material
              </MvTypography>
              <Stack direction={'row'} alignItems='center' spacing={'5px'}>
                <Icon
                  icon={'tabler:info-circle'}
                  width={'24px'}
                  height={'24px'}
                  color={theme.colorToken.link.warning.normal}
                />
                <MvTypography typeSize={'PX'} size={'LABEL_MD_NORMAL'} color={theme.colorToken.link.warning.normal}>
                  Please select Material to split delivery inquiry!
                </MvTypography>
              </Stack>
            </Stack>
            <Table
              columns={columns}
              rows={rowData}
              checkboxSelection={true}
              sx={{
                width: '100%',
                maxHeight: '320px'
              }}
              onRowSelectionModelChange={handleRowSelection}
            />
          </Box>
        </Grid>
      </Grid>
    </Stack>
  )
}

export default DeliveryPlanItem
