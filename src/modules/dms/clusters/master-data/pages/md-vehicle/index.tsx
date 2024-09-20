import React, { useState } from 'react'
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import { Box, Stack, useTheme } from '@mui/material'
import { useAtomValue } from 'jotai'

import { Breadcrumbs } from '@/components/atoms/breadcrumbs'
import { MvTypography } from '@/components/atoms/mv-typography'
import { Badge } from '@/components/atoms/badge'
import { Button } from '@/components/atoms/button'

import Toaster from '@/modules/dms/common/components/Toaster'
import { toasterDataAtom } from '@/modules/dms/common/stores/atoms'

import { VehicleModalType } from './types/modal.types'
import { FormVehicleModal } from './components/FormVehicleModal'
import { IVehicleData } from './types/vehicle.types'
import { TableAsyncV2 } from '@/components/molecules/table-async-v2'
import ButtonAction from '@/components/molecules/button-action'
import { ActionDeleteVehicle } from './services/action/actionVehicle.service'
import { useQueryClient } from '@tanstack/react-query'
import { GetTablePageVehicle } from './services/table/tableVehicle.service'
import { FilterType } from '@/components/molecules/filter/constants'

const defaultColumnProps = {
  editable: false,
  filterable: false,
  hideable: false,
  disableColumnMenu: true
}

const Vehicle = () => {
  const theme = useTheme()
  const toasterData = useAtomValue(toasterDataAtom)

  const [selectedVehicleData, setSelectedVehicleData] = useState<IVehicleData | undefined>()
  const [openModal, setOpenModal] = useState<VehicleModalType>(null)

  const queryClient = useQueryClient()

  const columns: GridColDef[] = [
    {
      field: 'code',
      headerName: 'CODE',
      flex: 1,
      minWidth: 100,
      sortable: false,
      ...defaultColumnProps
    },
    {
      field: 'vehicle_name',
      headerName: 'VEHICLE NAME',
      flex: 1,
      minWidth: 150,
      sortable: false,
      ...defaultColumnProps
    },
    {
      field: 'description',
      headerName: 'DESCRIPTION',
      flex: 4,
      minWidth: 300,
      sortable: false,
      ...defaultColumnProps
    },
    {
      field: 'status',
      headerName: 'STATUS',
      flex: 1,
      minWidth: 100,
      sortable: false,
      renderCell: (params: GridRenderCellParams) => {
        const isActive = params.row.is_active

        return (
          <Badge
            color={isActive ? 'success' : 'danger'}
            isTransparent
            style={'rect'}
            label={isActive ? 'Active' : 'Inactive'}
            size='medium'
          />
        )
      },
      ...defaultColumnProps
    },
    {
      field: 'action',
      headerName: 'ACTION',
      width: 125,
      sortable: false,
      headerAlign: 'center',
      renderCell: (params: GridRenderCellParams) => (
        <Stack direction={'row'} width={'100%'} alignItems={'center'} justifyContent={'center'}>
          <Button
            variant='text'
            content='iconOnly'
            icon='tabler:pencil'
            onClick={() => {
              setSelectedVehicleData(params.row)
              setOpenModal('edit-vehicle')
            }}
            sx={{
              minWidth: 0,
              padding: '8px'
            }}
          />

          <ButtonAction
            onClick={() => {}}
            size='medium'
            payload={{}}
            actionService={async () => {
              await ActionDeleteVehicle(params.row)
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
            onSuccessAddition={() => {
              queryClient.invalidateQueries()
            }}
            sx={{
              minWidth: 0,
              padding: '8px'
            }}
          />
        </Stack>
      ),
      ...defaultColumnProps
    }
  ]

  const handleCloseModal = () => {
    setOpenModal(null)
    setSelectedVehicleData(undefined)
  }

  return (
    <>
      <Stack width={'100%'} alignItems={'flex-start'} rowGap={6}>
        <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} width={'100%'}>
          <Stack spacing={2}>
            <MvTypography typeSize={'PX'} size={'TITLE_XL'}>
              Vehicle
            </MvTypography>
            <Breadcrumbs
              data={[
                { label: 'Home', path: '/' },
                { label: 'Vehicle', path: '/master-data/vehicle' }
              ]}
            />
          </Stack>
          <Button
            variant='contained'
            color='primary'
            content='iconText'
            icon='tabler:plus'
            text='Create Vehicle'
            size='medium'
            sx={{
              padding: '8px 12px'
            }}
            onClick={() => {
              setOpenModal('add-vehicle')
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
            columns={columns}
            dataFetchService={GetTablePageVehicle}
            type='inline'
            resultController={[
              {
                key: 'name',
                name: 'Search Vehicle...',
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
      {openModal && (
        <FormVehicleModal
          isOpen={!!openModal}
          setIsOpen={setOpenModal}
          onClose={handleCloseModal}
          modalData={selectedVehicleData}
          modalType={openModal}
        />
      )}
    </>
  )
}

export default Vehicle
