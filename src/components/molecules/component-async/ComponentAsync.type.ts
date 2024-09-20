import { DataGridProps } from '@mui/x-data-grid'
import { type UseQueryResult } from '@tanstack/react-query'
import { type IParams } from 'src/types/master/filter'

export interface FetchParameters extends IParams {
  search?: string
}

export type DropdownGroupFilter = {
  name: string
  labelKey: string
  field: string
  dataFetchService: () => UseQueryResult<{ data: any[] }>
}

export type DropdownMultipleCustomFilter = {
  type: 'dropdown-multiple-custom'
  label: string
  group: DropdownGroupFilter[]
}

export type DropdownMultipleFilter = {
  type: 'dropdown-multiple'
  name: string
  labelKey: string
  field: string
  dataFetchService: () => UseQueryResult<{ data: any[] }>
}

type DateFilter = {
  type: 'date'
  name: string
  field: string

  // TODO: isTimestamp: boolean
}

type Filter = DropdownMultipleFilter | DateFilter | DropdownMultipleCustomFilter

export type PropsComponent = {
  limit?: number
  title?: string
  dataFetchService: (params?: FetchParameters) => UseQueryResult<{ data: any[]; meta: { filter_count: number } }>
  filters?: Filter[]
  columns: (DataGridProps['columns'][number] & {
    searchable?: boolean
  })[]
  sortingServerside?: boolean
  url?: string
}

export type FilterType = Filter['type']
