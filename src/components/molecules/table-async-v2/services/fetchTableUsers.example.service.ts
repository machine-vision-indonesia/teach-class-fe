import { useQuery } from '@tanstack/react-query'
import client from 'src/client'
import { PREFIX_KEY } from 'src/constant/common'
import { PropsTableListAsync } from '../../table-list-async/types/TableListAsync.type'
import { convertToFilterObject } from '../utils/TableAsyncV2.utils'

type Sto = {
  name: string
  date_created: string
}

type User = {
  id: string
  email: string
  sto?: Sto
}

type GetTableUsersResponse = {
  data: User[]
}


export const GetTableUsers: PropsTableListAsync['dataFetchService'] = params => {
  const paramsToAdd = { ...params }
  paramsToAdd!.filterResult = undefined

  const queryParams = {
    ...paramsToAdd,
    fields: ['id', 'email', 'sto.name', 'sto.date_created'],
    filter: params?.filterResult ? convertToFilterObject(params?.filterResult) : undefined
  }

  return useQuery({
    queryKey: [PREFIX_KEY.GET, 'USERS', queryParams],
    async queryFn() {
      const response = await client.api.get<GetTableUsersResponse>('/users', {
        params: queryParams
      })

      return response.data
    }
  })
}
