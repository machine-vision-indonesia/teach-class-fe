import { type UseQueryOptions, useQuery } from '@tanstack/react-query'
import client from 'src/client'
import { PREFIX_KEY } from 'src/constant/common'

type Params = Pick<UseQueryOptions, 'enabled'> & {
  id: string | null
}

const PRIMARY_QUERY_KEY = 'ASSETS'
const URL = '/assets'

export function useGetAsset(params: Params) {
  const key = [PREFIX_KEY.GET, PRIMARY_QUERY_KEY, 'detail', params.id]

  return useQuery({
    queryKey: key,
    async queryFn() {
      if (!params.id) {
        throw new Error('Invalid asset ID')
      }

      const response = await client.api.get(`${URL}/${params.id}`, {
        responseType: 'blob'
      })

      return new Promise<string>(callback => {
        const reader = new FileReader()
        reader.onload = function () {
          callback(String(reader.result))
        }
        reader.readAsDataURL(response.data)
      })
    },
    enabled: Boolean(params.id)
  })
}
