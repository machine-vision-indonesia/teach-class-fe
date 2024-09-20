import { PropsTableListAsync } from '@/components/molecules/table-list-async/types/TableListAsync.type'
import { useQuery } from '@tanstack/react-query'
import client from 'src/client'
import { PREFIX_KEY } from 'src/constant/common'

type Category = {
  id: string
  category_name: string
}

export type MDStatus = {
  id: string
  name: string
  description?: string
  color?: string
  status?: string
  created_at?: string
  updated_at?: string
  category_id: Category
}

type GetTableMDStatusResponse = {
  data: MDStatus[]
}

const PRIMARY_QUERY_KEY = 'MD STATUS'
const URL = '/items/mt_dms_status'

export const GetTableMDStatus: PropsTableListAsync['dataFetchService'] = params => {
  const queryParams = {
    ...params,
    fields: ['id, name, category_id.id, category_id.category_name, description, color, status, created_at, updated_at'],
    filter: {}
  }

  if (params?.filterResult?.resultController) {
    const filters = params.filterResult.resultController
    queryParams.filter = {
      _and: [
        {
          name: {
            _icontains: filters?.name
          }
        },
        {
          category_id: {
            id: {
              _eq: filters?.['category_id']
            }
          }
        }
      ]
    }
  }

  return useQuery({
    queryKey: [PREFIX_KEY.GET, PRIMARY_QUERY_KEY, queryParams],
    async queryFn() {
      const response = await client.api.get<GetTableMDStatusResponse>(URL, {
        params: queryParams
      })

      return response.data
    }
  })
}
