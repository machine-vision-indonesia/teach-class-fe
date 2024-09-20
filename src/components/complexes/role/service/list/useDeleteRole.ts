import { useMutation } from '@tanstack/react-query'
import client from 'src/client'

type Data = {
  id: string
}

export function useDeleteRole() {
  return useMutation({
    async mutationFn(data: Data) {
      return client.api.delete(`/items/mt_roles/${data.id}`)
    }
  })
}