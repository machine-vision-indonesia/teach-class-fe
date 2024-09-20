import { useQuery } from '@tanstack/react-query'
import client from 'src/client'
import { type PropsTable } from 'src/components/molecules/table-async/TableAsync.type'
import { PREFIX_KEY } from 'src/constant/common'

type Parent = {
  id: string
  name: string
}

type Role = {
  id: string
  code: string
  name: string
  description: string
  parent?: Parent
  count: string
}

type Meta = {
  filter_count: number
}

export type GetTableRolesResponse = {
  meta: Meta
  data: Role[]
}

type CountRoles = {
  role: string
  count: string
}

type GetCountRolesResponse = {
  data: CountRoles[]
}

export const PRIMARY_QUERY_KEY = 'ROLES'
const URL = '/items/mt_roles'
const URL_PRIVILEGES = '/items/mt_privileges'

export const GetTableRoles: PropsTable['dataFetchService'] = params => {
  const queryParams = {
    ...params,
    fields: ['id', 'code', 'name', 'parent.id', 'parent.name', 'description'].toString(),
    filter: {
      _and: [
        {
          roles: {
            status: {
              _eq: 'published'
            }
          }
        },
        params?.filter
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
    }
  }

  return useQuery({
    queryKey: [PREFIX_KEY.GET, PRIMARY_QUERY_KEY, queryParams],
    async queryFn() {
      const response = await client.api.get<GetTableRolesResponse>(URL, {
        params: queryParams
      })

      const roleIds = response.data.data.map(role => role.id)
      const responseCountRoles = await client.api.get<GetCountRolesResponse>(URL_PRIVILEGES, {
        params: {
          fields: ['role'],
          sort: 'role',
          filter: {
            role: {
              _in: roleIds
            },
            status: {
              _eq: 'published'
            },
            "user":{
              "status":{
                "_eq" :'active'
              }
            }

          },
          aggregate: {
            count: '*'
          },
          groupBy: 'role',
          deep: {
            user: {
              _filter: {
                status: {
                  _eq: 'active'

                }
              }
            }
          }
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
