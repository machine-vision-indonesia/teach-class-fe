import { useAtom } from 'jotai'
import { useRouter } from 'next/router'
import { useEffect, type ReactNode } from 'react'
import { jwtDecode, JwtPayload } from 'jwt-decode'
import { loadingAtom, navItemsAtom, roleOptionsAtom, selectedRoleAtom } from 'src/atoms'
import Spinner from 'src/@core/components/spinner'
import authConfig from 'src/configs/auth'
import client from 'src/client'
import { getNavItems } from 'src/utils/general'
import { useUser } from 'src/hooks/useUser'
import { useQueryClient } from '@tanstack/react-query'

type LayoutProps = {
  children: ReactNode
}

export function Layout(props: LayoutProps) {
  const router = useRouter()
  const [loading, setLoading] = useAtom(loadingAtom)
  const [, setNavItems] = useAtom(navItemsAtom)
  const [, setRoleOptions] = useAtom(roleOptionsAtom)
  const [, setSelectedRole] = useAtom(selectedRoleAtom)
  const queryClient = useQueryClient()

  const meQuery = useUser()

  useEffect(() => {
    if (!router.isReady) {
      return
    }

    async function refreshToken() {
      try {
        type Data = {
          access_token: string
          expires: number
          refresh_token: string
        }

        type RefreshTokenResponse = {
          data: Data
        }

        const refreshToken = localStorage.getItem(authConfig.refreshTokenKeyName)
        if (!refreshToken) {
          if (router.pathname !== '/login') {
            router.push('/login')
            router.events.on('routeChangeComplete', () => setLoading(false))

            return
          }

          setLoading(false)

          return
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
            const response = await client.api.post<RefreshTokenResponse>('/auth/refresh', {
              refresh_token: localStorage.getItem(authConfig.refreshTokenKeyName),
              mode: 'json'
            })

            localStorage.setItem(authConfig.accessTokenKeyName, response.data.data.access_token)
            localStorage.setItem(authConfig.refreshTokenKeyName, response.data.data.refresh_token)
          }

          if (router.pathname === '/login') {
            router.push('/')
          }
        } else {
          const response = await client.api.post<RefreshTokenResponse>('/auth/refresh', {
            refresh_token: localStorage.getItem(authConfig.refreshTokenKeyName),
            mode: 'json'
          })

          localStorage.setItem(authConfig.accessTokenKeyName, response.data.data.access_token)
          localStorage.setItem(authConfig.refreshTokenKeyName, response.data.data.refresh_token)

          if (router.pathname === '/login') {
            router.push('/')
          }
        }
      } catch {
        try {
          await client.api.post('/auth/logout', {
            refresh_token: localStorage.getItem(authConfig.refreshTokenKeyName)
          })
        } catch {}
        await queryClient.invalidateQueries()

        localStorage.removeItem(authConfig.accessTokenKeyName)
        if (router.pathname !== '/login') {
          router.push('/login')
          router.events.on('routeChangeComplete', () => setLoading(false))

          return
        }

        setLoading(false)
      }
    }

    refreshToken()

    return () => {
      router.events.on('routeChangeComplete', () => setLoading(false))
    }
  }, [queryClient, router, setLoading])

  useEffect(() => {
    if (!meQuery.data?.data) {
      return
    }

    const roles =
      meQuery.data.data.roles.map(role => ({
        id: role.id,
        label: role.name
      })) ?? []

    const navItems = getNavItems({
      data: meQuery.data.data,
      roleIds: roles.map(role => role.id),
      selectedRoleId: roles[0].id,
      uiConfigs: []
    })

    setNavItems(navItems)

    const options =
      meQuery.data.data.roles.map(role => ({
        id: role.id,
        label: role.name,
        code: role.code
      })) ?? []

    setRoleOptions(options)
    setSelectedRole(options[0])

    setLoading(false)
  }, [meQuery.data?.data, router, setLoading, setNavItems, setRoleOptions, setSelectedRole])

  if (loading) {
    return <Spinner />
  }

  return <>{props.children}</>
}

export function getLayout(page: ReactNode) {
  return <Layout>{page}</Layout>
}
