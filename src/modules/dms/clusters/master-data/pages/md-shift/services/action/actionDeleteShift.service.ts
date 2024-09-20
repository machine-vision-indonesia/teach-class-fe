import client from '@/client'

export const ActionDeleteShift = async (shiftId: string) => {
  return client.api.delete('/items/mt_shift/' + shiftId)
}
