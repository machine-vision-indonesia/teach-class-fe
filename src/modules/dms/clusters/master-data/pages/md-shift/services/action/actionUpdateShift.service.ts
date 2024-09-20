import client from '@/client'

export type PayloadMtShift = {
  name: string
  code: string
  start: Date
  end: Date
  is_overtime: boolean
  company_id: string
  plant_id: string
  is_active: boolean
}

export const ActionUpdateShift = async (shiftId: string, payload: PayloadMtShift) => {
  return client.api.patch<unknown, unknown, PayloadMtShift>('/items/mt_shift/' + shiftId, payload)
}
