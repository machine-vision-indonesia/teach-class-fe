import { useQuery } from '@tanstack/react-query'
import client from 'src/client'
import { PREFIX_KEY } from 'src/constant/common'

type DepartmentLevel = {
  id: string
  name: string
}

type GetDepartmentLevelsResponse = {
  data: DepartmentLevel[]
}

type Params = {
  search: string
}

export function useGetDepartmentLevels(params: Params) {
  function getQueryParams(params: Params) {
    const queryParams = {
      fields: ['id', 'name'],
      sort: ['name', 'id'],
      limit: 10,
      filter: {
        status: {
          _eq: 'published'
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

  const key = [PREFIX_KEY.GET, 'DEPARTMENT_LEVELS', getQueryParams({ search: params.search })]

  return useQuery({
    queryKey: key,
    async queryFn() {
      const response = await client.api.get<GetDepartmentLevelsResponse>('/items/mt_department_levels', {
        params: getQueryParams({ search: params.search })
      })

      return response.data
    }
  })
}
