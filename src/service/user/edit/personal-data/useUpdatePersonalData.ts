import { useMutation } from '@tanstack/react-query'
import client from 'src/client'

type Data = {
  id: string
  id_number: string
  first_name: string
  last_name: string
  gender: string
  religion: string
}

export function useUpdatePersonalData() {
  return useMutation({
    async mutationFn({ id, ...data }: Data) {
      return client.api.patch(`/items/profiles/${id}`, data)
    }
  })
}
