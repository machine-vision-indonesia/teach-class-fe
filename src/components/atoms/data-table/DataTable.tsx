import { Icon } from '@iconify/react'
import { DataGrid, DataGridProps } from '@mui/x-data-grid'
import React from 'react'

export const DataTable = (props: DataGridProps) => {
  return (
    <DataGrid
      sx={{
        '& .MuiDataGrid-columnHeader': {
          backgroundColor: thm => thm.palette.navbarHeader
        },
        '& .MuiDataGrid-columnHeaderTitle': {
          color: thm => thm.palette.text.secondary
        }
      }}
      components={{
        ColumnSortedAscendingIcon: () => <Icon icon={'mdi:chevron-up'} />,
        ColumnSortedDescendingIcon: () => <Icon icon={'mdi:chevron-down'} />
      }}
      {...props}
    />
  )
}
