import { useInfiniteQuery } from '@tanstack/react-query'
import client from 'src/client'
import { GetSelectResponse, FetchParameters } from '../types/Select.type'

export const fetchListData = (params?: FetchParameters): any => {
  return useInfiniteQuery<GetSelectResponse, Error>({
    queryKey: ['CALENDAR', params],
    initialPageParam: 1,
    queryFn: async ({ pageParam = 1 }) => {
      const queryParams = {
        ...params,
        page: pageParam,
        search: params?.search || undefined,
        limit: params?.limit || 10, // Set default limit if not provided
        fields: ['id', 'title'],
        meta: ['total_count', 'filter_count', 'current_page', 'limit', 'total_page']
      }

      const response = await client.api.get<GetSelectResponse>('/items/test_calendars', {
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
