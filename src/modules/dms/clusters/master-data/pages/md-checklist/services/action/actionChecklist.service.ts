import client from 'src/client'
import { AxiosResponse } from 'axios'

interface IResponse<T> {
  data: T[] | T
}

interface ChecksheetItem {
  id?: string | null
  status: string
  category_checksheet_id: string
  name: string
}

interface ChecksheetListItem {
  id?: string
  status: string
  checksheet_item_id: ChecksheetItem
  label: string
  is_checked?: boolean
}

interface CategoryChecksheet {
  id: string
  name: string
  code: string
  is_active: boolean
}

export interface RequestBodyChecklist {
  id?: string
  name?: string
  code?: string
  is_active?: boolean
  category_checksheet_id?: string | CategoryChecksheet
  description?: string
  status?: string
  production_checksheet_lists?: {
    update?: ChecksheetListItem[]
    create?: ChecksheetListItem[]
    delete?: ChecksheetListItem[] | string[]
  }
}

type CreateBodyChecklist = Omit<RequestBodyChecklist, 'id' | 'created_at' | 'updated_at'>
type UpdateBodyChecklist = Omit<RequestBodyChecklist, 'created_at' | 'updated_at'>
type DeleteBodyChecklist = { id: string }

export const ActionCreateChecklist = <T>(body: CreateBodyChecklist): Promise<AxiosResponse<IResponse<T>>> => {
  return client.api.post<IResponse<T>>('/items/mt_checksheet/', body)
}

export const ActionUpdateChecklist = <T>(body: UpdateBodyChecklist): Promise<AxiosResponse<IResponse<T>>> => {
  return client.api.patch<IResponse<T>>(`/items/mt_checksheet/${body.id}`, body)
}

export const ActionDeleteChecklist = <T>(body: DeleteBodyChecklist): Promise<AxiosResponse<IResponse<T>>> => {
  return client.api.delete<IResponse<T>>(`/items/mt_checksheet/${body.id}`)
}
