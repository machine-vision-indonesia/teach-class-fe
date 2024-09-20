import zes1dmsRoutes from '@/modules/dms/routes'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3'
import { useRouter } from 'next/router'
import { Suspense, lazy } from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

const SolutionsLayout = lazy(() => import('@/modules'))
const NotFound = lazy(() => import('@/modules/error/pages/404'))

function SolutionsRoute() {
  const router = useRouter()

  const routes = createBrowserRouter([
    {
      path: 'solutions',
      element: <SolutionsLayout />,
      children: [
        {
          path: 'dms',
          children: zes1dmsRoutes
        }
      ]
    },
    {
      path: '*',
      loader: () => {
        return router.push('/404')
      },
      element: <NotFound />
    }
  ])

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <RouterProvider router={routes} />
      </LocalizationProvider>
    </Suspense>
  )
}

export default SolutionsRoute
