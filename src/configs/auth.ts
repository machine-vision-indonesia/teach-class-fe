import { env } from 'next-runtime-env'

export default {
  meEndpoint: '/auth/me',
  loginEndpoint: '/jwt/login',
  registerEndpoint: '/jwt/register',
  accessTokenKeyName: 'accessToken',
  refreshTokenKeyName: 'refreshToken',
  onTokenExpiration: 'refreshToken', // logout | refreshToken
  userData: 'userData',

  authOption: env('NEXT_PUBLIC_AUTH_OPTION') || false,
  authOptions: env('NEXT_PUBLIC_AUTH_OPTION') || ['DATACORE'],
  authDefault: env('NEXT_PUBLIC_AUTH_DEFAULT') || 'DATACORE'
}
