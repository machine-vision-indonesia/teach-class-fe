/**
 * There are 5 section of code that dont need to change, with line separator noted as:
 * //^^ above code are template you dont need to change anything
 * //^^ below code are template you dont need to change anything
 *
 */

import { AxiosResponse } from 'axios'
import client from 'src/client'
import { ICommonDto } from 'src/types/model/common'

interface IResponse<T> {
  data: T[] | T
}

//^^ above code are template you dont need to change anything
// IResponseData+ActionSubmitNpdDnp ->> from request function name
// ->> generate this interface each properties must be generated from response body of object
// each properties shold be add sufix '?'
export interface IResponseDataActionSubmitNpdDnp {
  change_me: string
}

// IRequestBody+ActionSubmitNpdDnp ->> from request function name
// ->> generate this interface and each properties must be generated sfrom request body of object
// each properties shold be add sufix '?'
export interface IRequestBodyActionSubmitNpdDnp extends ICommonDto {
  change_me: string
}

// IRequestBody+ActionSubmitNpdDnp ->> from request function name
type IRequestBody = IRequestBodyActionSubmitNpdDnp

//^^ bellow code are template you dont need to change anything
export const ActionSubmitNpdDnp = <T>(body: IRequestBody): Promise<AxiosResponse<IResponse<T>>> => {
  //^^ above code are template you dont need to change anything

  // Replace 'change_me' below with your actual API endpoint
  // If request contains an id, it will do a PATCH update request
  if (body.id) {
    return client.api.patch<IResponse<T>>(`/items/change_me/${body.id}`, body)
  }

  // If no id, it will do a POST create request
  return client.api.post<IResponse<T>>('/items/change_me', body)

  // The below code makes the Axios request
  // No need to change the below code besides the endpoint

  // Simply replace 'change_me' with your actual endpoint
}
