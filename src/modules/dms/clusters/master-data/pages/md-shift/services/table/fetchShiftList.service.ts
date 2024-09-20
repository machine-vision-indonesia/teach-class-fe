import { PropsTableListAsync } from '@/components/molecules/table-list-async/types/TableListAsync.type'
import { useQuery } from '@tanstack/react-query'
import client from 'src/client'
import { PREFIX_KEY } from 'src/constant/common'

export type MDShift = {
  id: string
  code: string
  name: string
  start: string
  end: string
  description?: string
  is_active: boolean
  status: string
  created_at?: string
  updated_at?: string
}

type GetTableMDShiftResponse = {
  data: MDShift[]
}

export const PRIMARY_QUERY_KEY = 'MD SHIFT'
const URL = '/items/mt_shift'

export const GetTableMDShift: PropsTableListAsync['dataFetchService'] = params => {
  const queryParams = {
    ...params,
    fields: [
      'id',
      'code',
      'name',
      'start',
      'end',
      'description',
      'is_active',
      'status',
      'created_at',
      'updated_at',
      'is_overtime'
    ],
    filter: {},
    sort: ['-created_at']
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
      const response = await client.api.get<GetTableMDShiftResponse>(URL, {
        params: queryParams
      })

      return response.data
    }
  })
}
