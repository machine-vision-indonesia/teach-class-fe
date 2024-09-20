import { useMutation } from '@tanstack/react-query'
import { actionChat, uploadChatFile } from '../services/actionChat.service'
import { queryClient } from '@/pages/_app'
import { IChatPost } from '../types/liveChat.types'

export const useUploadFileChat = (setOnProgress: (e: number) => void) => {
  return useMutation({
    mutationFn: (input: { file: any; fileName: string }) => uploadChatFile(input, setOnProgress),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['CHAT'] })
    }
  })
}

export const usePostChat = () => {
  return useMutation({
    mutationFn: (addChat: Omit<IChatPost, 'status'>) => actionChat(addChat),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['CHAT'] })
    }
  })
}
