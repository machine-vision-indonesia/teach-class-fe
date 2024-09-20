import React, { FC } from 'react'
import { Icon } from '@iconify/react'
import { Box, IconButton, CircularProgress } from '@mui/material'
import { imagePreview } from '../types/UploadFile.type'
import { MvTypography } from '@/components/atoms/mv-typography'
import Image from 'next/image'
import { useTheme } from '@mui/material'

export const ImagePreview: FC<imagePreview> = ({
  image,
  totalImages,
  width = 103,
  percentage,
  handleDelete,
  isError
}) => {
  const theme = useTheme()

  return (
    <Box width={totalImages > 1 ? 103 : width} height={totalImages > 1 ? 80 : 300} position='relative'>
      <Image alt='images' src={image} fill={true} objectFit='cover' priority={true} style={{ borderRadius: 4 }} />
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: percentage === 100 ? 'trasparent' : 'rgba(0, 0, 0, 0.6)', // need rgba for opacity
          borderRadius: 1
        }}
      />
      <Box
        sx={{
          display: percentage === 100 ? 'none' : 'flex',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          opacity: 1
        }}
      >
        {isError ? (
          <Icon icon='ph:warning' color={theme.palette.common.white} fontSize='1.5rem' />
        ) : (
          <CircularProgress size='1.5rem' sx={{ color: theme.palette.common.white }} />
        )}

        <MvTypography
          textAlign='center'
          size='BODY_SM_BOLDEST'
          typeSize='PX'
          marginTop={2}
          color={theme.palette.common.white}
        >
          {percentage}%
        </MvTypography>
        <MvTypography
          textAlign='center'
          size='BODY_SM_NORMAL'
          typeSize='PX'
          marginTop={1}
          color={theme.palette.common.white}
        >
          {isError ? 'Uploading Failed' : 'Uploading'}
        </MvTypography>
      </Box>
      <IconButton
        // disabled={percentage < 100}
        sx={{
          position: 'absolute',
          top: 5,
          right: 5,
          backgroundColor: theme.palette.common.white,
          '&:hover': {
            backgroundColor: theme.palette.common.white
          }
        }}
        size='small'
        onClick={handleDelete}
      >
        <Icon icon='maki:cross' color={theme.palette.primary.main} fontSize={'12px'} />
      </IconButton>
    </Box>
  )
}
