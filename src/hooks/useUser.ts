import { useQuery } from '@tanstack/react-query'
import client from 'src/client'
import { type GetCurrentUserResponse } from 'src/types/directus/current-user'
import { meKey } from 'src/utils/query-keys'
import authConfig from 'src/configs/auth'

export function useUser() {
  return useQuery({
    queryKey: meKey,
    queryFn: async () => {
      const refreshToken = localStorage.getItem(authConfig.refreshTokenKeyName)
      if (!refreshToken) {
        return null
      }

      const response = await client.api.get<GetCurrentUserResponse>('/user/me')

      return response.data
    }
  })
}
