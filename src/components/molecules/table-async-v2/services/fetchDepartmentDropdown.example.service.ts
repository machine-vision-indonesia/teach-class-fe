import { useInfiniteQuery } from '@tanstack/react-query'
import client from 'src/client'
import { FetchParameters } from '../../select-async'

type Department = {
  id: number
  name: string
}

type GetDropdownDepartmentsResponse = {
  data: Department[]
}

export const fetchDepartments = (params?: FetchParameters): any => {
  return useInfiniteQuery<GetDropdownDepartmentsResponse, Error>({
    queryKey: ['fetchDepartments', params],
    initialPageParam: 1,
    queryFn: async ({ pageParam = 1 }) => {
      const queryParams = {
        ...params,
        page: pageParam,
        search: params?.search,
        limit: params?.limit || 10, // Set default limit if not provided
        fields: ['id', 'name'],
        meta: ['total_count', 'filter_count', 'current_page', 'total_page']
      }

      const response = await client.api.get<GetDropdownDepartmentsResponse>('/items/mt_departments', {
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
