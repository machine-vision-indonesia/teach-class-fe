import { type IParams } from '@/types/master/filter'
import { ReactNode } from 'react'
import { type UseQueryResult } from '@tanstack/react-query'
export interface FetchParameters extends IParams {
  search?: string
}

export type PropsComment = {
  limit?: number
  title?: string
  rightHeaderContent?: ReactNode
  isStripped?: boolean
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
}
export interface IComment {
  id: string
  comment: string
  date_created: Date | string
  user_created: {
    first_name?: string
    last_name?: string
    job_title?: string
    avatar?: {
      id?: string
    }
  }
  reply_to_id?: string | null
  issue_comment?: IssueComment[]
}

export interface IPayloadComment {
  status?: 'published'
  comment: string
  reply_to_id?: string
}

export type SortOrder = 'asc' | 'desc'

export type UserCreated = {
  first_name: string
  last_name: string
  job_title: string
  avatar: { id: string }
}

export type IssueComment = {
  id: string
  comment: string
  date_created: string
  user_created: UserCreated
  reply_to_id: string | null
}

export type ProcessedComment = Omit<IssueComment, 'reply_to_id'> & {
  reply_to_id?: ProcessedComment | null
  issue_comment?: ProcessedComment[]
}
