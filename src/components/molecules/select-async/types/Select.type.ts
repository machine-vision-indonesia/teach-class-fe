import { AutocompleteProps } from '@mui/material'
import { UseInfiniteQueryResult } from '@tanstack/react-query'
import { IParams } from '@/types/master/filter'

export interface FetchParameters extends IParams {
  limit?: number
  page?: number
  search?: string
  hasNextPage?: boolean
  fetchNextPage?: () => void
  isFetchingNextPage?: boolean
}

export interface Event {
  title: string
  date: string
  color: string
  status: string
}

interface DataPage {
  data: Event[]
}

export interface GetSelectResponse {
  data: Event[]
  pages: DataPage[]
  hasNextPage?: boolean
  fetchNextPage?: () => void
  isFetchingNextPage?: boolean
  meta?: {
    current_page: number
    total_page: number
    filter_count: number
  }
  aggregate?: {
    countDistinct: string
  }
}

export type PropsSelect<T> = Omit<
  AutocompleteProps<T, boolean, boolean, boolean>,
  'onChange' | 'renderInput' | 'renderTags' | 'options'
> & {
  data?: T[]
  dataFetchService: (params?: FetchParameters) => UseInfiniteQueryResult<GetSelectResponse, Error>
  variant?: 'default' | 'multiple'
  onChange?: (data?: T[] | T) => void
  selected?: T[] | T
  labelKey: string
  valueKey: string
  placeholder?: string
  disabled?: boolean
  error?: string
  readOnly?: boolean
  size?: 'small' | 'medium' | 'large'
  labelId?: string
  setSelected?: any
}
