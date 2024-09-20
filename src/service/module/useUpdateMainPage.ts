import { useMutation } from '@tanstack/react-query'
import client from 'src/client'

type Data = {
  productIds: string[]
  pageId: string | null
}

export function useUpdateMainPages() {
  return useMutation({
    async mutationFn(data: Data) {
      return client.api.patch('/items/mt_products/', {
        keys: data.productIds,
        data: {
          main_page: data.pageId
        }
      })
    }
  })
}
