import { useInfiniteQuery, useQuery } from "@tanstack/react-query"
import { PRIMARY_QUERY_KEY_DEPARTMENTS, PRIMARY_QUERY_KEY_USERS } from "../constants/ManageUserPage.constants"
import { DropdownMultipleFilter, GetDepartmentsParamsParams, GetDepartmentsResponse, GetDropdownDepartmentsResponse, GetJobFunctionsResponse, GetTableUsersResponse, GetWorkCentersResponse, Params, PropsTable } from "../types/ManageUserPage.types"
import { PREFIX_KEY } from "@/constant/common"
import client from "@/client"
import { FetchParameters, GetSelectResponse } from "@/components/molecules/select-async"

const URL_DEPARTMENT = '/items/mt_departments'
const URL_USERS = '/users'
const rolesQueryParams = {
  fields: ['id', 'name'],
  limit: -1,
  sort: 'name',
  filter: {
    status: {
      _eq: 'published'
    }
  }
}

function getDepartmentsParams(params: GetDepartmentsParamsParams) {
  const queryParams = {
    fields: ['id', 'name'],
    limit: 10,
    sort: ['name', 'id'],
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

export function useGetDepartments(params: Params) {
  const queryParams = getDepartmentsParams({ search: params.search as string })
  const key = [PREFIX_KEY.GET, PRIMARY_QUERY_KEY_DEPARTMENTS, queryParams]

  return useQuery({
    queryKey: key,
    async queryFn() {
      const response = await client.api.get<GetDepartmentsResponse>(URL_DEPARTMENT, {
        params: queryParams
      })

      return response.data.data.map(department => ({
        id: department.id,
        label: department.name
      }))
    }
  })
}

export const GetTableUsers: PropsTable['dataFetchService'] = params => {
  const queryParams = {
    ...params,
    fields: [
      'id',
      'email',
      'profile.id_number',
      'profile.full_name',
      'werk.name',
      'sto.name',
      'is_verified'
    ].toString(),
    sort: ['profile.id_number', 'id'].toString(),
    filter: {
      _and: [
        params?.filter,
        {
          _and: [
            {
              sto: {
                _in: params?.filterResult?.resultController?.['sto.name']?.[0]?.id ?? undefined
              }
            }
          ]
        },
        {
          _or: [
            {
              profile: {
                full_name: {
                  _icontains: params?.filterResult?.resultController?.['profile.full_name']
                }
              }
            }
          ]
        }
      ],
    },
    deep: {
      profile: {
        _filter: {
          status: {
            _eq: 'published'
          }
        }
      },
      werk: {
        _filter: {
          status: {
            _eq: 'published'
          }
        }
      },
      sto: {
        _filter: {
          status: {
            _eq: 'published'
          }
        }
      }
    }
  };

  return useQuery({
    queryKey: [PREFIX_KEY.GET, PRIMARY_QUERY_KEY_USERS, queryParams],
    async queryFn() {
      const response = await client.api.get<GetTableUsersResponse>(URL_USERS, {
        params: queryParams
      })

      return response.data
    }
  })
}

export const GetDropdownDepartments: DropdownMultipleFilter['dataFetchService'] = () => {
  const queryParams = {
    fields: ['id', 'name'],
    limit: -1,
    filter: {
      status: {
        _eq: 'published'
      }
    }
  }

  return useQuery({
    queryKey: [PREFIX_KEY.GET, 'DEPARTMENTS', queryParams],
    async queryFn() {
      const response = await client.api.get<GetDropdownDepartmentsResponse>('/items/mt_departments', {
        params: queryParams
      })

      return response.data
    }
  })
}

export const useGetRoles = () => {
  return useQuery({
    queryKey: ['roles', 'list', rolesQueryParams], // TODO: Pindah ke query-keys.ts
    async queryFn() {
      type Role = {
        id: string
        name: string
      }

      type GetRolesResponse = {
        data: Role[]
      }

      const response = await client.api.get<GetRolesResponse>('/items/mt_roles', {
        params: rolesQueryParams
      })

      return response.data
    }
  })

}

const PRIMARY_QUERY_KEY_WORK_CENTERS = 'WORK_CENTERS'


export const useGetWorkCenters = () => {
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


  const key = [PREFIX_KEY.GET, PRIMARY_QUERY_KEY_WORK_CENTERS, queryParams]

  return useQuery({
    queryKey: key,
    async queryFn() {
      const response = await client.api.get<GetWorkCentersResponse>('/items/mt_workcenters', {
        params: queryParams
      })

      return response.data.data.map(workCenter => ({
        id: workCenter.id,
        label: workCenter.name
      }))
    }
  })
}

export const useGetJobFunctions = () => {
    const queryParams = {
      fields: ['id', 'name', 'job_level.name'],
      sort: ['name', 'id'],
      limit: -1,
      filter: {
        status: {
          _eq: 'published'
        }
      },
      deep: {
        job_level: {
          _filter: {
            status: {
              _eq: 'published'
            }
          }
        }
      }
    }

    const PRIMARY_QUERY_KEY = 'JOB_FUNCTIONS'
    const URL = '/items/mt_job_functions'

    const key = [PREFIX_KEY.GET, PRIMARY_QUERY_KEY, queryParams]

    return useQuery({
      queryKey: key,
      async queryFn() {
        const response = await client.api.get<GetJobFunctionsResponse>(URL, {
          params: queryParams
        })

        return response.data
      }
    })
}


export const fetchListDepartment = (params?: FetchParameters): any => {
  return useInfiniteQuery<GetSelectResponse, Error>({
    queryKey: ['DEPARTMENT', params],
    initialPageParam: 1,
    queryFn: async ({ pageParam = 1 }) => {
      const queryParams = {
        ...params,
        page: pageParam,
        search: params?.search || undefined,
        limit: params?.limit || 10, // Set default limit if not provided
        fields: ['id', 'name'],
        meta: ['total_count', 'filter_count', 'current_page', 'limit', 'total_page']
      }

      const response = await client.api.get<GetSelectResponse>('/items/mt_departments', {
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
