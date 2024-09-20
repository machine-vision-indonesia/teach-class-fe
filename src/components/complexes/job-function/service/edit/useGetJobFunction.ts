import { UseQueryOptions, useQuery } from '@tanstack/react-query'
import client from 'src/client'
import { PREFIX_KEY } from 'src/constant/common'

type JobLevel = {
  id: string
  name: string
}
type sto = {
  id: string
  name: string
}

type JobFunction = {
  code: string
  name: string
  description: string
  job_level: JobLevel
  sto: sto
}

type GetJobFunctionResponse = {
  data: JobFunction
}

type Params = {
  id: string
} & Pick<UseQueryOptions, 'enabled'>

const PRIMARY_QUERY_KEY = 'JOB_FUNCTIONS'
const URL = '/items/mt_job_functions'

const queryParams = {
  fields: ['code', 'name', 'job_level.id', 'job_level.name', 'sto.id', 'sto.name', 'description'],
  deep: {
    sto: {
      _filter: {
        status: {
          _eq: 'published'
        }
      }
    },
    job_level: {
      _filter: {
        status: {
          _eq: 'published'
        }
      }
    }
  }
}

export function useGetJobFunction(params: Params) {
  return useQuery({
    queryKey: [PREFIX_KEY.GET, PRIMARY_QUERY_KEY, queryParams],
    async queryFn() {
      const response = await client.api.get<GetJobFunctionResponse>(`${URL}/${params.id}`, {
        params: queryParams
      })

      return response.data
    },
    enabled: params.enabled
  })
}
