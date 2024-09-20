import { useQuery, UseQueryOptions } from '@tanstack/react-query'
import client from 'src/client'
import { PREFIX_KEY } from 'src/constant/common'

const PRIMARY_QUERY_KEY = 'DETAIL STATUS'
const URL = '/items/mt_dms_status'

type Category = {
  id: string
  category_name: string
}

export type MDStatus = {
  id: string
  name: string
  description?: string
  color: string
  status?: string
  created_at?: string
  updated_at?: string
  category_id: Category
}

type GetDetailMDStatusResponse = {
  data: MDStatus
}

type fetchParameters = Pick<UseQueryOptions, 'enabled'> & {
  id: string | null
}

export function useGetMDStatusById(params: fetchParameters) {
  const queryParams = {
    fields: ['id, name, category_id.id, category_id.category_name, description, color, status, created_at, updated_at'],
    filter: {}
  }

  if (params.id) {
    queryParams.filter = {
      id: {
        eq: params.id
      }
    }
  }

  const key = [PREFIX_KEY.GET, PRIMARY_QUERY_KEY, params.id, queryParams]

  return useQuery({
    queryKey: key,
    async queryFn() {
      const response = await client.api.get<GetDetailMDStatusResponse>(`${URL}/${params.id}`, {
        params: {
          ...queryParams,
          enabled: params.enabled
        }
      })

      return response.data
    }
  })
}
