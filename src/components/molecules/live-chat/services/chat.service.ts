import client from '@/client'
import { useInfiniteQuery } from '@tanstack/react-query'
import { ChatResponse, IChatProps } from '../types/liveChat.types'

export const fetchInfiniteChat: IChatProps['dataFetchService'] = params => {
  const queryParams = {
    ...params,
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

  const getChat = async (page: number) => {
    const response = await client.api.get<ChatResponse>(`items/mt_live_chats?page=${page}`, {
      params: queryParams
    })

    return response.data
  }

  return useInfiniteQuery({
    queryKey: ['CHAT'],
    queryFn: ({ pageParam }) => getChat(pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.data.length ? allPages.length + 1 : undefined
    }
  })
}
