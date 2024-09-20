import { useMutation } from '@tanstack/react-query'
import client from 'src/client'

type Data = {
  id: string
}

export function useDeleteJobFunctions() {
  return useMutation({
    async mutationFn(data: Data) {
      return client.api.patch(`/items/mt_job_functions/${data.id}`, {
        status: 'archived'
      })
    }
  })
}
