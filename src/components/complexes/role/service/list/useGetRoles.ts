import { useQuery } from '@tanstack/react-query'
import client from 'src/client'
import { PREFIX_KEY } from 'src/constant/common'

type GetRolesParamsParams = {
  search: string
  prtIds: string[]
  page: number
  limit: number
}

type GetRolesQueryParams = {
  fields: string[]
  sort: string
  limit: number
  filter?: {
    _and: Record<string, any>[]
  }
  deep?: Record<string, any>
  meta: string[]
  page: number
}

type Parent = {
  id: string
  name: string
}

type Role = {
  id: string
  code: string
  name: string
  parent: Parent
  description: string
  count: string
}

type GetRolesMeta = {
  filter_count: number
}

type GetRolesResponse = {
  data: Role[]
  meta: GetRolesMeta
}
type GetCountRolesResponse = {
  data: CountRoles[]
}

type CountRoles = {
  role: string
  count: string
}

type Params = {
  search: string
  prtIds: string[]
  page: number
  limit: number
}

function getRolesParams(params: GetRolesParamsParams) {
  let queryParams: GetRolesQueryParams = {
    fields: ['id', 'code', 'name', 'parent.id', 'parent.name', 'description'],
    sort: 'id',
    meta: ['filter_count'],
    filter: {
      _and: [
        {
          roles: {
            status: {
              _eq: 'published'
            }
          }
        }
      ]
    },
    deep: {
      roles: {
        _filter: {
          status: {
            _eq: 'published'
          }
        }
      }
    },
    page: params.page,
    limit: params.limit
  }

  if (!params.search && !params.prtIds.length) {
    return queryParams
  }

  queryParams = {
    ...queryParams
  }

  if (params.search && queryParams.filter) {
    queryParams.filter._and = [
      ...queryParams.filter._and,
      {
        _or: [
          {
            code: {
              _icontains: params.search
            }
          },
          {
            name: {
              _icontains: params.search
            }
          },
          {
            parent: {
              name: {
                _icontains: params.search
              }
            }
          }
        ]
      }
    ]
  }
  if (params.prtIds.length && queryParams.filter) {
    queryParams.filter._and = [
      ...queryParams.filter._and,
      {
        parent: {
          name: {
            _in: params.prtIds
          }
        }
      }
    ]
  }

  return queryParams
}

export const PRIMARY_QUERY_KEY = 'ROLES'
const URL = '/items/mt_roles'
const URL_PRIVILEGES = '/items/mt_privileges'

export function useGetRoles(params: Params) {
  return useQuery({
    queryKey: [
      PREFIX_KEY.GET,
      PRIMARY_QUERY_KEY,
      getRolesParams({
        search: params.search,
        prtIds: params.prtIds,
        page: params.page,
        limit: params.limit
      })
    ],
    async queryFn() {
      const response = await client.api.get<GetRolesResponse>(URL, {
        params: getRolesParams({
          search: params.search,
          prtIds: params.prtIds,
          page: params.page,
          limit: params.limit
        })
      })
      const roleIds = response.data.data.map(role => role.id)
      const responseCountRoles = await client.api.get<GetCountRolesResponse>(URL_PRIVILEGES, {
        params: {
          fields: ['role'],
          sort: 'role',
          filter: {
            role: {
              _in: roleIds
            }
          },
          aggregate: {
            count: '*'
          },
          groupBy: 'role'
        }
      })

      for (const item1 of response.data.data) {
        for (const item2 of responseCountRoles.data.data) {
          if (item1.id === item2.role) {
            item1.count = item2.count
          }
        }
        item1.count = item1.count != null ? item1.count : '0'
      }

      return response.data
    }
  })
}
