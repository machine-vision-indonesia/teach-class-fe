import { convertToFilterObject } from '@/components/molecules/table-async-v2/utils/TableAsyncV2.utils'
import { PropsTableListAsync } from '@/components/molecules/table-list-async/types/TableListAsync.type'
import { useQuery } from '@tanstack/react-query'
import client from 'src/client'
import { PREFIX_KEY } from 'src/constant/common'

export type MDCategoryChecklist = {
  id: string
  code: string
  name: string
  description?: string
  is_active: boolean
  status?: string
  created_at?: string
  updated_at?: string
}

type GetTableMDCategoryChecklistResponse = {
  data: MDCategoryChecklist[]
}

const PRIMARY_QUERY_KEY = 'MD VEHICLE'
const URL = '/items/mt_vehicle'

export const GetTablePageVehicle: PropsTableListAsync['dataFetchService'] = params => {
  const queryParams = {
    ...params,
    fields: ['id', 'code', 'vehicle_name', 'description', 'is_active', 'status'],
    filter: {},
    sort: ['-created_at']
  }

  if (params?.filterResult?.resultController) {
    const filters = params.filterResult.resultController
    queryParams.filter = {
      _and: [
        {
          vehicle_name: {
            _icontains: filters?.name
          }
        },
        {
          is_active: {
            _eq: filters?.is_active
          }
        }
      ]
    }
  }

  return useQuery({
    queryKey: [PREFIX_KEY.GET, PRIMARY_QUERY_KEY, queryParams],
    async queryFn() {
      const response = await client.api.get<GetTableMDCategoryChecklistResponse>(URL, {
        params: queryParams
      })

      return response.data
    }
  })
}
