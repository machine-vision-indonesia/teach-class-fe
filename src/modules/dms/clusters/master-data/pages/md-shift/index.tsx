import { Badge } from '@/components/atoms/badge'
import { Breadcrumbs } from '@/components/atoms/breadcrumbs'
import { Button } from '@/components/atoms/button'
import { MvTypography } from '@/components/atoms/mv-typography'
import ButtonAction from '@/components/molecules/button-action'
import { FilterType } from '@/components/molecules/filter/constants'
import { TableAsyncV2 } from '@/components/molecules/table-async-v2'
import {
  GetTableMDShift,
  MDShift
} from '@/modules/dms/clusters/master-data/pages/md-shift/services/table/fetchShiftList.service'
import { Box, Stack, useTheme } from '@mui/material'
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import { useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AddAndEditModal } from './components/AddAndEditModal'
import { format } from 'date-fns'
import { ActionDeleteShift } from './services/action/actionDeleteShift.service'

const ShiftList = () => {
  const theme = useTheme()
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const [selectedShiftId, setSelectedShiftId] = useState<string>('')
  const [addAndEditModalIsOpen, setAddAndEditModalIsOpen] = useState<'EDIT' | 'ADD' | false>(false)

  const columns: GridColDef[] = [
    {
      field: 'code',
      headerName: 'CODE',
      flex: 1,
      minWidth: 120,
      sortable: true,
      editable: false,
      filterable: false,
      hideable: false,
      disableColumnMenu: true,
      renderCell: (params: GridRenderCellParams) => {
        const row = params.row as MDShift
        return (
          <MvTypography typeSize={'PX'} size={'LABEL_MD_NORMAL'}>
            {row?.code}
          </MvTypography>
        )
      }
    },
    {
      field: 'name',
      headerName: 'SHIFT NAME',
      width: 200,
      sortable: true,
      editable: false,
      filterable: false,
      hideable: false,
      disableColumnMenu: true,
      renderCell: (params: GridRenderCellParams) => {
        const row = params.row as MDShift
        return (
          <MvTypography typeSize={'PX'} size={'LABEL_MD_NORMAL'}>
            {row?.name || ''}
          </MvTypography>
        )
      }
    },
    {
      field: 'is_overtime',
      headerName: 'TYPE',
      width: 140,
      sortable: true,
      editable: false,
      filterable: false,
      hideable: false,
      disableColumnMenu: true,
      renderCell: (params: GridRenderCellParams) => {
        return (
          <MvTypography typeSize={'PX'} size={'LABEL_MD_NORMAL'}>
            {params.row?.is_overtime ? 'Overtime' : 'Regular'}
          </MvTypography>
        )
      }
    },
    {
      field: 'start',
      headerName: 'SHIFT START',
      width: 140,
      sortable: true,
      editable: false,
      filterable: false,
      hideable: false,
      disableColumnMenu: true,
      renderCell: (params: GridRenderCellParams) => {
        const row = params.row as MDShift
        const start = row.start
        return (
          <MvTypography typeSize={'PX'} size={'LABEL_MD_NORMAL'}>
            {format(start, 'HH:mm')}
          </MvTypography>
        )
      }
    },
    {
      field: 'end',
      headerName: 'SHIFT END',
      width: 140,
      sortable: true,
      editable: false,
      filterable: false,
      hideable: false,
      disableColumnMenu: true,
      renderCell: (params: GridRenderCellParams) => {
        const row = params.row as MDShift
        const end = row.end
        return (
          <MvTypography typeSize={'PX'} size={'LABEL_MD_NORMAL'}>
            {format(end, 'HH:mm')}
          </MvTypography>
        )
      }
    },
    {
      field: 'status',
      headerName: 'STATUS',
      width: 100,
      sortable: true,
      editable: false,
      filterable: false,
      hideable: false,
      disableColumnMenu: true,
      renderCell: (params: GridRenderCellParams) => (
        <Badge
          color={params.row.is_active ? 'success' : 'danger'}
          isTransparent
          style={'rect'}
          label={params.row.is_active ? 'Active' : 'Not Active'}
          size='medium'
        />
      )
    },
    {
      field: 'action',
      headerName: 'ACTION',
      width: 220,
      sortable: false,
      editable: false,
      filterable: false,
      hideable: false,
      disableColumnMenu: true,
      headerAlign: 'center',
      renderCell: (params: GridRenderCellParams) => (
        <Stack direction={'row'} spacing={2} width={'100%'} alignItems={'center'} justifyContent={'center'}>
          <Button
            variant='text'
            content='iconOnly'
            icon='tabler:pencil'
            onClick={() => {
              console.log(params.row.id)
              setSelectedShiftId(params.row.id)
              setAddAndEditModalIsOpen('EDIT')
            }}
            sx={{
              minWidth: 0,
              padding: '8px'
            }}
          />
          <ButtonAction
            size='medium'
            icon='tabler:trash'
            payload={null}
            actionService={() => {
              ActionDeleteShift(params.row.id)
            }}
            confirmationStatusVariant='danger'
            modalOptions='default'
            confirmationText={{
              negativeLabel: 'Cancel',
              positiveLabel: 'Yes',
              title: 'Are you sure want to delete?',
              description: 'You won’t be able to revert this!'
            }}
            alertText={{
              error: {
                title: 'Network Errors.',
                description: 'Unable to connect to the network or server.'
              },
              success: {
                title: 'Successfully save data.',
                description: 'Status has been saved by our system.'
              }
            }}
            variant='plain'
            color='error'
            content='iconOnly'
            onSuccessAddition={() => {
              queryClient.invalidateQueries()
            }}
            sx={{
              minWidth: 0,
              padding: '8px'
            }}
          />
          <Button
            variant='text'
            content='iconOnly'
            icon='tabler:eye'
            onClick={() => {
              setSelectedShiftId(params.row.id)
              navigate(`/solutions/dms/master-data/shift/detail/` + params.row.id)
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
      <Stack width={'100%'} alignItems={'flex-start'} rowGap={6}>
        <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} width={'100%'}>
          <Stack spacing={2}>
            <MvTypography typeSize={'PX'} size={'TITLE_XL'}>
              Shift
            </MvTypography>
            <Breadcrumbs
              data={[
                {
                  label: 'Home',
                  path: '/'
                },
                {
                  label: 'Shift',
                  path: '/master-data/shift'
                }
              ]}
            />
          </Stack>
          <Button
            variant='contained'
            color='primary'
            content='iconText'
            icon='tabler:plus'
            text='Create Shift'
            size='medium'
            sx={{
              padding: '8px 12px'
            }}
            onClick={() => {
              setAddAndEditModalIsOpen('ADD')
            }}
          />
        </Stack>

        <Box
          border={`1px solid ${theme.colorToken.border.neutral.normal}`}
          borderRadius={'6px'}
          padding={'16px'}
          bgcolor={theme.colorToken.background.neutral.normal}
          width={'100%'}
        >
          <TableAsyncV2
            dataFetchService={GetTableMDShift}
            columns={columns}
            type='inline'
            resultController={[
              {
                key: 'name',
                name: 'Search Shift Name...',
                type: FilterType.SEARCH
              },
              {
                key: 'is_active',
                name: 'Filter by Status',
                type: FilterType.SELECT,
                valueKey: 'id',
                labelKey: 'name',
                options: [
                  {
                    id: true,
                    name: 'Active'
                  },
                  {
                    id: false,
                    name: 'Not Active'
                  }
                ]
              }
            ]}
          />
        </Box>
      </Stack>
      {addAndEditModalIsOpen && (
        <AddAndEditModal
          modalType={addAndEditModalIsOpen}
          isOpen={!!addAndEditModalIsOpen}
          setIsOpen={setAddAndEditModalIsOpen}
          onClose={() => {
            setSelectedShiftId('')
            setAddAndEditModalIsOpen(false)
          }}
          id={selectedShiftId || ''}
          setId={setSelectedShiftId}
        />
      )}
    </>
  )
}

export default ShiftList
