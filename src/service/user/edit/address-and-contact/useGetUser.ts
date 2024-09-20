import { type UseQueryOptions, useQuery } from '@tanstack/react-query'
import client from 'src/client'
import { PREFIX_KEY } from 'src/constant/common'

type Profile = {
  id: string
  address: string
  phone: string
  post_code: string
}

type GetUserResponseData = {
  profile: Profile
}

type GetUserResponse = {
  data: GetUserResponseData
}

type Params = Pick<UseQueryOptions, 'enabled'> & {
  id: string
}

const PRIMARY_QUERY_KEY = 'USERS'
const URL = '/users'

const userParams = {
  fields: ['profile.id', 'profile.address', 'profile.phone', 'profile.post_code'],
  deep: {
    profile: {
      _filter: {
        status: {
          _eq: 'published'
        }
      }
    }
  }
}

export function useGetUser(params: Params) {
  const key = [PREFIX_KEY.GET, PRIMARY_QUERY_KEY, 'detail', params.id, userParams]

  return useQuery({
    queryKey: key,
    async queryFn() {
      const response = await client.api.get<GetUserResponse>(`${URL}/${params.id}`, {
        params: userParams
      })

      return response.data
    }
    // enabled: params.enabled
  })
}
