import { AxiosResponse } from 'axios'
import client from 'src/client'

/**
 * @NOTE
 * satu file satu context yang sama misalnya entity yang sama atau context yang sama
 * boleh ada GET,POST,PATCH,DELETE
 */

interface IResponse<T> {
  data: T[] | T
}

export interface IRequestBodyDiscussionHistory {
  id?: string
  message: string
  send_by: any
  created_at: string
  attachment: string
  document_id: string
  created_by: string
}

/**
 *
 * @method POST
 * @param params
 * @returns response
 */
export const ActionSaveDiscussionHistoryExample = <T>(
  body: IRequestBodyDiscussionHistory
): Promise<AxiosResponse<IResponse<T>>> => {
  return client.api.post<IResponse<T>>('/items/discussion', body)
}
