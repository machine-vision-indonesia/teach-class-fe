import { UseQueryOptions, useQuery } from '@tanstack/react-query'
import client from 'src/client'
import { PREFIX_KEY } from 'src/constant/common'

const PRIMARY_QUERY_KEY = 'MD DRIVER'
const URL = '/items/mt_shift'

export type MDDriver = {
  id?: string
  code?: string
  name?: string
  start: Date
  end: Date
  description?: string
  is_overtime?: boolean
  is_shift?: boolean
  is_active?: boolean
  status?: string
  created_at?: string
  updated_at?: string
  company_id?: {
    id?: string
    name?: string
  }
  plant_id?: {
    id?: string
    name?: string
  }
}

type GetDetailMDDriverResponse = {
  data: MDDriver
}

type fetchParameters = Pick<UseQueryOptions, 'enabled'> & {
  id: string | null
}

export function useGetMDDriverById(params: fetchParameters) {
  const queryParams = {
    fields: [
      'id',
      'code',
      'name',
      'start',
      'end',
      'company_id.id',
      'company_id.name',
      'plant_id.id',
      'plant_id.name',
      'description',
      'is_overtime',
      'is_shift',
      'is_active',
      'status',
      'created_at',
      'updated_at'
    ],
    filter: {}
  }

  if (params.id) {
    queryParams.filter = {
      id: {
        eq: params.id
      }
    }
  }

  const key = [PREFIX_KEY.GET, PRIMARY_QUERY_KEY, params.id, queryParams]

  return useQuery({
    queryKey: key,
    async queryFn() {
      const response = await client.api.get<GetDetailMDDriverResponse>(URL + '/' + params.id, {
        params: {
          ...queryParams,
          enabled: params.enabled
        }
      })

      return response.data
    }
  })
}
