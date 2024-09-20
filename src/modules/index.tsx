import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

const IndexCoba = () => {
  const router = useRouter()
  const navigate = useNavigate()

  const { query } = router

  useEffect(() => {
    if (query?.check) {
      navigate(query.check as string)
    }
  }, [router])

  return (
    <>
      <Outlet />
    </>
  )
}

export default IndexCoba
