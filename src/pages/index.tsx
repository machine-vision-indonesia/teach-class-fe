import { type NextPage } from 'next'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link'
import Image from 'next/image'
import NextLink from 'next/link'
import { hexToRGBA } from 'src/@core/utils/hex-to-rgba'
import { useGetProducts } from 'src/service/landing-page/useGetProducts'
import { CircularProgress } from 'src/components/atoms/circular-progress/CircularProgress'
import { env } from 'next-runtime-env'

const Home: NextPage = () => {
  const products = useGetProducts()

  if (products.isLoading) {
    return (
      <Box height='100%' display='flex' justifyContent='center' alignItems='center'>
        <CircularProgress />
      </Box>
    )
  }

  if (products.isError) {
    return (
      <Box height='100%' display='flex' justifyContent='center' alignItems='center'>
        <Typography component='p'>Something went wrong. Please try to refresh the page</Typography>
      </Box>
    )
  }

  return (
    <Box component='main' maxWidth='1204px' mx='auto' padding='40px 0 24px'>
      <Box width='100%' height='128px' display='flex' justifyContent='center'>
        <Box position='relative' sx={{ width: '198px', height: '100%' }}>
          <Image
            src='/images/machine-vision-with-label.png'
            fill
            sizes='100%'
            alt='Machine Vision with label'
            style={{ objectFit: 'cover', width: '100%' }}
          />
        </Box>
      </Box>

      <Box textAlign='center' marginTop='40px'>
        <Typography component='h1' fontSize='32px' color='#1E4480' fontWeight={700}>
          Machine Vision Data Platform
        </Typography>
        <Typography component='h2' fontSize='18px' color='#1E4480' marginTop='9px'>
          Choose one of the following of module
        </Typography>
      </Box>

      <Box display='flex' justifyContent='center' flexWrap='wrap' marginTop='32px' rowGap='40px'>
        {products.data.data.map(product => (
          <Link
            key={product.name}
            sx={{
              flexBasis: '33.333333%',
              display: 'flex',
              justifyContent: 'center'
            }}
            component={NextLink}
            href={product.main_page?.url ?? '/'}
          >
            <Box
              sx={{
                borderRadius: '8px',
                boxShadow: '2px 2px 8px 0px rgba(0, 0, 0, .16)',
                padding: '20px',
                width: '380px',
                height: '166px',
                position: 'relative',
                overflow: 'hidden',
                backgroundColor: product.background_color ?? '#005EFF'
              }}
            >
              <Box position='relative' zIndex={2}>
                <Typography component='h3' color='#F7F8FA' fontSize='28px' fontWeight={700} letterSpacing='0.56px'>
                  {product.name}
                </Typography>
                <Typography color='#FFFFFF' marginTop='5px' fontSize='14px' letterSpacing='0.28px' maxWidth='139px'>
                  {product.description}
                </Typography>
              </Box>

              {product.image ? (
                <Image
                  src={`${env('NEXT_PUBLIC_REST_API_URL')}/assets/${product.image}`}
                  width={270}
                  height={270}
                  alt='Admin'
                  style={{
                    maskImage: `linear-gradient(0deg, ${hexToRGBA(
                      product.background_color ?? '#005EFF',
                      0.5
                    )}, ${hexToRGBA(product.background_color ?? '#005EFF', 0.5)})`,
                    position: 'absolute',
                    right: '-12%',
                    bottom: '-46%',
                    zIndex: 1
                  }}
                />
              ) : null}
            </Box>
          </Link>
        ))}
      </Box>

      <Box width='100%' height='42px' display='flex' justifyContent='center' marginTop='64px'>
        <Box position='relative' sx={{ width: '311px', height: '100%' }}>
          <Image
            src='/images/machine-vision-credit.png'
            fill
            sizes='100%'
            alt='Powered by Machine Vision'
            style={{ objectFit: 'cover', width: '100%' }}
          />
        </Box>
      </Box>
    </Box>
  )
}

export default Home
