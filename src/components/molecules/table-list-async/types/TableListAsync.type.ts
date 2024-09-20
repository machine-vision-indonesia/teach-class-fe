import { type DataGridProps } from '@mui/x-data-grid'
import { type UseQueryResult } from '@tanstack/react-query'
import { type IParams } from 'src/types/master/filter'
import { IFilterResult } from '../../filter/types/filterResult.types'

export interface FetchParameters extends IParams {
  search?: string
  filterResult?: IFilterResult
}

export type PropsTableListAsync = {
  limit?: number
  isStripped?: boolean
  dataFetchService: (params?: FetchParameters) => UseQueryResult<{
    data: any[]
    meta?: { filter_count: number }
    aggregate?: { countDistinct: string }
  }>
  columns: (DataGridProps['columns'][number] & {
    searchable?: boolean
  })[]
  defaultSortBy?: string
  maxWidth?: string
  width?: string
  dataKey?: string
  withOnScroll?: boolean
  rowSelection?: boolean
  countBy?: string
  emptyText?: string
  renderEmptyComponent?: React.ReactNode;
}
