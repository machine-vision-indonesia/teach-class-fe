import React, { useState } from 'react'
import { Breadcrumbs } from '@/components/atoms/breadcrumbs'
import { MvTypography } from '@/components/atoms/mv-typography'
import { Box, Stack, useTheme } from '@mui/material'
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import { Badge } from '@/components/atoms/badge'
import { Button } from '@/components/atoms/button'
import { DeleteModal } from './components/DeleteModal'
import { TableAsyncV2 } from '@/components/molecules/table-async-v2'
import { FilterType } from '@/components/molecules/filter/constants'
import { BASE_MASTER_DATA_PATH } from '@/modules/dms/common/constants'
import { GetTableMDCategoryChecklist } from './services/table/fetchCategoryChecklist.service'
import { FormModal } from './components/FormModal'

const CategoryChecklist = () => {
  const theme = useTheme()

  const [selectedCategoryChecklistId, setSelectedCategoryChecklistId] = useState<string>('')
  const [formModalIsOpen, setFormModalIsOpen] = useState(false)
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false)
  const isEditMode = !!selectedCategoryChecklistId

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
      field: 'name',
      headerName: 'CATEGORY',
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
      minWidth: 200,
      maxWidth: 700,
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
      flex: 0,
      width: 200,
      sortable: false,
      editable: false,
      filterable: false,
      hideable: false,
      headerAlign: 'center',
      disableColumnMenu: true,
      renderCell: (params: GridRenderCellParams) => (
        <Stack direction={'row'} width={'100%'} spacing={2} alignItems={'center'} justifyContent={'center'}>
          <Button
            variant='text'
            content='iconOnly'
            icon='tabler:pencil'
            onClick={() => {
              setSelectedCategoryChecklistId(params.row.id)
              setFormModalIsOpen(true)
            }}
            sx={{
              minWidth: 0,
              padding: '8px'
            }}
          />
          {/* Hidden due to flow changes */}
          {false && (
            <Button
              color='error'
              variant='text'
              content='iconOnly'
              icon='tabler:trash'
              onClick={() => {
                setSelectedCategoryChecklistId(params.row.id)
                setDeleteModalIsOpen(true)
              }}
              sx={{
                minWidth: 0,
                padding: '8px'
              }}
            />
          )}
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
              Category Checklist
            </MvTypography>
            <Breadcrumbs
              data={[
                {
                  label: 'Home',
                  path: '/'
                },
                {
                  label: 'Category Checklist',
                  path: `${BASE_MASTER_DATA_PATH}/category-checklist`
                }
              ]}
            />
          </Stack>
          {/* Hidden, due to flow changes */}
          {false && (
            <Button
              variant='contained'
              color='primary'
              content='iconText'
              icon='tabler:plus'
              text='Create Category Checklist'
              size='medium'
              sx={{
                padding: '8px 12px'
              }}
              onClick={() => {
                setFormModalIsOpen(true)
              }}
            />
          )}
        </Stack>

        <Box
          border={`1px solid ${theme.colorToken.border.neutral.normal}`}
          borderRadius={'6px'}
          padding={'16px'}
          bgcolor={theme.colorToken.background.neutral.normal}
          width={'100%'}
        >
          <TableAsyncV2
            dataFetchService={GetTableMDCategoryChecklist}
            columns={columns}
            type='inline'
            resultController={[
              {
                key: 'name',
                name: 'Search Category...',
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
      {formModalIsOpen && (
        <FormModal
          isOpen={formModalIsOpen}
          setIsOpen={setFormModalIsOpen}
          onClose={() => {
            setSelectedCategoryChecklistId('')
            setFormModalIsOpen(false)
          }}
          id={selectedCategoryChecklistId || ''}
          setId={setSelectedCategoryChecklistId}
          actionType={isEditMode ? 'UPDATE' : 'CREATE'}
        />
      )}
      {deleteModalIsOpen && (
        <DeleteModal
          isOpen={deleteModalIsOpen}
          setIsOpen={setDeleteModalIsOpen}
          onClose={() => {
            setSelectedCategoryChecklistId('')
            setDeleteModalIsOpen(false)
          }}
          id={selectedCategoryChecklistId || ''}
          setId={setSelectedCategoryChecklistId}
        />
      )}
    </>
  )
}

export default CategoryChecklist
