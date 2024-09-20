import { IParams } from '@/types/master/filter'
import { EventClickArg } from '@fullcalendar/core/index.js'
import { UseQueryResult } from '@tanstack/react-query'
import { ReactNode } from 'react'
import { IFilterResult } from '../../filter/types/filterResult.types'

export interface Event {
  title: string
  date: string
  color: string
  status: string
}
export interface FetchParameters extends IParams {
  search?: string
  filterResult?: IFilterResult
}

export type PropsCalendar = {
  children?: ReactNode
  limit?: number
  title?: string
  rightHeaderContent?: ReactNode
  isStripped?: boolean
  isAddEvent?: boolean
  dataFetchService: (params?: FetchParameters) => UseQueryResult<{
    data: any[]
    meta?: { filter_count: number }
    aggregate?: { countDistinct: string }
  }>
  hideSearchBar?: boolean
  searchText?: string
  defaultSortBy?: string
  maxWidth?: string
  width?: string
  dataKey?: string
  withOnScroll?: boolean
  rowSelection?: boolean
  countBy?: string
  persistentFilters?: boolean
  onClick?: (el: EventClickArg) => void
  dateKey?: string
  colorKey?: string
  titleKey?: string
}

export interface GetCalendarResponse {
  data: Event[]
}
