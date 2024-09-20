import { useQuery } from '@tanstack/react-query'
import client from 'src/client'
import { PREFIX_KEY } from 'src/constant/common'

type GetJobFunctionsParamsParams = {
  jobId: string
}

type GetJobFunctionsQueryParams = {
  fields: string[]
  sort: string
  filter?: {
    _and: Record<string, any>[]
  }
  deep?: Record<string, any>
}

type jobLevel = {
  id: string
  name: string
  code: string
}

type Sto = {
  id: string
  name: string
}

type JobFunction = {
  id: string
  code: string
  job_level: jobLevel
  sto: Sto
  name: string
  status: string
  description: string
}

type GetJobFunctionResponse = {
  data: JobFunction[]
}

type Params = {
  jobId: string
}

function getJobFunctionParams(params: GetJobFunctionsParamsParams) {
  let queryParams: GetJobFunctionsQueryParams = {
    fields: [
      'id',
      'code',
      'name',
      'status',
      'description',
      'job_level.id',
      'job_level.name',
      'job_level.code',
      'sto.id',
      'sto.name'
    ],
    sort: 'id',
    filter: {
      _and: []
    },
    deep: {
      job_level: {
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
  }

  if (!params.jobId) {
    return queryParams
  }

  queryParams = {
    ...queryParams
  }
  if (params.jobId && queryParams.filter) {
    queryParams.filter._and = [
      ...queryParams.filter._and,
      {
        id: {
          _eq: params.jobId
        }
      }
    ]
  }

  return queryParams
}

export const PRIMARY_QUERY_KEY = 'JOBFUNCTION'
const URL = '/items/mt_job_functions'

export function useGetJobFunction(params: Params) {
  return useQuery({
    queryKey: [
      PREFIX_KEY.GET,
      PRIMARY_QUERY_KEY,
      getJobFunctionParams({
        jobId: params.jobId
      })
    ],
    async queryFn() {
      const response = await client.api.get<GetJobFunctionResponse>(URL, {
        params: getJobFunctionParams({
          jobId: params.jobId
        })
      })

      return response.data
    }
  })
}
