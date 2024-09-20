import { Suspense, lazy } from 'react'
const SolutionsRoute = lazy(() => import('@/modules/routes'))

const Page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SolutionsRoute />
    </Suspense>
  )
}

export default Page
