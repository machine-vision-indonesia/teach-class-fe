import { PaginationProps as MUIPaginationProps } from '@mui/material/Pagination'

export type TypePaginationSize = 'small' | 'medium' | 'large'
export type TypePaginationShape = 'square' | 'rounded'

export interface PropsPagination extends Omit<MUIPaginationProps, 'shape'> {
  page: number
  count: number
  limit: number
  size: TypePaginationSize
  shape: TypePaginationShape
  width?: string
}
