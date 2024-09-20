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
}

/**
 * @NOTE hanya boleh ada satu PRIMARY_QUERY_KEY di dalam file, jika berbeda silahkan buat file baru.
 * agar codenya lebih terstruktur dan lebih mudah di baca
 */
const PRIMARY_QUERY_KEY = 'EXAMPLE'

/**
 *
 * @method GET
 * @param params
 * @returns response
 */
export const useGetExample = <T>(params: IParams) => {
  const keys = [PREFIX_KEY.GET, PRIMARY_QUERY_KEY, params]

  const fetch = async <T>(params: IParams): Promise<IResponse<T>> => {
    const { data } = await client.api.get<IResponse<T>>('/items/example', {
      params
    })

    return data
  }

  return useQuery<IResponse<T>, Error>({ queryKey: keys, queryFn: () => fetch<T>(params) })
}
