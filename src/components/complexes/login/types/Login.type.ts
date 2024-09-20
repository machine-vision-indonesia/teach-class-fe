import * as yup from 'yup'
import { changePasswordSchema, schema } from "../validations";

export type Schema = yup.InferType<typeof schema>

export type ChangePasswordSchema = yup.InferType<typeof changePasswordSchema>

export type LoginSuccessResponseData = {
  access_token: string
  expires: number
  refresh_token: string
}

export type ChangePasswordData = Pick<LoginSuccessResponseData, 'access_token'> & {
  id: string
  password: string
}

export type LoginSuccessResponse = {
  success: boolean
  data: LoginSuccessResponseData
}

export type Privilege = {
  id: string
}

export type GetPrivilegesResponse = {
  data: {
    data: Privilege[]
  }
}

export type Extensions = {
  code: string
}

export type Error = {
  message: string
  extensions: Extensions
}

export type LoginErrorResponse = {
  errors: Error[]
}

export type LogoutProps = {
  refresh_token: string,
  access_token: string
}

export type User = {
  id: string
  is_using_generated_password: boolean
}

export type GetUsersResponse = {
  data: User[]
}

