import { useQuery } from '@tanstack/react-query'
import client from 'src/client'
import { GetCalendarResponse, PropsCalendar } from '../types/Calendar.type'

export const fetchListCalendar: PropsCalendar['dataFetchService'] = params => {
  const queryParams = {
    ...params,
    fields: ['id', 'title', 'date', 'color']
  }

  return useQuery({
    queryKey: ['CALENDAR'],
    async queryFn() {
      const response = await client.api.get<GetCalendarResponse>('/items/test_calendars', {
        params: queryParams
      })
      return response.data
    }
  })
}
