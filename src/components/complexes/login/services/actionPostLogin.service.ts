import { useMutation } from "@tanstack/react-query"
import {  LoginSuccessResponse, Schema, ChangePasswordData } from "../types/Login.type"
import client from "@/client"
import { EMPETYPREVILEGEMESSAGE } from "../constants/Login.contants"
import { fetchPrevilegesResponse } from "./fetchGetLogin.service"

export const useLoginMutation = () => {
  return useMutation({
    mutationFn: async (data: Schema) => {
      const response = await client.api.post<LoginSuccessResponse>('/auth/login', {
        email: data.email,
        password: data.password
      })

      const getPrivilegesResponse = await fetchPrevilegesResponse({
        email: data.email,
        token: response.data.data.access_token
      })

      if (getPrivilegesResponse?.data?.data?.length === 0) {
        await client.api.post(
          '/auth/logout',
          {
            refresh_token: response.data.data.refresh_token
          },
          {
            headers: {
              Authorization: `Bearer ${response.data.data.access_token}`
            }
          }
        )

        throw new Error(EMPETYPREVILEGEMESSAGE)
      }

      return response
    }
  })
}

export const useResetPasswordMutation = () => {
  return useMutation({
    async mutationFn(data: ChangePasswordData) {
      return client.api.patch(
        `/users/${data.id}`,
        {
          password: data.password,
          is_using_generated_password: false
        },
        {
          headers: {
            Authorization: `Bearer ${data.access_token}`
          }
        }
      )
    }
  })

}

export const useTfaGenerateMutation = () => {
  return useMutation({
  mutationFn: async (data: any) => {
    const response = await client.api.post('/users/me/tfa/generate', {
      password: data.password
    }, {
      headers: {
        Authorization: `Bearer ${data.token}`
      }
    })
    return response
  }
})
}
