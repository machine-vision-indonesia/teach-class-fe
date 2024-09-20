import React, { useState } from 'react'
import { Breadcrumbs } from '@/components/atoms/breadcrumbs'
import { MvTypography } from '@/components/atoms/mv-typography'
import { Box, Stack, useTheme } from '@mui/material'
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import { Badge } from '@/components/atoms/badge'
import { Button } from '@/components/atoms/button'
import { ViewModal } from './components/modal/ViewModal'
import { useAtomValue } from 'jotai'
import { toasterDataAtom } from '@/modules/dms/common/stores/atoms'
import Toaster from '@/modules/dms/common/components/Toaster'
import { TableAsyncV2 } from '@/components/molecules/table-async-v2'
import { FilterType } from '@/components/molecules/filter/constants'
import { AddModal } from './components/modal/AddModal'
import { EditModal } from './components/modal/EditModal'
import ButtonAction from '@/components/molecules/button-action'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ActionDeleteChecklist, RequestBodyChecklist } from './services/action/actionChecklist.service'
import { GetTableMDChecklist } from './services/table/tableChecklist.service'

const Checklist = () => {
  const theme = useTheme()

  const toasterData = useAtomValue(toasterDataAtom)

  const [selectedChecklistId, setSelectedChecklistId] = useState<string | number | null>(null)
  const [data, setData] = useState<any[]>([])
  const [addModalIsOpen, setAddModalIsOpen] = useState(false)
  const [editModalIsOpen, setEditModalIsOpen] = useState(false)
  const [viewModalIsOpen, setViewModalIsOpen] = useState(false)
  const queryClient = useQueryClient()
  const { mutateAsync } = useMutation({
    mutationFn: ActionDeleteChecklist<RequestBodyChecklist>
  })

  const columns: GridColDef[] = [
    {
      field: 'code',
      headerName: 'CODE',
      width: 150,
      sortable: false,
      editable: false,
      filterable: false,
      hideable: false,
      disableColumnMenu: true
    },
    {
      field: 'category_checksheet_id.name',
      headerName: 'CATEGORY',
      width: 250,
      sortable: false,
      editable: false,
      filterable: false,
      hideable: false,
      disableColumnMenu: true,
      renderCell: (params: GridRenderCellParams) => {
        return (
          <MvTypography typeSize={'PX'} size={'BODY_MD_NORMAL'}>
            {params.row.category_checksheet_id.name}
          </MvTypography>
        )
      }
    },
    {
      field: 'name',
      headerName: 'CHECKLIST NAME',
      width: 150,
      sortable: false,
      editable: false,
      filterable: false,
      hideable: false,
      disableColumnMenu: true
    },
    {
      field: 'production_checksheet_lists',
      headerName: 'TOTAL CHECKLIST',
      width: 200,
      sortable: false,
      editable: false,
      filterable: false,
      hideable: false,
      disableColumnMenu: true,
      renderCell: (params: GridRenderCellParams) => {
        return (
          <MvTypography typeSize={'PX'} size={'BODY_MD_NORMAL'}>
            {params.row.production_checksheet_lists.length}
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
      field: 'is_active',
      headerName: 'STATUS',
      width: 100,
      sortable: false,
      editable: false,
      filterable: false,
      hideable: false,
      disableColumnMenu: true,
      renderCell: (params: GridRenderCellParams) => {
        if (params.row?.is_active == true) {
          return <Badge color={'success'} isTransparent style={'rect'} label={'Active'} size='medium' />
        } else {
          return <Badge color={'danger'} isTransparent style={'rect'} label={'Inactive'} size='medium' />
        }
      }
    },
    {
      field: 'action',
      headerName: 'ACTION',
      width: 220,
      sortable: false,
      editable: false,
      filterable: false,
      hideable: false,
      headerAlign: 'center',
      disableColumnMenu: true,
      renderCell: (params: GridRenderCellParams) => (
        <Stack direction={'row'} spacing={2} width={'100%'} alignItems={'center'} justifyContent={'center'}>
          <Button
            variant='text'
            content='iconOnly'
            icon='tabler:pencil'
            onClick={() => {
              setSelectedChecklistId(params.row.id)
              setEditModalIsOpen(true)
              setData(params.row)
            }}
            sx={{
              minWidth: 0,
              padding: '8px'
            }}
          />
          <ButtonAction
            isValid={true}
            onClick={() => {}}
            size='medium'
            payload={{}}
            actionService={async () => {
              await mutateAsync(params.row)
              queryClient.invalidateQueries()
            }}
            confirmationStatusVariant='danger'
            modalOptions='default'
            confirmationText={{
              negativeLabel: 'Cancel',
              positiveLabel: 'Yes',
              title: 'Are you sure want to delete ?',
              description: 'You won’t be able to revert this!'
            }}
            alertText={{
              error: {
                title: 'Network Errors.',
                description: 'Unable to connect to the network or server.'
              },
              success: {
                title: 'Successfully delete data.',
                description: 'Vehicle has been deleted by our system.'
              }
            }}
            variant='text'
            color='error'
            content='iconOnly'
            icon='tabler:trash'
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
              setSelectedChecklistId(params.row.id)
              setViewModalIsOpen(true)
              setData(params.row)
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
      {toasterData && <Toaster />}
      <Stack width={'100%'} alignItems={'flex-start'} rowGap={6}>
        <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} width={'100%'}>
          <Stack spacing={2}>
            <MvTypography typeSize={'PX'} size={'TITLE_XL'}>
              Checklist
            </MvTypography>
            <Breadcrumbs
              data={[
                {
                  label: 'Home',
                  path: '/'
                },
                {
                  label: 'Checklist',
                  path: '/master-data/checklist'
                }
              ]}
            />
          </Stack>
          <Button
            variant='contained'
            color='primary'
            content='iconText'
            icon='tabler:plus'
            text='Create Checklist'
            size='medium'
            sx={{
              padding: '8px 12px'
            }}
            onClick={() => {
              setAddModalIsOpen(true)
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
            dataFetchService={GetTableMDChecklist}
            columns={columns}
            type='inline'
            resultController={[
              {
                key: 'name',
                name: 'Search Status...',
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
      {addModalIsOpen && (
        <AddModal
          isOpen={addModalIsOpen}
          setIsOpen={setAddModalIsOpen}
          onClose={() => {
            setAddModalIsOpen(false)
          }}
        />
      )}
      {editModalIsOpen && (
        <EditModal
          isOpen={editModalIsOpen}
          setIsOpen={setEditModalIsOpen}
          onClose={() => {
            setSelectedChecklistId('')
            setEditModalIsOpen(false)
          }}
          id={selectedChecklistId || ''}
          data={data}
        />
      )}
      {viewModalIsOpen && (
        <ViewModal
          isOpen={viewModalIsOpen}
          setIsOpen={setViewModalIsOpen}
          onClose={() => {
            setSelectedChecklistId('')
            setViewModalIsOpen(false)
          }}
          id={selectedChecklistId || ''}
          setId={setSelectedChecklistId}
          setEditModalIsOpen={setEditModalIsOpen}
          data={data}
        />
      )}
    </>
  )
}

export default Checklist
