import React, { useState } from 'react'
import { Breadcrumbs } from '@/components/atoms/breadcrumbs'
import { MvTypography } from '@/components/atoms/mv-typography'
import { Box, Stack, useTheme } from '@mui/material'
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import { Badge } from '@/components/atoms/badge'
import { Table } from '@/components/molecules/table'
import { Button } from '@/components/atoms/button'
import { AddModal } from './components/AddModal'
import { EditModal } from './components/EditModal'
import { DeleteModal } from './components/DeleteModal'
import Toaster from '@/modules/dms/common/components/Toaster'
import { useAtomValue } from 'jotai'
import { toasterDataAtom } from '@/modules/dms/common/stores/atoms'

const MaterialUnit = () => {
  const theme = useTheme()

  const toasterData = useAtomValue(toasterDataAtom)

  const [selectedMaterialUnitId, setSelectedMaterialUnitId] = useState<string | number | null>(null)
  const [addModalIsOpen, setAddModalIsOpen] = useState(false)
  const [editModalIsOpen, setEditModalIsOpen] = useState(false)
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false)

  const columns: GridColDef[] = [
    {
      field: 'code',
      headerName: 'CODE',
      flex: 0,
      width: 150,
      sortable: false,
      editable: false,
      filterable: false,
      hideable: false,
      disableColumnMenu: true
    },
    {
      field: 'unit_name',
      headerName: 'UNIT NAME',
      flex: 0,
      width: 250,
      sortable: false,
      editable: false,
      filterable: false,
      hideable: false,
      disableColumnMenu: true
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
      field: 'status',
      headerName: 'STATUS',
      flex: 0,
      width: 100,
      sortable: false,
      editable: false,
      filterable: false,
      hideable: false,
      disableColumnMenu: true,
      renderCell: (params: GridRenderCellParams) => (
        <Badge color={'success'} isTransparent style={'rect'} label={params.row.status} size='medium' />
      )
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
        <Stack direction={'row'} spacing={2} width={'100%'} alignItems={'center'} justifyContent={'center'}>
          <Button
            variant='text'
            content='iconOnly'
            icon='tabler:pencil'
            onClick={() => {
              console.log(params.row.id)
              setSelectedMaterialUnitId(params.row.id)
              setEditModalIsOpen(true)
            }}
            sx={{
              minWidth: 0,
              padding: '8px'
            }}
          />
          <Button
            color='error'
            variant='text'
            content='iconOnly'
            icon='tabler:trash'
            onClick={() => {
              console.log(params.row.id)
              setSelectedMaterialUnitId(params.row.id)
              setDeleteModalIsOpen(true)
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

  const rows = [
    {
      id: 0,
      code: 'MatCod001',
      unit_name: 'Document/Label/Stiker',
      description:
        'Lorem ipsum dolor sit amet consectetur. Pretium et vel sit at convallis faucibus duis. Augue accumsan felis enim cras sed. Natoque massa amet sapien nisl vel nunc. Faucibus id felis neque elementum ipsum vestibulum vulputate at semper.',
      status: 'Active'
    },
    {
      id: 1,
      code: 'MatCod002',
      unit_name: 'Packing',
      description:
        'Lorem ipsum dolor sit amet consectetur. Pretium et vel sit at convallis faucibus duis. Augue accumsan felis enim cras sed. Natoque massa amet sapien nisl vel nunc. Faucibus id felis neque elementum ipsum vestibulum vulputate at semper.',
      status: 'Active'
    },
    {
      id: 2,
      code: 'MatCod003',
      unit_name: 'Safety',
      description:
        'Lorem ipsum dolor sit amet consectetur. Pretium et vel sit at convallis faucibus duis. Augue accumsan felis enim cras sed. Natoque massa amet sapien nisl vel nunc. Faucibus id felis neque elementum ipsum vestibulum vulputate at semper.',
      status: 'Active'
    }
  ]

  return (
    <>
      {toasterData && <Toaster />}
      <Stack width={'100%'} alignItems={'flex-start'} rowGap={6}>
        <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} width={'100%'}>
          <Stack spacing={2}>
            <MvTypography typeSize={'PX'} size={'TITLE_XL'}>
              Material Unit
            </MvTypography>
            <Breadcrumbs
              data={[
                {
                  label: 'Home',
                  path: '/'
                },
                {
                  label: 'Material Unit',
                  path: '/master-data/material-unit'
                }
              ]}
            />
          </Stack>
          <Button
            variant='contained'
            color='primary'
            content='iconText'
            icon='tabler:plus'
            text='Create Material Unit'
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
          {/* Kalo dah ada service + data nya */}
          {/* <TableAsyncV2
          dataFetchService={GetTableUsers}
          columns={[
            {
              field: 'email',
              headerName: 'EMAIL',
              flex: 1,
              sortable: true,
              disableColumnMenu: true
            },
            {
              field: 'sto.name',
              headerName: 'DEPARTMENT',
              valueGetter: (params: GridValueGetterParams) => params.row.sto?.name || '-',
              flex: 1,
              sortable: true,
              disableColumnMenu: true
            },
            {
              field: 'sto.date_created',
              headerName: 'DEPARTMENT DATE CREATED',
              valueGetter: (params: GridValueGetterParams) => {
                if (!params.row.sto) {
                  return '-'
                }

                const date = new Date(params.row.sto.date_created)

                return formatInTimeZone(date, 'Asia/Jakarta', 'dd MMMM yyyy')
              },
              flex: 1,
              sortable: false,
              disableColumnMenu: true
            },
            {
              field: 'actions',
              headerName: 'ACTIONS',
              renderCell: () => (
                <Stack direction='row' justifyContent={'center'}>
                  <IconButton color='primary' size='small'>
                    <Icon icon='tabler:pencil' />
                  </IconButton>
                </Stack>
              ),
              flex: 1,
              sortable: false,
              disableColumnMenu: true
            }
          ]}
          type='inline'
          resultController={[
            {
              key: 'name',
              name: 'Search Status...',
              type: FilterType.SEARCH
            },
            {
              key: 'category',
              name: 'Filter by Category',
              type: FilterType.SELECT,
              dataFetchService: fetchDepartments,
              valueKey: 'id',
              labelKey: 'name'
            }
          ]}
        /> */}
          <Table
            columns={columns}
            rows={rows}
            checkboxSelection={false}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 10
                }
              }
            }}
            pagination={true}
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
            setSelectedMaterialUnitId('')
            setEditModalIsOpen(false)
          }}
          id={selectedMaterialUnitId || ''}
          setId={setSelectedMaterialUnitId}
        />
      )}
      {deleteModalIsOpen && (
        <DeleteModal
          isOpen={deleteModalIsOpen}
          setIsOpen={setDeleteModalIsOpen}
          onClose={() => {
            setSelectedMaterialUnitId('')
            setDeleteModalIsOpen(false)
          }}
          id={selectedMaterialUnitId || ''}
          setId={setSelectedMaterialUnitId}
        />
      )}
    </>
  )
}

export default MaterialUnit
