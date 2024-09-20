import { queryClient } from '@/pages/_app'
import { GetCurrentUserResponse, User } from '@/types/directus/current-user'
import { meKey } from '@/utils/query-keys'
import React, { useEffect, useState } from 'react'

const useUserChat = () => {
  const [user, setUser] = useState<User>()

  const resUser = queryClient.getQueryData<GetCurrentUserResponse>(meKey)

  useEffect(() => {
    if (resUser && resUser.data) {
      return setUser(resUser.data)
    }
  }, [resUser])

  return user
}

export default useUserChat
