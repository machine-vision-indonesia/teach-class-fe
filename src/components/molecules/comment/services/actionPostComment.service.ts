import client from '@/client'
import { IPayloadComment } from '../types/Comment.type'

export async function actionPostComment(data: IPayloadComment) {
  client.api.post('/items/test_comments', data)
}
