import { useQuery } from '@tanstack/react-query'
import client from 'src/client'
import { PREFIX_KEY } from 'src/constant/common'
import { type UserStatus } from 'src/types/directus/general'
import avatar from '../../../../../@core/components/mui/avatar'

type GetUsersParamsParams = {
  search: string
  stoIds: string[]
  roleId: string
  page: number
  limit: number
}

type GetUsersQueryParams = {
  fields: string[]
  limit: number
  sort: string
  filter?: {
    _and: Record<string, any>[]
  }
  deep?: Record<string, any>
  meta: string[]
  page: number
}

type Profile = {
  id: string
  id_number: string
  full_name: string
  photo: string
  avatar: string
}

type Role = {
  id: string
  name: string
}

type Privilege = {
  id: string
  role: Role
}


type Sto = {
  id: string
  name: string
}

type Werk = {
  name: string
}

type User = {
  id: string
  status: UserStatus
  is_verified: boolean
  profile: Profile | null
  sto?: Sto
  werk?: Werk
  privileges: Privilege[]
}

type GetUsersMeta = {
  filter_count: number
}

type GetUsersResponse = {
  data: User[]
  meta: GetUsersMeta
}

type Params = {
  search: string
  stoIds: string[]
  roleId: string
  page: number
  limit: number
}

function getUsersParams(params: GetUsersParamsParams) {
  let queryParams: GetUsersQueryParams = {
    fields: [
      'id',
      'profile.id',
      'profile.id_number',
      'profile.full_name',
      'profile.photo',
      'sto.id',
      'werk.name',
      'sto.name',
      'status',
      'is_verified',
      'privileges.id',
      'privileges.role.id',
      'privileges.role.name'
    ],
    sort: 'id',
    meta: ['filter_count'],
    page: params.page,
    limit: params.limit,
    filter: {
      _and: [
        {
          status: {
            _eq: 'active'
          }
        }
      ]
    },
    deep: {}
  }

  if (!params.search && !params.stoIds.length && !params.roleId) {
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
            profile: {
              id_number: {
                _icontains: params.search
              }
            }
          },
          {
            profile: {
              full_name: {
                _icontains: params.search
              }
            }
          },
          {
            sto: {
              department: {
                name: {
                  _icontains: params.search
                }
              }
            }
          }
        ]
      }
    ]
  }

  if (params.stoIds.length && queryParams.filter) {
    queryParams.filter._and = [
      ...queryParams.filter._and,
      {
        sto: {
          department: {
            id: {
              _in: params.stoIds
            }
          }
        }
      }
    ]
  }

  if (params.roleId && queryParams.filter) {
    queryParams.filter._and = [
      ...queryParams.filter._and,
      {
        privileges: {
          role: {
            id: {
              _eq: params.roleId
            }
          }
        }
      }
    ]
  }

  return queryParams
}

export const PRIMARY_QUERY_KEY = 'USERS'
const URL = '/users'
const URL_AVATAR = '/assets'

export function useGetRoleUsers(params: Params) {
  return useQuery({
    queryKey: [
      PREFIX_KEY.GET,
      PRIMARY_QUERY_KEY,
      getUsersParams({
        search: params.search,
        stoIds: params.stoIds,
        roleId: params.roleId,
        page: params.page,
        limit: params.limit
      })
    ],
    async queryFn() {
      const response = await client.api.get<GetUsersResponse>(URL, {
        params: getUsersParams({
          search: params.search,
          stoIds: params.stoIds,
          roleId: params.roleId,
          page: params.page,
          limit: params.limit
        })
      })
      console.log('params.roleId : ', params.roleId)

      for (const item1 of response.data.data) {
        item1.privileges = item1.privileges.filter(privileges => privileges.role.id === params.roleId)

        if (item1.profile?.photo != null) {
          const responseAvatar = await client.api.get(`${URL_AVATAR}/${item1.profile?.photo}`, {
            responseType: 'blob'
          })

          item1.profile.avatar = await new Promise<string>(callback => {
            const reader = new FileReader()
            reader.onload = function () {
              callback(String(reader.result))
            }
            reader.readAsDataURL(responseAvatar.data)
          })
        }
      }

      return response.data
    }
  })
}
