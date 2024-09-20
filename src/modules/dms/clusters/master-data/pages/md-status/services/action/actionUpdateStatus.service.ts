import client from '@/client'
import { AxiosResponse } from 'axios'
import { IRequestStatus } from '../../types/requestBody.types'

interface IResponse<T> {
  data: T[] | T
}

export type UpdateBodyStatus = IRequestStatus

export const ActionUpdateStatus = <T>(body: UpdateBodyStatus): Promise<AxiosResponse<IResponse<T>>> => {
  return client.api.patch<IResponse<T>>(`/items/mt_dms_status/${body.id}`, body)
}
