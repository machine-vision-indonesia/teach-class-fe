import client from '@/client'
import { AxiosResponse } from 'axios'
import { IRequestCategoryChecklist } from '../../types/requestBody.types'

interface IResponse<T> {
  data: T[] | T
}

export type CreateBodyCategoryChecklist = Omit<IRequestCategoryChecklist, 'id'>

export const ActionCreateCategoryChecklist = <T>(
  body: CreateBodyCategoryChecklist
): Promise<AxiosResponse<IResponse<T>>> => {
  return client.api.post<IResponse<T>>('/items/mt_category_checksheet/', body)
}
