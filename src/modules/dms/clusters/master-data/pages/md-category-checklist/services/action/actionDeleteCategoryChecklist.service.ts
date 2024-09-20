import client from '@/client'
import { AxiosResponse } from 'axios'
import { IRequestCategoryChecklist } from '../../types/requestBody.types'

interface IResponse<T> {
  data: T[] | T
}

export type DeleteBodyCategoryChecklist = {
  id: string
}

export const ActionDeleteCategoryChecklist = <T>(
  body: DeleteBodyCategoryChecklist
): Promise<AxiosResponse<IResponse<T>>> => {
  return client.api.delete<IResponse<T>>(`/items/mt_category_checksheet/${body.id}`)
}
