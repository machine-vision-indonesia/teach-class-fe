import React, { useEffect, useState } from 'react'
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import { Box, Stack, useTheme } from '@mui/material'

import { MvTypography } from '@/components/atoms/mv-typography'
import { Table } from '@/components/molecules'
import { DeliveryPlanStatus } from '@/modules/dms/common/constants'

interface IProductionPlanningItemProps {
  planningData: any
  status: DeliveryPlanStatus
}

interface IPlanningItemInfo {
  label: string
  value: string
}

export const ProductionPlanningItem = ({ planningData, status }: IProductionPlanningItemProps) => {
  const theme = useTheme()

  const [planningItemInfo, setPlanningItemInfo] = useState<IPlanningItemInfo[]>()

  useEffect(() => {
    mappingPlanningItemInfo()
  }, [planningData, status])

  const mappingPlanningItemInfo = () => {
    switch (status) {
      case DeliveryPlanStatus.SCM_APPROVED:
        setPlanningItemInfo([
          { label: 'Customer', value: planningData?.customer || 'Customer Name A' },
          { label: 'Vessel', value: planningData?.vessel || 'Vessel Name' },
          { label: 'Shift', value: planningData?.shift || 'Shift 01' }
        ])
        break
      case DeliveryPlanStatus.PRODUCTION_APPROVED:
        setPlanningItemInfo([
          { label: 'Customer', value: planningData?.customer || '-' },
          { label: 'Driver', value: planningData?.driver || '-' },
          { label: 'Vehicle', value: planningData?.vehicle || '-' }
        ])
        break

      default:
        break
    }
  }

  const [materialPlanning, setMaterialPlanning] = useState([
    {
      id: 'MP1',
      material: 'Material A',
      quantity: 30
    }
  ])

  const columnMaterialPlanning: GridColDef[] = [
    {
      field: 'material',
      headerName: 'MATERIAL',
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
      disableColumnMenu: true,
      renderCell: (params: GridRenderCellParams) => {
        return (
          <MvTypography typeSize={'PX'} size={'LABEL_MD_NORMAL'}>
            {params.row?.quantity || '0'} L
          </MvTypography>
        )
      }
    }
  ]

  return (
    <>
      <Box sx={{ borderRadius: '6px', border: `1px solid ${theme.palette.warning[100]}` }}>
        <Stack
          direction={'row'}
          sx={{
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '9px 16px',
            backgroundColor: theme.palette.warning[200]
          }}
        >
          <MvTypography typeSize={'PX'} size='BODY_LG_BOLDEST'>
            {planningData?.date || '-'}
          </MvTypography>
          <MvTypography typeSize={'PX'} size='BODY_MD_BOLDEST'>
            {planningData?.day || '-'}
          </MvTypography>
        </Stack>

        <Stack spacing={4} sx={{ padding: '16px', maxHeight: '450px' }}>
          <Stack
            direction={'row'}
            spacing={4}
            sx={{ padding: '8px', borderRadius: '6px', border: `1px solid ${theme.palette.neutral[50]}` }}
          >
            {planningItemInfo?.map((item, index) => {
              return (
                <Stack key={index} spacing={2} width={'100%'}>
                  <MvTypography typeSize={'PX'} size='BODY_LG_NORMAL'>
                    {item.label}
                  </MvTypography>
                  <MvTypography typeSize={'PX'} size='LABEL_LG_NORMAL'>
                    {item.value}
                  </MvTypography>
                </Stack>
              )
            })}
          </Stack>

          <Table columns={columnMaterialPlanning} rows={materialPlanning} checkboxSelection={false} />
        </Stack>
      </Box>
    </>
  )
}
