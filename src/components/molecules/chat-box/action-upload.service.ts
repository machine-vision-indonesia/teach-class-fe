import client from 'src/client'

export interface IDatacoreFile {
  charset: string // Assuming charset is always a string
  description: string // Assuming description is always a string
  duration: string // Assuming duration is always a string
  embed: string // Assuming embed is always a string
  filename_disk: string
  filename_download: string
  filesize: string
  folder: string // Assuming folder is always a string
  height: string // Assuming height is always a string
  id: string
  location: string // Assuming location is always a string
  metadata: string // Assuming metadata is always a string
  modified_by: string // Assuming modified_by is always a string
  modified_on: string
  storage: string
  title: string
  type: string
  uploaded_by: string
  uploaded_on: string
  width: string
}

export const ActionUploadService = async (e: any) => {
  const formData = new FormData()
  formData.append('file', e?.target?.files[0])

  type UploadFileResponse = {
    data: any
  }
  try {
    const uploadFileResponse = await client.api.post<UploadFileResponse>('/files', formData)

    if (uploadFileResponse.status == 200) {
      return uploadFileResponse?.data?.data
    } else {
      return 'File upload failed.'
    }
  } catch (error) {
    return error
  }
}
