import { IParams } from 'src/types/master/filter'
import client from 'src/client'
import { useQuery } from '@tanstack/react-query'
import { PREFIX_KEY } from 'src/constant/common'

/**
 * @NOTE
 * satu file satu context yang sama misalnya entity yang sama atau context yang sama
 * boleh ada GET,POST,PATCH,DELETE
 */

interface IResponse<T> {
  data: T
}

export interface IRequest extends IParams {
  userId: string
}

export interface IUserChatBox {
  id?: string
  first_name?: string
  last_name?: string
  email?: string
}

/**
 * @NOTE hanya boleh ada satu PRIMARY_QUERY_KEY di dalam file, jika berbeda silahkan buat file baru.
 * agar codenya lebih terstruktur dan lebih mudah di baca
 */
const PRIMARY_QUERY_KEY = 'USER_CHAT_BOX'

/**
 *
 * @method GET
 * @param params
 * @returns response
 */
export const GetUserChatBox = <T>(params: IRequest) => {
  const queryParam: any = {
    fields: ['first_name', 'last_name', 'id', 'email'],
    ...params
  }

  const keys = [PREFIX_KEY.GET, PRIMARY_QUERY_KEY, queryParam]

  const fetch = async <T>(params: IRequest): Promise<IResponse<T>> => {
    const { data } = await client.api.get<IResponse<T>>('/users/' + params.userId)

    return data
  }

  return useQuery<IResponse<T>, Error>({
    queryKey: keys,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    queryFn: () => fetch<T>(queryParam),
    retry: false
  })
}
