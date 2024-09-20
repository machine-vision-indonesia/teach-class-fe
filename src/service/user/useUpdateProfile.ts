import { useMutation } from '@tanstack/react-query'
import client from 'src/client'

type Data = {
  id: string
  address: string | null
  phone: string | null
  post_code: string | null
}

export function useUpdateProfile() {
  return useMutation({
    async mutationFn({ id, ...data }: Data) {
      return client.api.patch(`/items/profiles/${id}`, data)
    }
  })
}
