import React, { useEffect, useState } from 'react'
import NextImage from 'next/image'
import { env } from 'next-runtime-env'
import { IShowImageAsyncProps } from '../types/showImageAsync.types'
import { Box, Grid, useTheme } from '@mui/material'
import { CircularProgress } from '@mui/material'
import { MvTypography } from '../../mv-typography'

const ShowImageAsync = ({ imageId, width = 100, height = 100 }: IShowImageAsyncProps) => {
  const BASE_URL: string | undefined = env('NEXT_PUBLIC_REST_API_URL')
  const [loading, setLoading] = useState<boolean>(false)
  const [imageSrc, setImageSrc] = useState<string | null>(null)
  const theme = useTheme()

  useEffect(() => {
    const loadImage = async () => {
      if (imageId) {
        setLoading(true)
        try {
          const url = `${BASE_URL}/assets/${imageId}?access_token=${localStorage.getItem('accessToken')}`

          setImageSrc(null)
          const img = new Image()
          img.src = url

          img.onload = () => {
            setImageSrc(url)
            setLoading(false)
          }

          img.onerror = () => {
            setImageSrc(null)
            setLoading(false)
          }
        } catch (error) {
          setImageSrc(null)
          setLoading(false)
        }
      }
    }

    loadImage()
  }, [imageId, BASE_URL])

  return (
    <div>
      {loading ? (
        <Grid container direction='column' alignItems='center' padding={4}>
          <CircularProgress />
          <MvTypography size='BODY_LG_BOLDEST' noWrap typeSize={'PX'} mt={8} mb={2}>
            Loading....
          </MvTypography>
        </Grid>
      ) : imageId ? (
        <NextImage src={imageSrc?.toString() || ''} alt='consultant-logo' width={width} height={height} />
      ) : (
        <Box
          sx={{
            backgroundColor: theme.colorToken.background.neutral.subtle,
            height,
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <MvTypography size='BODY_LG_BOLDEST' noWrap typeSize={'PX'}>
            Image Not Found
          </MvTypography>
        </Box>
      )}
    </div>
  )
}

export default ShowImageAsync
