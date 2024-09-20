import { useQuery } from '@tanstack/react-query'
import client from 'src/client'
import { type DropdownMultipleFilter } from 'src/components/molecules/table-async/TableAsync.type'
import { PREFIX_KEY } from 'src/constant/common'

export const PRIMARY_QUERY_KEY = 'ROLES'
const URL = '/items/mt_roles'

export const GetDropdownRoles: DropdownMultipleFilter['dataFetchService'] = () => {
  const queryParams = {
    fields: ['id', 'name'],
    sort: ['name', 'id'],
    limit: -1,
    filter: {
      status: {
        _eq: 'published'
      }
    }
  }

  return useQuery({
    queryKey: [PREFIX_KEY.GET, PRIMARY_QUERY_KEY, queryParams],
    async queryFn() {
      const response = await client.api.get(URL, {
        params: queryParams
      })

      return response.data
    }
  })
}
