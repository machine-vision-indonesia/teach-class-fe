import client from "@/client"
import { GetPrivilegesResponse, GetUsersResponse } from "../types/Login.type"

export const fetchPrevilegesResponse = async (data: {
  email: string,
  token: string
}): Promise<GetPrivilegesResponse> => {
  const response = await client.api.get<GetPrivilegesResponse>('/items/mt_privileges', {
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
      Authorization: `Bearer ${data.token}`
    }
  });
  return response.data;
}

export const fetchListUser = async (data: {
  email: string,
  access_token: string
}) => {
  const response = await client.api.get<GetUsersResponse>(`/users`, {
    params: {
      filter: {
        email: {
          _eq: data.email
        }
      },
      fields: ['id', 'is_using_generated_password']
    },
    headers: {
      Authorization: `Bearer ${data.access_token}`
    }
  })
  return response.data;
}


export const fetchGlobalUser = async () => {
  const response = await client.api.get('/items/global_config')
  return response.data;
}

export const fetchUserMe = async (data: {
  password: string,
  access_token: string
}) => {
  const response = await client.api.get('/user/me', {
    params: {
      password: data.password
    },
    headers: {
      Authorization: `Bearer ${data.access_token}`
    }
  })
  return response.data;
}
