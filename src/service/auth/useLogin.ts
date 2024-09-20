import { useMutation } from '@tanstack/react-query'
import client from 'src/client'

const emptyPrivilegeMessage = 'You do not have privilege yet.'

const usePostLogin = () => {
  return useMutation({
    mutationFn: async (data: any) => {
      type Data = {
        access_token: string
        expires: number
        refresh_token: string
      }

      type LoginSuccessResponse = {
        success: boolean
        data: Data
      }

      const loginResponse = await client.api.post<LoginSuccessResponse>('/auth/login', {
        email: data.email,
        password: data.password
      })

      type Privilege = {
        id: string
      }

      type GetPrivilegesResponse = {
        data: Privilege[]
      }

      const getPrivilegesResponse = await client.api.get<GetPrivilegesResponse>('/items/mt_privileges', {
        params: {
          filter: {
            user: {
              email: {
                _eq: data.email
              }
            }
          },
          fields: ['id']
        },
        headers: {
          Authorization: `Bearer ${loginResponse.data.data.access_token}`
        }
      })

      if (getPrivilegesResponse.data.data.length === 0) {
        await client.api.post(
          '/auth/logout',
          {
            refresh_token: loginResponse.data.data.refresh_token
          },
          {
            headers: {
              Authorization: `Bearer ${loginResponse.data.data.access_token}`
            }
          }
        )

        throw new Error(emptyPrivilegeMessage)
      }

      return loginResponse
    }
  })
}
