import { type DataGridProps } from '@mui/x-data-grid'
import { type UseQueryResult } from '@tanstack/react-query'
import { type IParams } from 'src/types/master/filter'
import { IFilterResult } from '../../filter/types/filterResult.types'
import { IDataViewController, IResultController } from '../../filter/types/filter.types'

export interface FetchParameters extends IParams {
  search?: string
  filterResult?: IFilterResult
}

export type PropsTableAsyncCollapsed = {
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
  renderEmptyComponent?: React.ReactNode
  isCollapsed?: boolean
  groupFieldBy?: string
  groupFieldKeyTitle?: string
  groupName?: string
  resultController?: IResultController[]
  dataViewController?: IDataViewController[]
}

type Sto = {
  name: string
}

type User = {
  id: string
  email: string | null
  sto: Sto | null
}

type GetTableUsersMeta = {
  filter_count: number
}

export type GetTableUsersResponse = {
  data: User[]
  meta: GetTableUsersMeta
}

export type ActionButtonProps = {
  user: GetTableUsersResponse['data'][number]
}
