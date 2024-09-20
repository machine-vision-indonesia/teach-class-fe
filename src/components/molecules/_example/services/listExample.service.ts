import client from 'src/client'
import { useQuery } from '@tanstack/react-query'

import { PREFIX_KEY } from 'src/constant/common'

import { FetchParameters, PropsTable } from '@/components/molecules/table-async/TableAsync.type'
import { GetListExampleResponse } from '../types/Example.types'

/**
 * @NOTE
 * satu file satu context yang sama misalnya entity yang sama atau context yang sama
 * boleh ada GET,POST,PATCH,DELETE
 */

/**
 * @NOTE hanya boleh ada satu PRIMARY_QUERY_KEY di dalam file, jika berbeda silahkan buat file baru.
 * agar codenya lebih terstruktur dan lebih mudah di baca
 */
const PRIMARY_QUERY_KEY = 'EXAMPLE'

/**
 * @NOTE define params pada func
 * agar codenya lebih terstruktur dan lebih mudah dibaca
 */
const renderParams = (params: FetchParameters) => {
  return {
    ...params,
    fields: ['*'].toString(),
    sort: ['-date_created', '-date_updated']
  }
}

/**
 *
 * @method GET
 * @param params
 * @returns response array or object depend on your request <T>
 * that can be object or array
 */
export const getListExample: PropsTable['dataFetchService'] = (params: any) => {
  const keys = [PREFIX_KEY.GET, PRIMARY_QUERY_KEY, renderParams(params)]

  return useQuery({
    queryKey: keys,
    async queryFn() {
      const response = await client.api.get<GetListExampleResponse>('/items/mt_examples', {
        params: renderParams(params)
      })

      return response.data
    }
  })
}
