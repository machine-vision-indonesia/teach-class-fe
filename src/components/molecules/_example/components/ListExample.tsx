import React from 'react'
import { Box, Button } from '@mui/material'
import Icon from 'src/@core/components/icon'

import { TColumnAsync } from '@/components/molecules/table-async/TableAsync.type'
import ButtonAction from '../../button-action'
import { TableAsync } from '../../table-async/TableAsync'
import { getListExample } from '../services/listExample.service'

export const ListExample: React.FC = () => {
  const tableColumns: TColumnAsync[] = [
    {
      field: 'name',
      headerName: 'Name',
      flex: 1,
      sortable: false,
      disableColumnMenu: true,
      searchable: true
    },
    {
      field: 'description',
      headerName: 'Description',
      flex: 1,
      sortable: false,
      disableColumnMenu: true,
      searchable: true
    },
    {
      field: 'status',
      headerName: 'Status',
      flex: 1,
      sortable: false,
      disableColumnMenu: true,
      searchable: true
    },
    {
      field: 'actions',
      headerName: 'Action',
      flex: 1,
      maxWidth: 146,
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params: any) => {
        const deletePayload = {
          id: params.id
        }

        return (
          <Box display='flex' alignItems='center' columnGap='16px' justifyContent='center' width='100%'>
            <Button style={{ padding: 0, minWidth: 'auto', color: 'brand.second' }} type='button' onClick={() => {}}>
              <Icon icon='mdi:pencil-outline' fontSize='22px' />
            </Button>
            <Button style={{ padding: 0, minWidth: 'auto', color: 'primary.main' }} type='button' onClick={() => {}}>
              <Icon icon='mdi:eye-outline' fontSize='22px' />
            </Button>
            <ButtonAction
              variant='text'
              children={<Icon icon='mdi:delete-outline' fontSize='22px' />}
              modalOptions='default'
              modalTitle='Are you sure you want to delete this role?'
              payload={deletePayload}
              // actionService={useDeleteExample}
              // onSuccessAddition={() => queryClient.invalidateQueries()}
            />
          </Box>
        )
      },
      headerAlign: 'center'
    }
  ]

  return (
    <main>
      <Box sx={{ display: 'flex', width: '100%' }}>
        <TableAsync isStripped columns={tableColumns} dataFetchService={getListExample} />
      </Box>
    </main>
  )
}
