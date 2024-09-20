/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from 'react'
import { queryClient } from 'src/pages/_app'
import { GetCurrentUserResponse, User } from 'src/types/directus/current-user'
import { meKey } from 'src/utils/query-keys'

export const useUserData = () => {
  const [user, setUser] = useState<User>({} as User)
  const res = queryClient.getQueriesData<GetCurrentUserResponse>(meKey)

  useEffect(() => {
    if (res) {
      const data = res[0][1]?.data || ({} as User)
      setUser(data)
    }

    return () => {}
  }, [res])

  return {
    data: user
  }
}
