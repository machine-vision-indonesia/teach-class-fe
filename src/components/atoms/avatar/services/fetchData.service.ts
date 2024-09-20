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

export interface IUser {
  id?: string
  first_name?: string
  last_name?: string
  email?: string
  password?: string
  location?: string | null
  title?: string | null
  description?: string | null
  tags?: string[] | null
  avatar?: string | null
  language?: string | null
  tfa_secret?: string | null
  status?: string
  token?: string
  last_access?: string
  last_page?: string
  provider?: string
  external_identifier?: string | null
  auth_data?: any | null // Change 'any' to a specific type if known
  email_notifications?: boolean
  appearance?: any | null // Change 'any' to a specific type if known
  theme_dark?: any | null // Change 'any' to a specific type if known
  theme_light?: any | null // Change 'any' to a specific type if known
  theme_light_overrides?: any | null // Change 'any' to a specific type if known
  theme_dark_overrides?: any | null // Change 'any' to a specific type if known
  company?: string | null
  is_verified?: boolean
  job_function?: string | null
  job_title?: string
  profile?: any | null // Change 'any' to a specific type if known
  sto?: any | null // Change 'any' to a specific type if known
  werk?: any | null // Change 'any' to a specific type if known
}

/**
 * @NOTE hanya boleh ada satu PRIMARY_QUERY_KEY di dalam file, jika berbeda silahkan buat file baru.
 * agar codenya lebih terstruktur dan lebih mudah di baca
 */
const PRIMARY_QUERY_KEY = 'DOCUMENT_HISTORY'

/**
 *
 * @method GET
 * @param params
 * @returns response
 */
export const GetUser = <T>(params: IRequest) => {
  const queryParam: any = {
    fields: ['*', 'avatar.*'],
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
