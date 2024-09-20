import { useQuery, type UseQueryOptions } from '@tanstack/react-query'
import client from 'src/client'
import { PREFIX_KEY } from 'src/constant/common'

type DepartmentLevel = {
  id: string
  name: string
}

type Parent = {
  id: string
  name: string
}

type Data = {
  id: string
  name: string
  code: string
  parent: Parent | null
  department_level: DepartmentLevel
  description: string | null
}

type GetDepartmentResponse = {
  data: Data
}

type UseGetDepartmentParams = Pick<UseQueryOptions, 'enabled'> & {
  id: string
}

export function useGetDepartment(params: UseGetDepartmentParams) {
  const queryParams = {
    fields: [
      'id',
      'name',
      'code',
      'parent.id',
      'parent.name',
      'department_level.id',
      'department_level.name',
      'description'
    ]
  }

  const key = [PREFIX_KEY.GET, 'DEPARTMENTS', 'detail', params.id, queryParams]

  return useQuery({
    queryKey: key,
    async queryFn() {
      const response = await client.api.get<GetDepartmentResponse>(`/items/mt_departments/${params.id}`, {
        params: queryParams
      })

      return response.data
    },
    enabled: params.enabled
  })
}
