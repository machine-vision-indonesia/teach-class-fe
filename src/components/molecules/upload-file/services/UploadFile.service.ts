import { useMutation } from '@tanstack/react-query'
import client from 'src/client'

export const uploadFileService = async (
  files: File[],
) => {
  const uploadResponses = await Promise.all(
    files.map((file) => {
      const formData = new FormData()
      formData.append('file', file)

      return client.api.post('/files', formData)
    })
  )

  const successfulUploads = uploadResponses.filter(response => response.status === 200)
  if (successfulUploads.length === uploadResponses.length) {
    return successfulUploads.map(response => response.data.data)
  } else {
    throw new Error('Some file uploads failed.')
  }
}

export const useUploadFiles = () => {
  return useMutation({
    mutationFn: async (files: File[]) => {
      return await uploadFileService(files)
    },
    onError: error => {
      console.error('Upload failed:', error)
    },
    onSuccess: data => {
      // console.log('Upload successful:', data)
    }
  })
}
