import { useQuery } from '@tanstack/react-query'
import client from 'src/client'
import { PREFIX_KEY } from 'src/constant/common'

/**
 * @NOTE
 * satu file satu context yang sama misalnya entity yang sama atau context yang sama
 * boleh ada GET,POST,PATCH,DELETE
 */

interface IResponse<T> {
  data: T[]
}

export type IParams = {
  limit?: number
  offset?: number
  page?: number
  fields?: string[]
  sort?: string[]
  meta?: string
  filter?: any
}

interface FetchParametrs extends IParams {
  search?: string
  documentKey?: string
}

/**
 * Response
 */
export interface IDiscussion {
  id: string
  message: string
  send_by: any
  created_at: string
  attachment: Attachment
  document_id: DocumentId
  created_by: string
}

interface Attachment {
  id: string
  storage: string
  filename_disk: string
  filename_download: string
  title: string
  type: string
  folder: any
  uploaded_by: string
  uploaded_on: string
  modified_by: any
  modified_on: string
  charset: any
  filesize: string
  width: number
  height: number
  duration: any
  embed: any
  description: any
  location: any
  tags: any
  metadata: any
}

interface DocumentId {
  id: string
  code: string
  name: string
}

export interface ChatBoxMessage {
  id?: string
  sender: string
  message: string
  createdAt: Date

  // attachment?: ChatBoxAttachment
  isSameUserAsPrevious?: boolean
}

/**
 * @NOTE hanya boleh ada satu PRIMARY_QUERY_KEY di dalam file, jika berbeda silahkan buat file baru.
 * agar codenya lebih terstruktur dan lebih mudah di baca
 */
const PRIMARY_QUERY_KEY = 'CHAT_DICUSSION_HISTORY'

/**
 *
 * @method GET
 * @param params
 * @returns response
 */
export const GetChatDisussionHistoryExample = <T>(params: FetchParametrs = {}) => {
  const requestOption: any = { retry: false }
  const queryParam: any = {
    ...params,
    fields: [
      'id',
      'message',
      'send_by',
      'attachment.*',
      'document_id.id',
      'document_id.code',
      'document_id.name',
      'created_at',
      'created_by'
    ],
    'filter[_and][0][document_id][_eq]': params.documentKey,
    sort: 'created_at'
  }

  const queryParamHistory: any = {
    ...params,
    fields: [
      'id',
      'document_id.id',
      'document_id.code',
      'document_id.name',
      'date_created',
      'user_created',
      'document_status_id.name'
    ],
    'filter[_and][0][document_id][_eq]': params.documentKey,
    sort: ['date_created']
  }

  const keys = [PREFIX_KEY.GET, PRIMARY_QUERY_KEY, queryParam]

  const fetch = async (params: IParams): Promise<IResponse<ChatBoxMessage>> => {
    const rawData = await client.api.get<IResponse<IDiscussion>>('/items/discussion', {
      params
    })

    const documentHistory = await client.api.get<IResponse<any>>('/items/document_history', {
      params: queryParamHistory
    })

    const chatBoxMessages: ChatBoxMessage[] = rawData.data.data.map(item => ({
      id: item.id,
      sender: item.created_by,
      message: item.message,
      createdAt: new Date(item.created_at),
      attachment: item.attachment,
      status: null
    }))

    const chatBoxMessagesHistory = documentHistory.data.data.map(item => ({
      id: item.id,
      sender: item.user_created,
      message: '',
      createdAt: new Date(item.date_created),
      attachment: null,
      status: item.document_status_id.name
    }))

    const mergedArray = chatBoxMessages
      .concat(chatBoxMessagesHistory)
      .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime())

    const data = { data: mergedArray }

    return data
  }

  if (params.page) {
    requestOption.keepPreviousData = true
  }

  return useQuery<IResponse<T>, Error>({
    queryKey: keys,
    queryFn: () => fetch(queryParam),
    ...requestOption
  })
}
