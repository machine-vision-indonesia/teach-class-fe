import { useQuery } from '@tanstack/react-query'
import client from 'src/client'
import { PREFIX_KEY } from 'src/constant/common'
import { IParams } from 'src/types/master/filter'

export type UiConfig = {
  code: string
  value: string
}

/**
 * @NOTE
 * satu file satu context yang sama misalnya entity yang sama atau context yang sama
 * boleh ada GET,POST,PATCH,DELETE
 */

interface IResponse<T> {
  data: T[]
}

/**
 * @NOTE hanya boleh ada satu PRIMARY_QUERY_KEY di dalam file, jika berbeda silahkan buat file baru.
 * agar codenya lebih terstruktur dan lebih mudah di baca
 */
const PRIMARY_QUERY_KEY = 'UI_CONFIGS'

/**
 *
 * @method GET
 * @param params
 * @returns response
 */
export const useGetUiConfig = <T>(params: IParams = {}) => {
  const keys = [PREFIX_KEY.GET, PRIMARY_QUERY_KEY, params]
  const requestOption: any = { retry: false }

  const fetch = async <T>(params: IParams): Promise<IResponse<T>> => {
    const { data } = await client.api.get<IResponse<T>>('/items/ui_configs', {
      params
    })

    return data
  }

  if (params.page) {
    requestOption.keepPreviousData = true
  }

  return useQuery<IResponse<T>, Error>({ queryKey: keys, queryFn: () => fetch<T>(params), ...requestOption })
}
