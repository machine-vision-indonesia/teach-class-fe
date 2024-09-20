import { type UseQueryOptions, useQuery } from '@tanstack/react-query'
import client from 'src/client'
import { PREFIX_KEY } from 'src/constant/common'

type DepartmentDropdown = {
  id: string
  name: string
}

type GetDepartmentsResponse = {
  data: DepartmentDropdown[]
}

type GetDepartmentsParamsParams = {
  excludedId: string
  search: string
}

type Params = Pick<UseQueryOptions, 'enabled'> & {
  excludedId: string
  search: string
}

const PRIMARY_QUERY_KEY = 'DEPARTMENTS'
const URL = '/items/mt_departments'

function getDepartmentsParams(params: GetDepartmentsParamsParams) {
  const queryParams = {
    fields: ['id', 'name'],
    limit: 10,
    sort: ['name', 'id'],
    filter: {
      status: {
        _eq: 'published'
      },
      id: {
        _neq: params.excludedId
      }
    }
  }

  if (params.search) {
    Object.assign(queryParams.filter, {
      name: {
        _icontains: params.search
      }
    })
  }

  return queryParams
}

export function useGetDepartments(params: Params) {
  const queryParams = getDepartmentsParams({ search: params.search, excludedId: params.excludedId })
  const key = [PREFIX_KEY.GET, PRIMARY_QUERY_KEY, queryParams]

  return useQuery({
    queryKey: key,
    async queryFn() {
      const response = await client.api.get<GetDepartmentsResponse>(URL, {
        params: queryParams
      })

      return response.data.data.map(department => ({
        id: department.id,
        label: department.name
      }))
    },
    enabled: params.enabled
  })
}
