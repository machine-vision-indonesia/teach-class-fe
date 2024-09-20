import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import Stack from '@mui/material/Stack'
import MuiTable from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell, { type TableCellProps } from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Typography from '@mui/material/Typography'
import { type ReactNode } from 'react'
import TableContainer from '@mui/material/TableContainer'
import { type NestedKeyOf } from '../../../types/helper'
import getByKey from '../../../utils/object-utils'

export interface ITableHeader<T extends object> {
  label: string
  key: NestedKeyOf<T>
  w?: string
  align?: TableCellProps['align']
  weight?: number
  color?: string
  noPadding?: boolean
  render?: (item: T, index: number) => ReactNode | string
  onClick?: (item: T, index: number) => void
  sticky?: boolean
  backgroundColor?: string
}

interface ITable<T extends object> {
  headers: ITableHeader<T>[]
  data: T[]
  loading?: boolean
  minWidth?: string | number
  onRowClick?: (item: T) => void
  stickyLastCol?: boolean
}
export const Table = <T extends object>({ headers, data, loading, onRowClick, minWidth, stickyLastCol }: ITable<T>) => {
  const renderText = (text: string | number, column: ITableHeader<T>) => {
    return (
      <Box display='flex' justifyContent={column.align}>
        <Typography variant='labelSm' fontWeight={column.weight} noWrap>
          {text}
        </Typography>
      </Box>
    )
  }
  const renderCell = (row: T, column: ITableHeader<T>, rowI: number) => {
    if (!column.render) return renderText(getByKey(row, column.key), column)
    else {
      const customRender = column.render(row, rowI)
      if (typeof customRender == 'string') return renderText(customRender, column)
      else return customRender
    }
  }

  const getOffset = (index: number) => {
    let offset = 0
    headers
      .filter((v, vi) => vi < index)
      .forEach(v => (offset += Number((v?.w?.includes('px') ? v.w.replace('px', '') : v.w) ?? 0)))

    return offset
  }

  return (
    <TableContainer sx={{ height: '100%', maxWidth: '100%' }}>
      <MuiTable
        sx={{
          borderCollapse: 'separate',
          tableLayout: 'fixed',
          minWidth: { minWidth }
        }}
        aria-label='simple table'
        stickyHeader
      >
        <TableHead>
          <TableRow sx={{}}>
            {headers.map((v, index) => (
              <TableCell
                key={v.key as string}
                align={v.align}
                sx={{
                  background: v.backgroundColor ? v.backgroundColor : thm => thm.palette.navbarHeader,
                  borderTop: '1px solid #e2e8f0',
                  borderLeft: index == 0 ? '1px solid #e2e8f0' : undefined,
                  borderRight: index == headers.length - 1 ? '1px solid #e2e8f0' : undefined,
                  width: v.w,
                  position: v?.sticky || (stickyLastCol && index == headers.length - 1) ? 'sticky' : undefined,
                  left: v?.sticky ? (index == 0 ? 0 : getOffset(index)) : undefined,
                  zIndex: v?.sticky || (stickyLastCol && index == headers.length - 1) ? 3 : undefined,
                  right: stickyLastCol && index == headers.length - 1 ? 0 : undefined
                }}
              >
                <Typography variant='TableHeader' fontWeight={700} noWrap>
                  {v.label}
                </Typography>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.length == 0 || loading ? (
            <TableRow sx={{}}>
              <TableCell
                align='center'
                sx={{
                  // borderTopLeftRadius: '12px',
                  // borderBottomLeftRadius: '12px',
                  // borderBottomRightRadius: '12px',
                  borderLeft: '1px solid #e2e8f0',
                  borderRight: '1px solid #e2e8f0'
                }}
                colSpan={headers.length}
              >
                <Stack direction={'row'} spacing={1} justifyContent='center' alignItems='center'>
                  {loading && <CircularProgress size={16} />}
                  <Typography variant='labelSm' noWrap>
                    {loading ? 'Proses...' : 'Data tidak ditemukan'}
                  </Typography>
                </Stack>
              </TableCell>
            </TableRow>
          ) : (
            data.map((row, index) => (
              <TableRow onClick={onRowClick ? () => onRowClick(row) : undefined} hover sx={{}} key={index}>
                {headers.map((v, indexHeader) => (
                  <TableCell
                    key={v.key as string}
                    sx={{
                      // backgroundColor:getByKey(row, activeKey)?'white':'grey.300',
                      borderRight: indexHeader == headers.length - 1 ? '1px solid #e2e8f0' : undefined,
                      borderLeft: indexHeader == 0 ? '1px solid #e2e8f0' : undefined,

                      // borderBottomLeftRadius: index == data.length - 1 && indexHeader == 0 ? '12px' : undefined,
                      // borderBottomRightRadius:
                      //   index == data.length - 1 && indexHeader == headers.length - 1 ? '12px' : undefined,
                      width: v.w,
                      p: v.noPadding ? 0 : undefined,
                      position:
                        v?.sticky || (stickyLastCol && indexHeader == headers.length - 1) ? 'sticky' : undefined,
                      left: v?.sticky ? (indexHeader == 0 ? 0 : getOffset(indexHeader)) : undefined,
                      zIndex: v?.sticky || (stickyLastCol && indexHeader == headers.length - 1) ? 3 : undefined,
                      right: stickyLastCol && indexHeader == headers.length - 1 ? 0 : undefined
                    }}
                    align={v.align}
                    onClick={() => (v.onClick ? v.onClick(row, index) : undefined)}
                  >
                    {renderCell(row, v, index)}
                  </TableCell>
                ))}
              </TableRow>
            ))
          )}
        </TableBody>
      </MuiTable>
    </TableContainer>
  )
}
