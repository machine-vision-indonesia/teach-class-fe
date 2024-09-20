import { IChat } from '../types/liveChat.types'

import client from '@/client'

const queryParams = {
  fields: [
    '*',
    'user_created.first_name',
    'user_created.last_name',
    'user_created.email',
    'user_created.id',
    'user_created.avatar.id',
    'attachments.directus_files_id.id',
    'attachments.directus_files_id.title',
    'attachments.directus_files_id.filesize',
    'attachments.directus_files_id.type'
  ],
  sort: ['-date_created'],
  limit: 10
}

export const useGetRealitmeChat = () => {
  const websocket = client.useWebSocketClient<IChat>('mt_live_chats', queryParams)

  const response = websocket.data

  const unsubscribe = () => websocket.unsubscribe()
  const subscribe = () => websocket.subscribe()

  return {
    response,
    subscribe,
    unsubscribe
  }
}
