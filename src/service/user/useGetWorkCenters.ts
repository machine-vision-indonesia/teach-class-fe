import { useQuery } from '@tanstack/react-query'
import client from 'src/client'
import { PREFIX_KEY } from 'src/constant/common'

type GetQueryParamsParams = {
  search: string
}

type WorkCenter = {
  id: string
  name: string
}

type GetWorkCentersResponse = {
  data: WorkCenter[]
}

type Params = {
  search: string
}

function getQueryParams(params: GetQueryParamsParams) {
  const baseQueryParams = {
    fields: ['id', 'name'],
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

const PRIMARY_QUERY_KEY = 'WORK_CENTERS'
const URL = '/items/mt_workcenters'

export const useGetWorkCenters = (params: Params) => {
  const key = [PREFIX_KEY.GET, PRIMARY_QUERY_KEY, getQueryParams({ search: params.search })]

  return useQuery({
    queryKey: key,
    async queryFn() {
      const response = await client.api.get<GetWorkCentersResponse>(URL, {
        params: getQueryParams({ search: params.search })
      })

      return response.data.data.map(workCenter => ({
        id: workCenter.id,
        label: workCenter.name
      }))
    }
  })
}
