import client from '@/client'
import { Event } from '../types/Calendar.type'

export async function actionPostEvent(data: Event) {
  client.api.post('/items/test_calendars', data)
}
