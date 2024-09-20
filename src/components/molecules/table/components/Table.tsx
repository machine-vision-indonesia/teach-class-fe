import * as React from 'react'
import { DataGrid, GridRenderCellParams, GridColDef } from '@mui/x-data-grid'
import { PropsTable } from '../types/table.type'
import { Box } from '@mui/material'
import { MvTypography } from '@/components/atoms/mv-typography'

/**
 * React component for rendering a data table.
 *
 * @param {PropsTable} columns - The columns of the data table.
 * @param {any[]} rows - The rows of the data table.
 * @return {JSX.Element} The JSX element representing the data table.
 */
const Table: React.FC<PropsTable> = ({ columns, rows, checkboxSelection = true, ...props }) => {
  const enhancedColumns: GridColDef[] = columns.map(col => ({
    ...col,
    headerName: col.required ? (
      <Box display='flex' alignItems='center' justifyContent={'center'} gap={2} width='100%'>
        <MvTypography typeSize={'PX'} size={'LABEL_MD_BOLDEST'}>
          {col.headerName}
        </MvTypography>
        <MvTypography typeSize={'PX'} size={'LABEL_MD_BOLDEST'} color={'red'}>
          *
        </MvTypography>
      </Box>
    ) : (
      <Box display='flex' alignItems='center' justifyContent={'center'} width='100%'>
        <MvTypography typeSize={'PX'} size={'LABEL_MD_BOLDEST'}>
          {col.headerName}
        </MvTypography>
      </Box>
    ),
    renderCell: (params: GridRenderCellParams) => (
      <Box display='flex' justifyContent={col.justifyContent || 'flex-start'} width='100%'>
        {col.renderCell ? col.renderCell(params) : params.value}
      </Box>
    ),
    sortComparator: (v1, v2, param1, param2) => {
      // Implement your custom sorting logic for individual cells within each row here
      if (typeof v1 === 'string' && typeof v2 === 'string') {
        return v1.localeCompare(v2)
      }
      if (typeof v1 === 'number' && typeof v2 === 'number') {
        return v1 - v2
      }
      return 0
    }
  }))

  return (
    <>
      <DataGrid
        rows={rows}
        columns={enhancedColumns}
        checkboxSelection={checkboxSelection}
        disableRowSelectionOnClick
        hideFooter
        {...props}
      />
    </>
  )
}

export default Table
