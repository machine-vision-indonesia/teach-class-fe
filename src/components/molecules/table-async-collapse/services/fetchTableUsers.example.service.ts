import { useQuery } from '@tanstack/react-query'
import client from 'src/client'
import { PREFIX_KEY } from 'src/constant/common'
import { GetTableUsersResponse, PropsTableAsyncCollapsed } from '../types/TableAsyncCollapsed.type'
import { PRIMARY_QUERY_KEY_USERS } from '../constants'

export const fetchTableCollapsed: PropsTableAsyncCollapsed['dataFetchService'] = params => {
  const queryParams = {
    ...params,
    limits: -1,
    fields: [
      'id',
      'name',
      'code',
      'user.id',
      'user.first_name',
      'user.last_name',
      'user.status',
      'user.is_verified',
      'user.sto.id',
      'user.sto.name'
    ].toString(),
    sort: ['id'].toString(),
    filter: {
      _and: [
        {
          code: {
            _eq: params?.filterResult?.resultController?.id ?? undefined
          }
        },
        params?.filter
      ]
    }
  }

  return useQuery({
    queryKey: [PREFIX_KEY.GET, PRIMARY_QUERY_KEY_USERS, queryParams],
    async queryFn() {
      const response = await client.api.get<GetTableUsersResponse>('/items/mt_departments', {
        params: queryParams
      })

      return response.data
    }
  })
}
