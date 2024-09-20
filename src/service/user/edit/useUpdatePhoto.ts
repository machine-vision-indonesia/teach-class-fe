import { useMutation } from '@tanstack/react-query'
import { type GenericFormData } from 'axios'
import client from 'src/client'

type Metadata = {}

type Data = {
  id: string
  storage: string
  filename_disk: string
  filename_download: string
  title: string
  type: string
  folder: any
  uploaded_by: string
  uploaded_on: string
  modified_by: any
  modified_on: string
  charset: any
  filesize: string
  width: number
  height: number
  duration: any
  embed: any
  description: any
  location: any
  tags: any
  metadata: Metadata
}

type UploadFileResponse = {
  data: Data
}

type MutationData = {
  file: GenericFormData
  profileId: string
}

export function useUpdatePhoto() {
  return useMutation({
    async mutationFn(data: MutationData) {
      const uploadFileResponse = await client.api.post<UploadFileResponse>('/files', data.file)

      return client.api.patch(`/items/profiles/${data.profileId}`, {
        photo: uploadFileResponse.data.data.id
      })
    }
  })
}
