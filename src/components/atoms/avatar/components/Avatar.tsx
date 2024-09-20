import MuiAvatar from '@mui/material/Avatar'
import React from 'react'
import { PropsAvatar } from '../types/avatar.types'
import { Box, Typography } from '@mui/material'
import { GetUser, IUser } from '../services/fetchData.service'
import { env } from 'next-runtime-env'
import { Icon } from '@iconify/react'
import Popover from '@mui/material/Popover'
import { MvTypography } from '../../mv-typography'

/**
 *
 * Komponen Avatar berfungsi sebagai representasi visual dari seorang pengguna, memberikan identifikasi yang cepat dan mudah dikenali. Digunakan dalam berbagai konteks antarmuka, seperti info pengguna, bagian komentar, dan aplikasi pesan. Jika perlu menampilkan beberapa avatar pengguna sekaligus, silakan gunakan Avatar Group.
 *
 */
export const Avatar = ({
  size = 'md',
  src,
  alt = 'avatar',
  type = 'placeholder',
  isAsync = false,
  userId,
  displayName = 'Machine Vision'
}: PropsAvatar) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)
  const id = open ? 'simple-popover' : undefined

  const getWidthHeightSize = () => {
    switch (size) {
      case 'xs':
        return 24
      case 'sm':
        return 32
      case 'md':
        return 40
      case 'lg':
        return 48
      case 'xl':
        return 64
      default:
        return 32
    }
  }

  const getFontSize = () => {
    switch (size) {
      case 'xs':
        return 'HELPER_TEXT_SM'
      case 'sm':
        return 'LABEL_MD_BOLDEST'
      case 'md':
        return 'LABEL_LG_BOLDEST'
      case 'lg':
        return 'TITLE_SM'
      case 'xl':
        return 'TITLE_MD'
      default:
        return 'TITLE_SM'
    }
  }

  const getIconSize = () => {
    switch (size) {
      case 'xs':
        return 12
      case 'sm':
        return 20
      case 'md':
        return 24
      case 'lg':
        return 32
      case 'xl':
        return 44
      default:
        return 32
    }
  }

  const GetUserQuery = GetUser<IUser>({ userId: userId || '' })

  const sizeUsed = getWidthHeightSize()

  if (type === 'placeholder') {
    return (
      <Box
        height={sizeUsed}
        width={sizeUsed}
        display='flex'
        alignItems='center'
        justifyContent='center'
        sx={{
          borderRadius: '100%',
          bgcolor: '#E6EFFF'
        }}
        color='#005EFF'
      >
        <Icon fontSize={getIconSize()} icon='tabler:user' />
      </Box>
    )
  }

  if (type === 'initial') {
    let initialName = 'MV'

    const getInitials = (str: string) => {
      const matches = str.match(/\b\w/g)
      return matches ? matches.slice(0, 2).join('') : ''
    }

    if (displayName) {
      initialName = getInitials(displayName)
    }

    return (
      <Box
        height={sizeUsed}
        width={sizeUsed}
        display='flex'
        alignItems='center'
        justifyContent='center'
        sx={{
          borderRadius: '100%',
          bgcolor: '#E6EFFF'
        }}
      >
        <MvTypography
          color='#005EFF'
          fontWeight='500'
          sx={{ textTransform: 'uppercase' }}
          typeSize={'PX'}
          size={getFontSize()}
        >
          {initialName}
        </MvTypography>
      </Box>
    )
  }

  if (type === 'image') {
    if (isAsync && userId) {
      if (GetUserQuery.data?.data?.avatar) {
        const url = GetUserQuery.data?.data?.avatar

        return (
          <MuiAvatar
            sx={{ height: `${sizeUsed}px`, width: `${sizeUsed}px` }}
            src={`${env('NEXT_PUBLIC_REST_API_URL')}/assets/${
              url
            }?preview=true&access_token=${localStorage.getItem('accessToken')}`}
            alt={alt}
          />
        )
      } else {
        return (
          <Box
            height={sizeUsed}
            width={sizeUsed}
            display='flex'
            alignItems='center'
            justifyContent='center'
            sx={{
              borderRadius: '100%',
              bgcolor: '#E6EFFF'
            }}
            color='#005EFF'
          >
            <Icon fontSize={getIconSize()} icon='tabler:user' />
          </Box>
        )
      }
    } else if (src) {
      return <MuiAvatar sx={{ height: `${sizeUsed}px`, width: `${sizeUsed}px` }} src={src} alt={alt} />
    } else {
      return (
        <Box
          height={sizeUsed}
          width={sizeUsed}
          display='flex'
          alignItems='center'
          justifyContent='center'
          sx={{
            borderRadius: '100%',
            bgcolor: '#E6EFFF'
          }}
          color='#005EFF'
        >
          <Icon fontSize={getIconSize()} icon='tabler:user' />
        </Box>
      )
    }
  }

  if (type === 'more') {
    if (src) {
      return (
        <>
          <Box
            height={sizeUsed}
            width={sizeUsed}
            display='flex'
            alignItems='center'
            justifyContent='center'
            sx={{
              '&:hover': {
                cursor: 'pointer'
              }
            }}
            border='none'
            borderRadius='100%'
            position='relative'
            component='button'
            overflow='hidden'
            onClick={handleClick}
          >
            <Box
              width='100%'
              height='100%'
              sx={{
                backgroundColor: 'rgba(0, 0, 0, 0.3)',
                position: 'absolute',
                zIndex: 3,
                transition: '0.3s',
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.4)'
                },
                '&:active': {
                  backgroundColor: 'rgba(0, 0, 0, 0.5)'
                }
              }}
            />
            <MvTypography
              color='#FEFEFE'
              fontWeight={500}
              sx={{
                position: 'absolute',
                zIndex: 4
              }}
              typeSize={'PX'}
              size={getFontSize()}
            >
              5+
            </MvTypography>
            <MuiAvatar sx={{ height: `${sizeUsed}px`, width: `${sizeUsed}px` }} src={src} alt={alt} />
          </Box>
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left'
            }}
          >
            <Box
              display='flex'
              alignItems='center'
              padding={4}
              gap={2}
              sx={{
                transition: '0.03s',
                '&:hover': {
                  cursor: 'pointer',
                  backgroundColor: 'rgba(0, 0, 0, 0.05)'
                },
                '&:active': {
                  backgroundColor: 'rgba(0, 0, 0, 0.1)'
                }
              }}
            >
              <MuiAvatar sx={{ height: 32, width: 32 }} src={src} alt={alt} />
              <Typography>Frans AHW</Typography>
            </Box>
          </Popover>
        </>
      )
    } else {
      return (
        <Box
          height={sizeUsed}
          width={sizeUsed}
          display='flex'
          alignItems='center'
          justifyContent='center'
          sx={{
            borderRadius: '100%'
          }}
        >
          <MuiAvatar sx={{ height: `${sizeUsed}px`, width: `${sizeUsed}px` }} src={src} alt={alt} />
        </Box>
      )
    }
  }
}
