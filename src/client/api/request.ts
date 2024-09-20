import axios, { type AxiosResponse } from 'axios'
import authConfig from 'src/configs/auth'
import {jwtDecode, JwtPayload} from 'jwt-decode'
import { env } from 'next-runtime-env'

const api = axios.create({
  baseURL: env('NEXT_PUBLIC_REST_API_URL'),
  timeout: 30000
})

let refreshTokenPromise: Promise<AxiosResponse<RefreshTokenResponse, any>> | null = null

type Data = {
  access_token: string
  expires: number
  refresh_token: string
}

type RefreshTokenResponse = {
  data: Data
}

async function refreshToken() {
  return axios.post<RefreshTokenResponse>(
    `${env('NEXT_PUBLIC_REST_API_URL')}/auth/refresh`,
    {
      refresh_token: localStorage.getItem(authConfig.refreshTokenKeyName),
      mode: 'json'
    },
    {
      timeout: 30000
    }
  )
}

api.interceptors.request.use(async config => {
  if (
    (config.url && ['/auth/login', '/auth/refresh', '/auth/logout'].includes(config.url)) ||
    !localStorage.getItem(authConfig.refreshTokenKeyName)
  ) {
    return config
  }

  const token = localStorage.getItem(authConfig.accessTokenKeyName)
  if (token) {
    type Payload = {
      id: string
      role: string
      app_access: boolean
      admin_access: boolean
    } & Pick<JwtPayload, 'iat' | 'exp' | 'iss'>

    const decoded = jwtDecode<Payload>(token)
    if (decoded.exp && Date.now() >= decoded.exp * 1000) {
      if (!refreshTokenPromise) {
        refreshTokenPromise = refreshToken()
      }
    } else {
      config.headers.Authorization = `Bearer ${token}`

      return config
    }
  } else {
    refreshTokenPromise = refreshToken()
  }

  if (refreshTokenPromise) {
    try {
      const response = await refreshTokenPromise
      localStorage.setItem(authConfig.accessTokenKeyName, response.data.data.access_token)
      localStorage.setItem(authConfig.refreshTokenKeyName, response.data.data.refresh_token)
      refreshTokenPromise = null
      config.headers.Authorization = `Bearer ${response.data.data.access_token}`
    } catch {}
  }

  return config
})

// api.interceptors.request.use(
//   (req: AxiosRequestConfig) => {
//     const authService = env('NEXT_PUBLIC_AUTH_DEFAULT') || 'DATACORE'

//     /**
//      * auth service directus use content type app/json
//      */
//     if (authService === 'DIRECTUS') {
//       req.headers = { ...req.headers } as AxiosHeaders

//       // @ts-ignore
//       req.headers['Content-Type'] = 'application/json'
//     } else {
//       req.headers = { ...req.headers } as AxiosHeaders

//       // @ts-ignore
//       req.headers['Content-Type'] = 'application/x-www-form-urlencoded'
//     }

//     const storedToken = window.localStorage.getItem(authConfig.accessTokenKeyName)!

//     if (storedToken) {
//       req.headers = { ...req.headers } as AxiosHeaders

//       // @ts-ignore
//       req.headers['Authorization'] = 'Bearer ' + storedToken
//     }

//     return req
//   },
//   error => {
//     Promise.reject(error)
//   }
// )

// api.interceptors.response.use(
//   (response: AxiosResponse) => {
//     /**
//      * use ORCHARD
//      */
//     if (response.config.url === 'connect/token') {
//       window.localStorage.setItem(authConfig.accessTokenKeyName, response.data.data.access_token)
//     }

//     /**
//      * use DIRECTUS
//      */
//     if (response.config.url === 'auth/login') {
//       window.localStorage.setItem(authConfig.accessTokenKeyName, response.data.data.access_token)
//     }

//     return response
//   },
//   function (error) {
//     // const originalRequest = error.config

//     // if (error.response.status === 401 && !originalRequest._retry) {
//     //   originalRequest._retry = true
//     //   const refreshToken = localStorageService.getRefreshToken()
//     //   return axios
//     //     .post('/auth/token', {
//     //       refresh_token: refreshToken
//     //     })
//     //     .then(res => {
//     //       if (res.status === 201) {
//     //         localStorageService.setToken(res.data)
//     //         axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorageService.getAccessToken()
//     //         return axios(originalRequest)
//     //       }
//     //     })
//     // }
//     return Promise.reject(error)
//   }
// )

export default api
