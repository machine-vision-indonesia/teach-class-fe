import client from 'src/client'
import { AxiosResponse } from 'axios'
import { AllVehicle, GetAllVehicle } from '../fetch/fetchAllVehicle.service'
import { generateNextCode } from '../../utils/generateNextCode'

interface IResponse<T> {
  data: T[] | T
}

export interface RequestBodyVehicle {
  id?: string
  code?: string
  vehicle_name?: string
  description?: string
  is_active: boolean
  created_at?: Date
  updated_at?: Date | null
}

type CreateBodyVehicle = Omit<RequestBodyVehicle, 'id' | 'created_at' | 'updated_at'>
type UpdateBodyVehicle = Omit<RequestBodyVehicle, 'created_at' | 'updated_at'>
type DeleteBodyVehicle = { id: string }

export const ActionCreateVehicle = <T>(body: CreateBodyVehicle): Promise<AxiosResponse<IResponse<T>>> => {
  return client.api.post<IResponse<T>>('/items/mt_vehicle/', body)
}

export const ActionUpdateVehicle = <T>(body: UpdateBodyVehicle): Promise<AxiosResponse<IResponse<T>>> => {
  return client.api.patch<IResponse<T>>(`/items/mt_vehicle/${body.id}`, body)
}

export const ActionDeleteVehicle = <T>(body: DeleteBodyVehicle): Promise<AxiosResponse<IResponse<T>>> => {
  return client.api.delete<IResponse<T>>(`/items/mt_vehicle/${body.id}`)
}
