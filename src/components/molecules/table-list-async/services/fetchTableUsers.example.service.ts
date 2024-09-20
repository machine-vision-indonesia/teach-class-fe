import { useQuery } from '@tanstack/react-query'
import client from 'src/client'
import { PREFIX_KEY } from 'src/constant/common'
import { type PropsTableListAsync } from '../types/TableListAsync.type'

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
  const queryParams = {
    ...params,
    fields: ['id', 'email', 'sto.name', 'sto.date_created']
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
