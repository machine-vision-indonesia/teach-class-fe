import { useQuery } from '@tanstack/react-query'
import client from 'src/client'
import { PREFIX_KEY } from 'src/constant/common'

const PRIMARY_QUERY_KEY = 'LOCATIONS'
const URL = '/items/mt_plant'

type PayloadMtShift = {
  name: string
  code: string
  is_overtime?: boolean
  description?: string
  start: string
  end: string
  company_id: string
  plant_id: string
  status?: string
  is_active: boolean
}

type GetListLocationResponse = {
  data: PayloadMtShift[]
}

export const FetchListLocation = () => {
  const queryParams = {
    fields: ['id', 'name'],
    limit: -1,
    filter: {}
  }

  const key = [PREFIX_KEY.GET, PRIMARY_QUERY_KEY, queryParams]

  return useQuery({
    queryKey: key,
    async queryFn() {
      const response = await client.api.get<GetListLocationResponse>(URL, {
        params: queryParams
      })

      return response.data
    }
  })
}
