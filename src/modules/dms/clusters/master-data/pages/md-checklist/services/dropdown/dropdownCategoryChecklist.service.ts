import { FetchParameters } from '@/components/molecules/select-async'
import { PREFIX_KEY } from '@/constant/common'
import { useInfiniteQuery } from '@tanstack/react-query'
import client from 'src/client'

type Category = {
  id: number
  name: string
}

type GetDropdownCategoryResponse = {
  data: Category[]
}

const PRIMARY_QUERY_KEY = 'DDL CATEGORY CHECKLIST'
const URL = '/items/mt_category_checksheet'

export const GetDDLMDCategoryChecklist = (params?: FetchParameters): any => {
  return useInfiniteQuery<GetDropdownCategoryResponse, Error>({
    queryKey: [PREFIX_KEY.GET, PRIMARY_QUERY_KEY, params],
    initialPageParam: 1,
    queryFn: async ({ pageParam = 1 }) => {
      const queryParams = {
        ...params,
        page: pageParam,
        search: params?.search,
        limit: params?.limit || 10,
        fields: ['id, name, code, is_active'],
        meta: ['total_count', 'filter_count', 'current_page', 'total_page']
      }

      const response = await client.api.get<GetDropdownCategoryResponse>(URL, {
        params: queryParams
      })

      return response.data
    },
    getNextPageParam: lastPage => {
      const nextPage = (lastPage.meta?.current_page ?? 1) + 1
      return nextPage <= (lastPage.meta?.total_page ?? 1) ? nextPage : undefined
    }
  })
}
