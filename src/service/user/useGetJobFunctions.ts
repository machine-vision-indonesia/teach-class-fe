import { useQuery } from '@tanstack/react-query'
import client from 'src/client'
import { PREFIX_KEY } from 'src/constant/common'

type GetQueryParamsParams = {
  search: string
}

type JobLevel = {
  name: string
}

type JobFunction = {
  id: string
  name: string
  job_level: JobLevel
}

type GetJobFunctionsResponse = {
  data: JobFunction[]
}

type Params = {
  search: string
}

function getQueryParams(params: GetQueryParamsParams) {
  const baseQueryParams = {
    fields: ['id', 'name', 'job_level.name'],
    sort: ['name', 'id'],
    filter: {
      status: {
        _eq: 'published'
      }
    }
  }

  if (!params.search) {
    return baseQueryParams
  }

  return {
    ...baseQueryParams,
    filter: {
      name: {
        _icontains: params.search
      }
    }
  }
}

const PRIMARY_QUERY_KEY = 'JOB_FUNCTIONS'
const URL = '/items/mt_job_functions'

export const useGetJobFunctions = (params: Params) => {
  const key = [PREFIX_KEY.GET, PRIMARY_QUERY_KEY, getQueryParams({ search: params.search })]

  return useQuery({
    queryKey: key,
    async queryFn() {
      const response = await client.api.get<GetJobFunctionsResponse>(URL, {
        params: getQueryParams({ search: params.search })
      })

      return response.data
    }
  })
}
