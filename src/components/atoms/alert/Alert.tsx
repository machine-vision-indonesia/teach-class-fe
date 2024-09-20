import { Icon } from '@iconify/react'
import { useTheme } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import React, { ReactNode } from 'react'

export interface PropsAlert {
  icon?: string
  title: string
  content?: ReactNode | string
  variant?: 'outlined' | 'contained'
  color?: 'info' | 'accent' | 'error' | 'warning' | 'success'
  onClose?: () => void
}
export const Alert = ({ icon, title, variant = 'contained', color = 'success', content, onClose }: PropsAlert) => {
  const variantUsed = variant ?? 'contained'
  const colorUsed = color ?? 'success'
  const { palette } = useTheme()

  return (
    <Stack
      py='12px'
      px='14px'
      borderRadius='6px'
      direction='row'
      alignItems={content ? 'start' : 'center'}
      bgcolor={variantUsed == 'outlined' ? 'transparent' : `${colorUsed}.100`}
      spacing='10px'
      border={variantUsed == 'outlined' ? `2px solid` : `1px solid`}
      borderColor={variantUsed == 'outlined' ? `${colorUsed}.main` : `${colorUsed}.200`}
    >
      {icon && (
        <Stack
          alignItems='center'
          justifyContent='center'
          borderRadius='6px'
          width={content ? '34px' : '26px'}
          height={content ? '34px' : '26px'}
          bgcolor={`${colorUsed}.main`}
        >
          <Icon color={palette.background.paper} icon={icon} fontSize={content ? '22px' : '18px'} />
        </Stack>
      )}
      <Stack spacing='12px' flexGrow={1}>
        <Typography noWrap variant={content ? 'h5' : 'labelMd'} color='text.secondary'>
          {title}
        </Typography>
        {typeof content == 'string' && content != '' ? (
          <Typography variant='labelMd'>{content}</Typography>
        ) : (
          <>{content}</>
        )}
      </Stack>
      {
        onClose &&
        <IconButton
          sx={{ color: `${colorUsed}.main` }}
          size='small'
          color='inherit'
          aria-label='close'
          onClick={onClose}
        >
          <Icon strokeWidth={2.5} icon='tabler:x' fontSize='16px' fontWeight={700} />
        </IconButton>
      }
    </Stack>
  )
}
