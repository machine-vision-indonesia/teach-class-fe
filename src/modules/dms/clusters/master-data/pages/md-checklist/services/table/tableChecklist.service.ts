import { convertToFilterObject } from '@/components/molecules/table-async-v2/utils/TableAsyncV2.utils'
import { PropsTableListAsync } from '@/components/molecules/table-list-async/types/TableListAsync.type'
import { useQuery } from '@tanstack/react-query'
import client from 'src/client'
import { PREFIX_KEY } from 'src/constant/common'

export type MDChecklist = {
  id: string
  code: string
  name: string
  description?: string
  is_active: boolean
  status?: string
  created_at?: string
  updated_at?: string
}

type GetTableMDChecklistResponse = {
  data: MDChecklist[]
}

const PRIMARY_QUERY_KEY = 'MD CHECKLIST'
const URL = '/items/mt_checksheet'

export const GetTableMDChecklist: PropsTableListAsync['dataFetchService'] = params => {
  const queryParams = {
    ...params,
    fields: [
      '*',
      'category_checksheet_id.*',
      'production_checksheet_lists.*',
      'production_checksheet_lists.checksheet_item_id.*'
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
      const response = await client.api.get<GetTableMDChecklistResponse>(URL, {
        params: queryParams
      })

      return response.data
    }
  })
}
