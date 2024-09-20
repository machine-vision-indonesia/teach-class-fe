import axios, { AxiosResponse } from 'axios'
import { env } from 'next-runtime-env'

// ** Config
import authConfig from 'src/configs/auth'

const gql = axios.create({
  baseURL: env('NEXT_PUBLIC_GQL_API_URL'),
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

gql.interceptors.request.use(
  config => {
    const storedToken = window.localStorage.getItem(authConfig.accessTokenKeyName)!

    if (storedToken && config.headers) {
      config.headers.Authorization = `Bearer ${storedToken}`
    }

    return config
  },
  error => {
    Promise.reject(error)
  }
)

gql.interceptors.response.use(
  (response: AxiosResponse) => {
    return response
  },
  function (error) {
    return Promise.reject(error)
  }
)

export default gql
