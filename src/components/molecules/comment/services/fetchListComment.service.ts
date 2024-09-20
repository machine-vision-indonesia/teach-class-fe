import { useQuery } from '@tanstack/react-query'
import { IComment, type PropsComment } from '../types/Comment.type'
import client from 'src/client'

type GetCommentsResponse = {
  data: IComment[]
}

export const fetchListComment: PropsComment['dataFetchService'] = params => {
  const queryParams = {
    ...params,
    fields: [
      'id',
      'user_created.first_name',
      'user_created.last_name',
      'user_created.job_title',
      'user_created.avatar.id',
      'reply_to_id',
      'comment',
      'date_created'
    ]
  }

  return useQuery({
    queryKey: ['COMMENTS'],
    async queryFn() {
      const response = await client.api.get<GetCommentsResponse>('/items/test_comments', {
        params: queryParams
      })
      return response.data
    }
  })
}
