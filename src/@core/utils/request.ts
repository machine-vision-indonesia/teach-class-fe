import api from 'src/client/api'
import { formatParams } from './parser'

export async function getData(url: string, params?: IParams | string) {
  const newParams: string = formatParams(params)
  try {
    const res = await api(url + newParams)

    return res
  } catch (err) {
    console.log(err)
  }
}
