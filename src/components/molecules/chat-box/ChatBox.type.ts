import { UseQueryResult } from '@tanstack/react-query'
import { IParams } from 'src/types/master/filter'

interface IFetchParametrs extends IParams {
  documentKey?: string
  userId?: string
}
export interface ChatBoxProps {
  chatBoxTitle?: string
  onSendMessage?: () => void
  readOnly?: boolean
  documentKey?: string
  filter?: any
  dataFetchService: (params: IFetchParametrs) => UseQueryResult<{ data: any[] }>
  actionSaveService?: (body: any) => UseQueryResult<any>
  realtimeMessageService: (params: IFetchParametrs) => { realTimeMessages: ChatBoxMessageData }
}

export interface ChatBoxMessageData {
  id?: string
  sender: string
  message: string
  createdAt: Date
  attachment?: ChatBoxAttachment
  isSameUserAsPrevious?: boolean
  status?: string
  remark?: string
}

export interface ChatBoxMessage extends ChatBoxMessageData {
  userId: string
}

export interface ChatBoxAttachment {
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
