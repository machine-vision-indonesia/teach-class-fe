import client from '@/client'

export type PayloadMtShift = {
  name: string
  code: string
  start: Date
  end: Date
  is_overtime: boolean
  company_id: string
  plant_id: string
}

export const ActionCreateShift = async (payload: PayloadMtShift) => {
  return client.api.post<unknown, unknown, PayloadMtShift>('/items/mt_shift/', payload)
}
