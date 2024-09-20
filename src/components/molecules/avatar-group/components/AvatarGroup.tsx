import React from 'react'
import { Box, Stack, useTheme } from '@mui/material'
import Popover from '@mui/material/Popover'
import { PropsAvatarGroup } from '../types/avatar-group.types'
import { Avatar } from '@/components/atoms/avatar'
import { MvTypography } from '@/components/atoms/mv-typography'
import { getFontSize } from '../utils'

/**
 *
 * Avatar Group adalah komponen dalam antarmuka pengguna yang digunakan untuk menampilkan serangkaian avatar atau gambar profil secara bersamaan. Komponen ini berguna untuk menampilkan daftar pengguna, anggota tim, atau kontak dengan cara yang ringkas dan mudah dikenali. Avatar Group sering digunakan dalam aplikasi sosial, kolaborasi tim, dan manajemen pengguna.
 *
 */
export const AvatarGroup = ({ size = 'lg', avatars = [] }: PropsAvatarGroup) => {
  const theme = useTheme()
  const [anchorEl, setAnchorEl] = React.useState<HTMLDivElement | null>(null)

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)
  const id = open ? 'simple-popover' : undefined

  const avatarsSplitted = avatars.length > 4 ? avatars.slice(0, 4) : []
  const avatarsSplittedEnd = avatars.length > 4 ? avatars.slice(4) : []

  return (
    <Stack direction='row'>
      {avatarsSplitted.length > 0
        ? avatarsSplitted.map((avatar, index) =>
            index === 3 ? (
              <Box
                key={index}
                aria-describedby={id}
                sx={{
                  position: 'relative',
                  marginLeft: '-15px',
                  zIndex: index,
                  overflow: 'hidden',
                  cursor: 'pointer'
                }}
                onClick={handleClick}
                borderRadius='100px'
              >
                <Box
                  width='100%'
                  height='100%'
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    zIndex: index + 1,
                    backgroundColor: 'rgba(0, 0, 0, 0.3)'
                  }}
                  borderRadius='100px'
                />
                <MvTypography
                  typeSize={'PX'}
                  size={getFontSize(size)}
                  sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    zIndex: index + 2
                  }}
                  color={theme.colorToken.text.neutral.inverted}
                >
                  {avatarsSplittedEnd.length}+
                </MvTypography>
                <Box
                  width='100%'
                  height='100%'
                  sx={{
                    position: 'relative',
                    zIndex: index
                  }}
                >
                  <Avatar
                    type={avatar.type}
                    src={avatar.src}
                    alt={avatar.alt}
                    displayName={avatar.displayName}
                    isAsync={false}
                    size={size}
                  />
                </Box>
              </Box>
            ) : (
              <Box
                sx={{
                  position: 'relative',
                  marginLeft: '-15px',
                  zIndex: index
                }}
              >
                <Avatar
                  key={index}
                  type={avatar.type}
                  src={avatar.src}
                  alt={avatar.alt}
                  displayName={avatar.displayName}
                  isAsync={false}
                  size={size}
                />
              </Box>
            )
          )
        : avatars.length > 0 &&
          avatars.map((avatar, index) => (
            <Box
              key={index}
              sx={{
                position: 'relative',
                marginLeft: '-15px',
                zIndex: index
              }}
            >
              <Avatar
                key={index}
                type={avatar.type}
                src={avatar.src}
                alt={avatar.alt}
                displayName={avatar.displayName}
                isAsync={false}
                size={size}
              />
            </Box>
          ))}
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
        {avatarsSplittedEnd &&
          avatarsSplittedEnd.map((avatar, index) => (
            <Box
              key={index}
              display='flex'
              alignItems='center'
              padding={2}
              paddingRight={3}
              gap={2}
              minWidth={150}
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
              <Avatar type={avatar.type} src={avatar.src} displayName={avatar.displayName} isAsync={false} size='xs' />
              <MvTypography typeSize={'PX'} size={'LABEL_MD_NORMAL'}>
                {avatar.displayName || 'Avatar'}
              </MvTypography>
            </Box>
          ))}
      </Popover>
    </Stack>
  )
}
