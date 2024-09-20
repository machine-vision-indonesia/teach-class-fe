import client from "@/client"
import { useMutation } from "@tanstack/react-query"
import { useRouter } from "next/router"
import { UpdateMutationData, PersonalData, MutationData, UploadFileResponse } from "../types/UserEditPage.type"

export const usePostEditAuthFieldMutation = () => {
  const router = useRouter()
  return useMutation({
    async mutationFn(data: UpdateMutationData) {
      return client.api.patch(`/users/${router.query.id}`, {
        email: data.email,
        privileges: {
          create: data.roleIds.map(roleId => ({
            role: roleId,
            user: router.query.id,
            status: 'published'
          })),
          delete: data.currentPrivilegeIds
        },
        werk: data.werk,
        sto: data.sto,
        job_function: data.job_function,
        job_title: data.job_title
      })
    }
  })
}

export function useUpdatePersonalData() {
  return useMutation({
    async mutationFn({ id, ...data }: PersonalData) {
      return client.api.patch(`/items/profiles/${id}`, {
        ...data,
        full_name: `${data.first_name} ${data.last_name}`
      })
    }
  })
}

export function useUpdatePhoto() {
  return useMutation({
    async mutationFn(data: MutationData) {
      if (data.userId && !data.profileId) {
        return client.api.patch(`/users/${data.userId}`, {
          profile: {
            cover: data.idPhoto,
            status: 'published'
          }
        })
      }

      return client.api.patch(`/items/profiles/${data.profileId}`, {
        photo: data.idPhoto
      })
    }
  })
}

export function useUpdateCover() {
  return useMutation({
    async mutationFn(data: MutationData) {
      if (data.userId && !data.profileId) {
        return client.api.patch(`/users/${data.userId}`, {
          profile: {
            cover: data.idPhoto,
            status: 'published'
          }
      })
      }

      return client.api.patch(`/items/profiles/${data.profileId}`, {
        cover: data.idPhoto
      })
    }
  })
}
