import { useQuery } from '@tanstack/react-query'
import client from 'src/client'
import { PREFIX_KEY } from 'src/constant/common'
import { IParams } from 'src/types/master/filter'

/**
 * @NOTE
 * satu file satu context yang sama misalnya entity yang sama atau context yang sama
 * boleh ada GET,POST,PATCH,DELETE
 */

interface IResponse<T> {
  data: T[]
  meta: {
    filter_count: number
  }
}

interface FetchParametrs extends IParams {
  search?: string
}

/**
 * @NOTE hanya boleh ada satu PRIMARY_QUERY_KEY di dalam file, jika berbeda silahkan buat file baru.
 * agar codenya lebih terstruktur dan lebih mudah di baca
 */
const PRIMARY_QUERY_KEY = 'MT_PAGES'

/**
 *
 * @method GET
 * @param params
 * @returns response
 */
export const GetTablePage = <T>(params: FetchParametrs = {}) => {
  const requestOption: any = { retry: false }
  const queryParam: IParams = {
    filter: {
      _and: []
    },
    ...params
  }
  const keys = [PREFIX_KEY.GET, PRIMARY_QUERY_KEY, queryParam]

  const fetch = async <T>(params: IParams): Promise<IResponse<T>> => {
    const { data } = await client.api.get<IResponse<T>>('/items/mt_pages', {
      params
    })

    return data
  }

  if (params?.search) {
    queryParam.filter._and.push({ name: { _contains: params.search } })
  }

  if (params.page) {
    requestOption.keepPreviousData = true
  }

  return useQuery<IResponse<T>, Error>({
    queryKey: keys,
    queryFn: () => fetch<T>(queryParam),
    ...requestOption
  })
}
