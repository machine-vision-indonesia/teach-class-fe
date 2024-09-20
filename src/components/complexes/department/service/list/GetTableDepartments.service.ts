import { useQuery } from '@tanstack/react-query'
import client from 'src/client'
import { type PropsTable } from 'src/components/molecules/table-async/TableAsync.type'
import { PREFIX_KEY } from 'src/constant/common'

type Parent = {
  name: string
}

type Department = {
  id: string
  code: string
  name: string
  parent?: Parent
}

type Meta = {
  filter_count: number
}

export type GetTableDepartmentsResponse = {
  meta: Meta
  data: Department[]
}

export const PRIMARY_QUERY_KEY = 'DEPARTMENTS'
const URL = '/items/mt_departments'

export const GetTableDepartments: PropsTable['dataFetchService'] = params => {
  const queryParams = {
    ...params,
    fields: ['id', 'code', 'name', 'parent.name'].toString(),
    filter: {
      _and: [
        {
          status: {
            _eq: 'published'
          }
        },
        params?.filter
      ]
    },
    deep: {
      parent: {
        _filter: {
          status: {
            _eq: 'published'
          }
        }
      }
    }
  }

  return useQuery({
    queryKey: [PREFIX_KEY.GET, PRIMARY_QUERY_KEY, queryParams],
    async queryFn() {
      const response = await client.api.get<GetTableDepartmentsResponse>(URL, {
        params: queryParams
      })

      return response.data
    }
  })
}
