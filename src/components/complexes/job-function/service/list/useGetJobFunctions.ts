import { useQuery } from '@tanstack/react-query'
import client from 'src/client'
import { PREFIX_KEY } from 'src/constant/common'

type GetJobFunctionsParamsParams = {
  search: string
  stoIds: string[]
  page: number
  limit: number
}

type GetJobFunctionsQueryParams = {
  fields: string[]
  sort: string
  limit: number
  filter?: {
    _and: Record<string, any>[]
  }
  deep?: Record<string, any>
  meta: string[]
  page: number
}

type Sto = {
  id: string
  name: string
}

type JobFunction = {
  id: string
  code: string
  // department : string
  name: string
  sto: Sto
  status: string
}

type GetJobFunctionsMeta = {
  filter_count: number
}

type GetJobFunctionResponse = {
  data: JobFunction[]
  meta: GetJobFunctionsMeta
}

type Params = {
  search: string
  stoIds: string[]
  page: number
  limit: number
}

function getJobFunctionParams(params: GetJobFunctionsParamsParams) {
  let queryParams: GetJobFunctionsQueryParams = {
    fields: ['id', 'code', 'name', 'status', 'sto.id', 'sto.name'],
    sort: 'id',
    meta: ['filter_count'],
    filter: {
      _and: [{
        status: {
          _eq: 'published'
        }
      },]
    },
    deep: {
      sto: {
        _filter: {
          status: {
            _eq: 'published'
          }
        }
      }
    },
    page: params.page,
    limit: params.limit
  }

  if (!params.search && !params.stoIds.length) {
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
            code: {
              _icontains: params.search
            }
          },
          {
            name: {
              _icontains: params.search
            }
          },
          {
            sto: {
              name: {
                _icontains: params.search
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
          id: {
            _in: params.stoIds
          }
        }
      }
    ]
  }

  return queryParams
}

export const PRIMARY_QUERY_KEY = 'JOBFUNCTION'
const URL = '/items/mt_job_functions'

export function useGetJobFunctions(params: Params) {
  return useQuery({
    queryKey: [
      PREFIX_KEY.GET,
      PRIMARY_QUERY_KEY,
      getJobFunctionParams({
        search: params.search,
        stoIds: params.stoIds,
        page: params.page,
        limit: params.limit
      })
    ],
    async queryFn() {
      const response = await client.api.get<GetJobFunctionResponse>(URL, {
        params: getJobFunctionParams({
          search: params.search,
          stoIds: params.stoIds,
          page: params.page,
          limit: params.limit
        })
      })

      return response.data
    }
  })
}
