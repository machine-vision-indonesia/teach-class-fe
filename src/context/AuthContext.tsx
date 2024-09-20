// ** React Imports
import { createContext, useEffect, useState, ReactNode } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** Axios
import axios from 'axios'

// ** Config
import authConfig from 'src/configs/auth'

// ** Types
import type { AuthValuesType, RegisterParams, LoginParams, ErrCallbackType } from './types'
import client from 'src/client'
import type { GetCurrentUserResponse } from 'src/types/directus/current-user'
import { useAtom } from 'jotai'
import { getNavItems, getPageCapabilities } from 'src/utils/general'
import { type CapabilityWithPage, capabilitiesAtom, navItemsAtom, roleOptionsAtom, selectedRoleAtom } from 'src/atoms'
import { env } from 'next-runtime-env'

// ** Defaults
const defaultProvider: AuthValuesType = {
  user: null,
  loading: true,
  setUser: () => null,
  setLoading: () => Boolean,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  register: () => Promise.resolve()
}

const AuthContext = createContext(defaultProvider)

type Props = {
  children: ReactNode
}

const AuthProvider = ({ children }: Props) => {
  // ** States
  const [user, setUser] = useState(defaultProvider.user)
  const [loading, setLoading] = useState<boolean>(defaultProvider.loading)
  const [, setNavItems] = useAtom(navItemsAtom)
  const [, setRoleOptions] = useAtom(roleOptionsAtom)
  const [, setCapabilities] = useAtom(capabilitiesAtom)
  const [, setSelectedRole] = useAtom(selectedRoleAtom)

  // ** Hooks
  const router = useRouter()

  useEffect(() => {
    const initAuth = async () => {
      try {
        const response = await client.api.get<GetCurrentUserResponse>('/user/me')
        setUser(response.data.data)
        window.localStorage.setItem('userData', JSON.stringify(response.data.data))

        if (response.data.data && router.pathname === '/login') {
          router.push('/')

          return
        }

        const roles = response.data.data.roles.map(role => ({
          id: role.id,
          label: role.name
        }))

        const navItems = getNavItems({
          data: response.data.data,
          roleIds: roles.map(role => role.id),
          selectedRoleId: roles[0].id
        })
        setNavItems(navItems)

        const options = response.data.data.roles.map(role => ({
          id: role.id,
          label: role.name,
          code: role.code
        }))

        setRoleOptions(options)
        setSelectedRole(options[0])

        const pages = [
          ...response.data.data.modules.flatMap(module => module.clusters).flatMap(cluster => cluster.pages),
          ...response.data.data.general_pages
        ]

        const capabilities = pages.flatMap(page => page.capabilities)

        const capabilityWithPages: CapabilityWithPage[] = []
        for (const capability of capabilities) {
          const relatedPage = pages.find(page => page.id === capability.page)
          if (!relatedPage) {
            continue
          }

          capabilityWithPages.push({
            ...capability,
            page: relatedPage
          })
        }

        setCapabilities(capabilityWithPages)

        try {
          type GetPageStatusResponse = {
            data: Page[]
          }

          type Page = {
            status: boolean
          }

          const getPageStatus = await client.api.get<GetPageStatusResponse>('/items/mt_pages', {
            params: {
              fields: 'status',
              filter: {
                url: {
                  _eq: router.pathname
                }
              }
            }
          })

          const pageCapabilities = getPageCapabilities({ capabilities: capabilityWithPages, pathname: router.pathname })
          if (
            (!pageCapabilities.length || !getPageStatus.data.data.length || !getPageStatus.data.data[0].status) &&
            router.pathname !== '/not-found'
          ) {
            router.push('/not-found')

            return
          }
        } catch {
          if (router.pathname !== '/not-found') {
            router.push('/not-found')

            return
          }
        }

        setLoading(false)
      } catch {
        if (router.pathname !== '/login') {
          router.push('/login')
        }
      }
    }

    if (!router.isReady) {
      return
    }

    initAuth()

    router.events.on('routeChangeComplete', () => setLoading(false))

    return () => {
      router.events.on('routeChangeComplete', () => setLoading(false))
    }
  }, [router, setCapabilities, setNavItems, setRoleOptions, setSelectedRole])

  const handleLogin = async (params: LoginParams, errorCallback?: ErrCallbackType) => {
    try {
      const authService = env('NEXT_PUBLIC_AUTH_DEFAULT') || 'DATACORE'

      if (authService === 'DATACORE') {
        const body = {
          grant_type: 'password',
          client_id: 'client1',
          username: 'anang',
          password: 'Laniuslab123!'
        }

        await client.api.post('connect/token', body)
      } else if (authService === 'DIRECTUS') {
        const body = {
          email: params.email,
          isRemember: true,
          password: params.password
        }

        await client.api.post('auth/login', body)
      }

      const storedToken = window.localStorage.getItem(authConfig.accessTokenKeyName)!
      if (storedToken) {
        setLoading(true)

        try {
          const response = await client.api.get<GetCurrentUserResponse>('/user/me')
          setUser(response.data.data)
          window.localStorage.setItem('userData', JSON.stringify(response.data.data))
        } catch {}

        setLoading(false)
      }

      const returnUrl = router.query.returnUrl as string
      const redirectURL = returnUrl && returnUrl !== '/' ? returnUrl : '/'
      router.replace(redirectURL)
    } catch (err: any) {
      if (errorCallback) errorCallback(err)
    }
  }

  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('userData')
    window.localStorage.removeItem(authConfig.accessTokenKeyName)
    router.push('/login')
    setNavItems([])
    setRoleOptions([])
    setSelectedRole(null)
    setCapabilities([])
  }

  const handleRegister = (params: RegisterParams, errorCallback?: ErrCallbackType) => {
    axios
      .post(authConfig.registerEndpoint, params)
      .then(res => {
        if (res.data.error) {
          if (errorCallback) errorCallback(res.data.error)
        } else {
          handleLogin({ email: params.email, password: params.password })
        }
      })
      .catch((err: { [key: string]: string }) => (errorCallback ? errorCallback(err) : null))
  }

  const values = {
    user,
    loading,
    setUser,
    setLoading,
    login: handleLogin,
    logout: handleLogout,
    register: handleRegister
  }

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}

export { AuthContext, AuthProvider }
