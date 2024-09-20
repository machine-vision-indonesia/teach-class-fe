import { useQuery, UseQueryOptions } from '@tanstack/react-query'
import client from 'src/client'
import { PREFIX_KEY } from 'src/constant/common'

const PRIMARY_QUERY_KEY = 'DETAIL CATEGORY CHECKLIST'
const URL = '/items/mt_category_checksheet'

export type CheckSheetItems = {
  id: string
  name: string
}

export type MDCategoryChecklist = {
  id: string
  code: string
  name: string
  description?: string
  is_active: boolean
  status?: string
  created_at?: string
  updated_at?: string
  checksheet_items?: CheckSheetItems[]
  production_checksheets?: CheckSheetItems[]
}

type GetDetailMDCategoryChecklistResponse = {
  data: MDCategoryChecklist
}

type fetchParameters = Pick<UseQueryOptions, 'enabled'> & {
  id: string | null
}

export function useGetMDCategoryChecklistById(params: fetchParameters) {
  const queryParams = {
    fields: [
      'id,code,name,description,is_active,created_at,updated_at,checksheet_items.name,production_checksheets.name'
    ],
    filter: {}
  }

  if (params.id) {
    queryParams.filter = {
      id: {
        eq: params.id
      }
    }
  }

  const key = [PREFIX_KEY.GET, PRIMARY_QUERY_KEY, params.id, queryParams]

  return useQuery({
    queryKey: key,
    async queryFn() {
      const response = await client.api.get<GetDetailMDCategoryChecklistResponse>(`${URL}/${params.id}`, {
        params: {
          ...queryParams,
          enabled: params.enabled
        }
      })

      return response.data
    }
  })
}
