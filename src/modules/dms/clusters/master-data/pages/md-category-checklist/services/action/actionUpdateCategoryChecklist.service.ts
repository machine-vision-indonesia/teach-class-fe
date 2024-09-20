import client from '@/client'
import { AxiosResponse } from 'axios'
import { IRequestCategoryChecklist } from '../../types/requestBody.types'

interface IResponse<T> {
  data: T[] | T
}

export type UpdateBodyCategoryChecklist = IRequestCategoryChecklist

export const ActionUpdateCategoryChecklist = <T>(
  body: UpdateBodyCategoryChecklist
): Promise<AxiosResponse<IResponse<T>>> => {
  return client.api.patch<IResponse<T>>(`/items/mt_category_checksheet/${body.id}`, body)
}
