import { useRouter } from 'next/router'
// ** React Imports
import { ReactNode, useEffect, useState } from 'react'
import Spinner from 'src/@core/components/spinner'

// ** Next Import
import Link from 'next/link'

import Box, { BoxProps } from '@mui/material/Box'
// ** MUI Components
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Styled Components
const BoxWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    width: '90vw'
  }
}))

const Img = styled('img')(({ theme }) => ({
  [theme.breakpoints.down('lg')]: {
    height: 450,
    marginTop: theme.spacing(10)
  },
  [theme.breakpoints.down('md')]: {
    height: 400
  },
  [theme.breakpoints.up('lg')]: {
    marginTop: theme.spacing(20)
  }
}))

const Error404 = () => {
  const router = useRouter()
  const { asPath, pathname } = router
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (pathname === '/404') {
      // Redirect to another page if the condition is met
      // router.push('/solutions', { query: asPath });
      if (asPath.includes('solutions')) {
        setIsLoading(true)
        const removeBeforeSolutions = (input: string): string => {
          const pattern = /.*(?=\/solutions)/
          return input.replace(pattern, '')
        }
        console.log('removeBeforeSolutions(asPath)', removeBeforeSolutions(asPath))

        router.push({ pathname: '/solutions', query: { check: removeBeforeSolutions(asPath) } })
      } else {
        setIsLoading(false)
      }
    }
  }, [router])

  return (
    <Box className='content-center'>
      {isLoading && (
        <>
          <Box sx={{ p: 5, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
            <BoxWrapper>
              <Spinner />
            </BoxWrapper>
          </Box>
        </>
      )}
      {!isLoading && (
        <Box sx={{ p: 5, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          <BoxWrapper>
            <Typography variant='h4' sx={{ mb: 1.5 }}>
              Page Not Found :(
            </Typography>
            <Typography sx={{ mb: 6, color: 'text.secondary' }}>
              Oops! 😖 The requested URL was not found on this server.
            </Typography>
            <Button href='/' component={Link} variant='contained'>
              Back to Home
            </Button>
          </BoxWrapper>
          <Img height='500' alt='error-illustration' src='/images/pages/404.png' />
        </Box>
      )}
    </Box>
  )
}

Error404.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

export default Error404
