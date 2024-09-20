import client from 'src/client'
import { useQuery } from '@tanstack/react-query'
import { PREFIX_KEY } from 'src/constant/common'
import { IParams } from 'src/types/master/filter'

interface IResponse<T> {
  data: T[]
  meta: {
    filter_count: number
  }
}

export interface AllVehicle {
  id: string
  code: string
}

export const GetAllVehicle = <T>(params: IParams = {}) => {
  const requestOption: any = { retry: false }
  const queryParam: any = {
    fields: ['id', 'code'],
    limit: 1,
    sort: ['-created_at'],
    ...params
  }
  const keys = [PREFIX_KEY.GET, 'MT_VEHICLE', queryParam]

  const fetch = async <T>(params: IParams): Promise<IResponse<T>> => {
    const { data } = await client.api.get<IResponse<T>>('/items/mt_vehicle', {
      params
    })

    return data
  }

  return useQuery<IResponse<T>, Error>({
    queryKey: keys,
    queryFn: () => fetch<T>(queryParam),
    ...requestOption
  })
}
