import client from 'src/client'
import { PREFIX_KEY } from 'src/constant/common'
import { useQuery } from '@tanstack/react-query'
import { type DropdownMultipleFilter } from 'src/components/molecules/table-async/TableAsync.type'

type Department = {
  id: number
  name: string
}

type GetDropdownDepartmentsResponse = {
  data: Department[]
}

export const GetDropdownDepartments: DropdownMultipleFilter['dataFetchService'] = () => {
  const queryParams = {
    fields: ['id', 'name'],
    limit: -1,
    filter: {
      status: {
        _eq: 'published'
      }
    }
  }

  return useQuery({
    queryKey: [PREFIX_KEY.GET, 'DEPARTMENTS', queryParams],
    async queryFn() {
      const response = await client.api.get<GetDropdownDepartmentsResponse>('/items/mt_departments', {
        params: queryParams
      })

      return response.data
    }
  })
}
