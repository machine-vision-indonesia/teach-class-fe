/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import client from 'src/client'

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

  attachment?: string //ChatBoxAttachment
  isSameUserAsPrevious?: boolean
}

/**
 *
 * @Realtime
 * @param params
 * @returns response
 */
export const GetRealtimeMessage = (params: FetchParametrs = {}) => {
  const [realTimeMessages, setRealTimeMessages] = useState<ChatBoxMessage>()

  /**
   * query param in case in another project table chat is diferent
   */
  const query: any = {
    fields: ['*', 'attachment.*'],
    filter: {
      document_id: params.documentKey,
      status: {
        _eq: 'published'
      }
    }
  }

  /**
   * nama table of chat
   */
  const collection = 'discussion'

  const { lastJsonCreateMessage, unsubscribe } = client.useSocketChat({ query, collection })

  useEffect(() => {
    if (lastJsonCreateMessage) {
      setRealTimeMessages({
        id: lastJsonCreateMessage.id,
        sender: lastJsonCreateMessage.created_by,
        message: lastJsonCreateMessage.message,
        createdAt: new Date(lastJsonCreateMessage.created_at),
        attachment: lastJsonCreateMessage.attachment,
        isSameUserAsPrevious: false
      })
    }

    return () => {
      unsubscribe()
    }
  }, [lastJsonCreateMessage])

  return { realTimeMessages }
}
