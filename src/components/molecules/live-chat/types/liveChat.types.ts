import { IParams } from '@/types/master/filter'
import { UseInfiniteQueryResult, UseMutationResult, UseQueryResult } from '@tanstack/react-query'

export interface IChatProps {
  dataFetchService: (params?: IParams) => UseInfiniteQueryResult<{
    data: any[]
    pages: any[]
    meta?: { filter_count: number }
    aggregate?: { countDistinct: string }
  }>

  realtimeChatService: {
    response: IChat[]
    subscribe: () => void
    unsubscribe: () => void
  }
  //** <ResponseType, Error, Parameter Variable Types>
  chatMutation: UseMutationResult<any, Error, any>

  //** <ResponseType, Error, Parameter Variable Types>
  uploadFileMutation: UseMutationResult<any, Error, any>
  progress?: number
}

export interface IAttachments {
  create: any[]
}

export interface IChat {
  id: string
  status: string
  date_created: string
  user_created: {
    first_name: string
    last_name: string
    email: string
    id: string
    avatar: {
      id: string
    }
  }
  message: string
  send_by: string
  attachments: any[]
}

export interface IFetchService {
  dataFetchService: (params?: IParams) => UseQueryResult<{
    data: any[]
    meta?: { filter_count: number }
    aggregate?: { countDistinct: string }
  }>
}

export interface ChatResponse {
  data: [IChat]
}

export interface IChatPost {
  status: string
  message: string
  send_by?: string
  attachments?: IAttachments
}

export type IInputType = {
  message: string
  attachments: any[]
}
