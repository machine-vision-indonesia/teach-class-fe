import { lazy } from 'react'

const NotFound = lazy(() => import('@/modules/error/pages/404'))

const errorRoutes = [
  {
    loader: () => {
      console.log('loading error')
      return true
    },
    index: true,
    path: '/',
    element: <NotFound />
  }
]

export default errorRoutes
