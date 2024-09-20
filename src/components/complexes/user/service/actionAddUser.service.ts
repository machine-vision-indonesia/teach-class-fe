import client from "@/client"
import { useMutation } from "@tanstack/react-query"
import { GetAdministatorIdResponse, SchemaAddUser } from "../types/ManageUserPage.types"
import axios from "axios"
import { UploadFileResponse } from "../types/UserEditPage.type"

export const usePostUser = () => {
 return useMutation({
    async mutationFn(data: SchemaAddUser) {
      const getAdministatorIdResponse = await client.api.get<GetAdministatorIdResponse>('/roles', {
        params: {
          filter: {
            name: {
              _eq: 'Administrator'
            }
          },
          fields: ['id'].toString()
        }
      })

      if (!getAdministatorIdResponse.data.data.length) {
        throw new Error('Administrator role not found')
      }

      let photo: string | null = null
      if (data.photo) {
        const formData = axios.toFormData({ file: data.photo })
        const uploadFileResponse = await client.api.post<UploadFileResponse>('/files', formData)
        photo = uploadFileResponse.data.data.id
      }

      let cover: string | null = null
      if (data.cover) {
        const formData = axios.toFormData({ file: data.cover })
        const uploadFileResponse = await client.api.post<UploadFileResponse>('/files', formData)
        cover = uploadFileResponse.data.data.id
      }

      return client.api.post('/users', {
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        password: data.password,
        privileges: data.roles.map(role => ({
          role: role.id,
          status: 'published'
        })),
        werk: data.work_center.id,
        sto: data.department.id,
        job_function: data.job_function.id,
        job_title: data.job_title,
        profile: {
          id_number: data.id_number,
          first_name: data.first_name,
          last_name: data.last_name,
          full_name: `${data.first_name} ${data.last_name}`,
          gender: data.gender.id,
          religion: data.religion.id,
          address: data.address,
          phone: data.phone,
          post_code: data.post_code,
          photo,
          cover,
          status: 'published'
        },
        email_notifications: false,
        status: 'active',
        role: getAdministatorIdResponse.data.data[0].id
      })
    }
  })
}
