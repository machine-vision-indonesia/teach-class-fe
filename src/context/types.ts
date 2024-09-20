import { type User } from 'src/types/directus/current-user'

export type ErrCallbackType = (err: { [key: string]: string }) => void

export type LoginParams = {
  email: string
  password: string
  rememberMe?: boolean
  grant_type?: string
  client_id?: string
}

export type RegisterParams = {
  email: string
  username: string
  password: string
}

export type AuthValuesType = {
  loading: boolean
  logout: () => void
  user: User | null
  setLoading: (value: boolean) => void
  setUser: (value: User | null) => void
  login: (params: LoginParams, errorCallback?: ErrCallbackType) => void
  register: (params: RegisterParams, errorCallback?: ErrCallbackType) => void
}
