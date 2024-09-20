import client from '@/client'
import { IChatPost } from '../types/liveChat.types'
import { env } from 'next-runtime-env'

export const actionChat = async (data: Omit<IChatPost, 'status'>) => {
  client.api.post('items/mt_live_chats', data)
}

export const uploadChatFile = (input: { file: any; fileName: string }, uploadProgress: (e: number) => void) => {
  const uploadData = new FormData()
  uploadData.append('files', input.file, input.fileName)

  return client.api.post('files', uploadData, {
    onUploadProgress: e => {
      const progressCompleted = Math.round((e.loaded * 100) / e.total!)
      uploadProgress(progressCompleted)
    }
  })
}

export const downloadChatFile = (id: string, token: string) => {
  const BASE_URL: string | undefined = env('NEXT_PUBLIC_REST_API_URL')

  return `${BASE_URL}/assets/${id}?download=&access_token=${token}`
}
