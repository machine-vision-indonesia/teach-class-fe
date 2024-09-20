import { Icon } from '@iconify/react/dist/iconify.js'
import { Box, useTheme } from '@mui/material'
import { env } from 'next-runtime-env'
import Image from 'next/image'
import React, { FC } from 'react'
import { IImageListPerview } from '../types/imageListPreview.types'

export const ImageListPreview: FC<IImageListPerview> = ({ imageSource, onDelete }) => {
  const { colorToken } = useTheme()
  const BASE_URL: string | undefined = env('NEXT_PUBLIC_REST_API_URL')

  return (
    <Box position={'relative'} width={'12rem'} height={'10rem'} display={'flex'}>
      <Image
        src={`${BASE_URL}/assets/${imageSource}`}
        style={{
          borderRadius: '4px'
        }}
        objectFit='cover'
        layout='fill'
        alt='image-preview'
        loading='lazy'
        property='true'
      />

      <Box width={'100%'} padding={'6px'} display={'flex'} flexDirection={'row-reverse'} zIndex={10}>
        <Box
          sx={{
            cursor: 'pointer',
            '&:hover': {
              bgcolor: colorToken.background.neutral.hover,
              transition: '0.5s'
            }
          }}
          display={'flex'}
          alignItems={'center'}
          borderRadius={'100%'}
          height={'25px'}
          width={'25px'}
          bgcolor={colorToken.background.neutral.normal}
          onClick={onDelete}
        >
          <Icon icon='basil:cross-solid' color={colorToken.text.primary.normal} fontSize={'24px'} />
        </Box>
      </Box>
    </Box>
  )
}
