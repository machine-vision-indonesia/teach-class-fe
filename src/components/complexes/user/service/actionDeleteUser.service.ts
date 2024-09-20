import client from "@/client"
import { useMutation } from "@tanstack/react-query"

export function useDeleteUser() {
  return useMutation({
    async mutationFn(data: {
      id: string
    }) {
      return client.api.patch(`/users/${data.id}`, {
        status: 'archived'
      })
    }
  })
}
