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

const PRIMARY_QUERY_KEY = 'CATEGORY'
const URL = '/items/mt_dms_category'

export const fetchCategoryDropdown = (params?: FetchParameters): any => {
  return useInfiniteQuery<GetDropdownCategoryResponse, Error>({
    queryKey: [PREFIX_KEY.GET, PRIMARY_QUERY_KEY, params],
    initialPageParam: 1,
    queryFn: async ({ pageParam = 1 }) => {
      const queryParams = {
        ...params,
        page: pageParam,
        search: params?.search,
        limit: params?.limit || 10, // Set default limit if not provided
        fields: ['id, category_name, code, created_at, updated_at'],
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

  // const paramsToAdd = { ...params }
  // paramsToAdd!.filterResult = undefined

  //   const queryParams = {
  //     fields: ['id, category_name, code, created_at, updated_at']
  //   }

  //   return useQuery({
  //     queryKey: [PREFIX_KEY.GET, 'CATEGORY', queryParams],
  //     async queryFn() {
  //       const response = await client.api.get<GetDropdownCategoryResponse>('/items/mt_dms_category/', {
  //         params: queryParams
  //       })

  //       return response.data
  //     }
  //   })
}
