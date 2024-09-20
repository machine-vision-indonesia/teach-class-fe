import { useQuery } from '@tanstack/react-query'
import client from 'src/client'
import { IRepository, PropsRepositoryDocument } from '../types/RepositoryDocument.types'

type GetRepositiesResponse = {
  data: IRepository[]
}

export const fetchListRepositoryDocument: PropsRepositoryDocument['dataFetchService'] = params => {
  const queryParams = {
    ...params,
    fields: ['id', 'title', 'filename_download', 'filesize', 'modified_on', 'tag']
  }

  return useQuery({
    queryKey: ['REPOSITORY'],
    async queryFn() {
      const response = await client.api.get<GetRepositiesResponse>('/files', {
        params: queryParams
      })
      return response.data
    }
  })
}
