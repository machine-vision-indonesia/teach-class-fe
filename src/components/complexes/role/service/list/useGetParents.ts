import { useQuery } from '@tanstack/react-query'
import client from 'src/client'
import { PREFIX_KEY } from 'src/constant/common'

type ParentsDropdown = {
  id: string
  name: string
}

type GetParentsResponse = {
  data: ParentsDropdown[]
}

const PRIMARY_QUERY_KEY = 'ROLES'
const URL = '/items/mt_roles'

const queryParams = {
  fields: ['id', 'name'],
  sort: ['name', 'id'],
  limit: -1
}

export function useGetParents() {
  const key = [PREFIX_KEY.GET, PRIMARY_QUERY_KEY, queryParams]

  return useQuery({
    queryKey: key,
    async queryFn() {
      const response = await client.api.get<GetParentsResponse>(URL, {
        params: queryParams
      })

      return response.data.data.map(role => ({
        id: role.id,
        name: role.name
      }))
    }
  })
}
