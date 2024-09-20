import { UseQueryOptions, useQuery } from '@tanstack/react-query'
import client from 'src/client'
import { PREFIX_KEY } from 'src/constant/common'

type Profile = {
  id: string
  id_number: string
  first_name: string
  last_name: string
  gender: string
  religion: string
}

type GetUserResponseData = {
  profile: Profile
  email: string
}

type GetUserResponse = {
  data: GetUserResponseData
}

type Params = Pick<UseQueryOptions, 'enabled'> & {
  id: string
}

const userParams = {
  fields: [
    'profile.id',
    'profile.id_number',
    'profile.first_name',
    'profile.last_name',
    'profile.gender',
    'profile.religion',
    'email'
  ],
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

const PRIMARY_QUERY_KEY = 'USERS'
const URL = '/users'

export function useGetPersonalData(params: Params) {
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
