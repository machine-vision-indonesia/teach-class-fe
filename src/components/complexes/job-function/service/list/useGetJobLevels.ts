import { useQuery } from '@tanstack/react-query'
import client from 'src/client'
import { PREFIX_KEY } from 'src/constant/common'

type JobLevelDropdown = {
  id: string
  name: string
}

type GetJobLevelsResponse = {
  data: JobLevelDropdown[]
}

type GetJobLevelsParamsParams = {
  search: string
}

type Params = {
  search: string
}

const PRIMARY_QUERY_KEY = 'JOB_LEVEL'
const URL = '/items/mt_job_levels'

function getJobLevelParams(params: GetJobLevelsParamsParams) {
  const baseParams = {
    fields: ['id', 'name'],
    sort: ['name', 'id'],
    filter: {
      _and: [{
        status: {
          _eq: 'published'
        }
      },]
    },
  }

  if (!params.search) {
    return baseParams
  }

  return {
    ...baseParams,
    filter: {
      name: {
        _icontains: params.search
      },
    }
  }
}

export function useGetJobLevels(params: Params) {
  const key = [PREFIX_KEY.GET, PRIMARY_QUERY_KEY, getJobLevelParams({ search: params.search })]

  return useQuery({
    queryKey: key,
    async queryFn() {
      const response = await client.api.get<GetJobLevelsResponse>(URL, {
        params: getJobLevelParams({ search: params.search })
      })

      return response.data.data.map(jobLevel => ({
        id: jobLevel.id,
        label: jobLevel.name
      }))
    }
  })
}
