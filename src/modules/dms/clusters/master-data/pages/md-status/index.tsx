import { Breadcrumbs } from '@/components/atoms/breadcrumbs'
import { MvTypography } from '@/components/atoms/mv-typography'
import { Box, Stack, useTheme } from '@mui/material'
import React, { useState } from 'react'
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import { Badge } from '@/components/atoms/badge'
import { EditModal } from './components/EditModal'
import { Button } from '@/components/atoms'
import { GetTableMDStatus, MDStatus } from './services/table/fetchStatusList.service'
import { TableAsyncV2 } from '@/components/molecules/table-async-v2'
import { FilterType } from '@/components/molecules/filter/constants'
import { fetchCategoryDropdown } from './services/fetch/fetchCategoryDropdown.service'
import { isValidHex } from '@/modules/dms/common/utils'

const StatusList = () => {
  const theme = useTheme()
  const [selectedStatusId, setSelectedStatusId] = useState<string>('')
  const [editModalIsOpen, setEditModalIsOpen] = useState(false)

  const columns: GridColDef[] = [
    {
      field: 'name',
      headerName: 'STATUS NAME',
      flex: 0,
      width: 250,
      sortable: false,
      editable: false,
      filterable: false,
      hideable: false,
      disableColumnMenu: true,
      renderCell: (params: GridRenderCellParams) => (
        <Badge
          color={params.row.color ? (isValidHex(params.row.color) ? params.row.color : 'primary') : 'primary'}
          isTransparent
          style={'circular'}
          label={params.row.name}
          size='medium'
        />
      )
    },
    {
      field: 'category',
      headerName: 'CATEGORY',
      flex: 0,
      width: 250,
      sortable: false,
      editable: false,
      filterable: false,
      hideable: false,
      disableColumnMenu: true,
      renderCell: (params: GridRenderCellParams) => {
        const row = params.row as MDStatus
        return (
          <MvTypography typeSize={'PX'} size={'LABEL_MD_NORMAL'}>
            {row?.category_id?.category_name || ''}
          </MvTypography>
        )
      }
    },
    {
      field: 'description',
      headerName: 'DESCRIPTION',
      flex: 1,
      minWidth: 400,
      sortable: false,
      editable: false,
      filterable: false,
      hideable: false,
      disableColumnMenu: true
    },
    {
      field: 'action',
      headerName: 'ACTION',
      flex: 0,
      width: 200,
      sortable: false,
      editable: false,
      filterable: false,
      hideable: false,
      headerAlign: 'center',
      disableColumnMenu: true,
      renderCell: (params: GridRenderCellParams) => (
        <Stack direction={'row'} width={'100%'} justifyContent={'center'}>
          <Button
            variant='text'
            content='iconOnly'
            icon='tabler:pencil'
            onClick={() => {
              setSelectedStatusId(params.row.id)
              setEditModalIsOpen(true)
            }}
            sx={{
              minWidth: 0,
              padding: '8px'
            }}
          />
        </Stack>
      )
    }
  ]

  return (
    <>
      <Stack width={'100%'} alignItems={'flex-start'} rowGap={4}>
        <MvTypography typeSize={'PX'} size={'TITLE_XL'}>
          Status Management
        </MvTypography>
        <Breadcrumbs
          data={[
            {
              label: 'Home',
              path: '/'
            },
            {
              label: 'Status Management',
              path: '/master-data/status'
            }
          ]}
        />
        <Box
          border={`1px solid ${theme.colorToken.border.neutral.normal}`}
          borderRadius={'6px'}
          padding={'16px'}
          bgcolor={theme.colorToken.background.neutral.normal}
          width={'100%'}
        >
          <TableAsyncV2
            dataFetchService={GetTableMDStatus}
            columns={columns}
            type='inline'
            resultController={[
              {
                key: 'name',
                name: 'Search Status...',
                type: FilterType.SEARCH
              },
              {
                key: 'category_id',
                name: 'Filter by Category',
                type: FilterType.SELECT,
                dataFetchService: fetchCategoryDropdown,
                valueKey: 'id',
                labelKey: 'category_name'
              }
            ]}
          />
        </Box>
        {editModalIsOpen && (
          <EditModal
            isOpen={editModalIsOpen}
            setIsOpen={setEditModalIsOpen}
            onClose={() => {
              setSelectedStatusId('')
              setEditModalIsOpen(false)
            }}
            id={selectedStatusId || ''}
            setId={setSelectedStatusId}
          />
        )}
      </Stack>
    </>
  )
}

export default StatusList
