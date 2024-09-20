import { useQuery, type UseQueryOptions } from '@tanstack/react-query'
import client from 'src/client'
import { PREFIX_KEY } from 'src/constant/common'

type Params = Pick<UseQueryOptions, 'enabled'> & {
  id: string
}

type Profile = {
  id: string
  photo: string
  cover: string
  full_name: string
  address: string
  id_number: string
  first_name: string
  last_name: string
  gender: string
  religion: string
  phone: string
  post_code: string
}

type Role = {
  name: string
}

type Privilege = {
  role: Role
}

type JobLevel = {
  name: string
}

type JobFunction = {
  name: string
  job_level: JobLevel
}

type Sto = {
  name: string
}

type Werk = {
  name: string
}

type Data = {
  email: string
  job_title: string
  profile: Profile
  privileges: Privilege[]
  werk: Werk
  sto: Sto
  job_function: JobFunction
}

type GetUserResponse = {
  data: Data
}

const PRIMARY_QUERY_KEY = 'USERS'
const URL = '/users'

const userParams = {
  fields: [
    'profile.id',
    'profile.photo',
    'profile.cover',
    'profile.full_name',
    'email',
    'profile.address',
    'privileges.role.name',
    'werk.name',
    'sto.name',
    'job_function.name',
    'job_function.job_level.name',
    'job_title',
    'profile.id_number',
    'profile.first_name',
    'profile.last_name',
    'profile.gender',
    'profile.religion',
    'profile.phone',
    'profile.post_code'
  ]
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
    },
    enabled: params.enabled
  })
}
