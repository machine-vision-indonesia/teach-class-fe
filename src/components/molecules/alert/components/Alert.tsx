import { MvTypography } from '@/components/atoms/mv-typography'
import { Icon } from '@iconify/react'
import { Box, Button, useTheme } from '@mui/material'
import Stack from '@mui/material/Stack'
import React from 'react'
import { PropsAlert } from '../types/alertType'

/**
 * Alert dapat memberitahu pengguna tentang informasi yang penting atau yang memerlukan tindakan segera. Alert dapat berupa pesan pop-up, banner informasi, atau notifikasi dalam bentuk lain yang mudah dilihat dan diakses oleh pengguna.
 */

export const Alert = ({ title, variant = 'success', content, size, children }: PropsAlert) => {
  const colorUsed = variant ?? 'success'
  const theme = useTheme()

  function getIcon() {
    switch (variant) {
      case 'success':
        return 'tabler:check'
      case 'danger':
        return 'tabler:alert-triangle'
      case 'warning':
        return 'tabler:alert-circle'
      case 'primary':
        return 'tabler:info-circle'
    }
  }

  return (
    <Stack
      py='12px'
      px='14px'
      borderRadius='6px'
      direction='row'
      alignItems={content ? 'start' : 'center'}
      bgcolor={theme.colorToken.background[colorUsed].subtlest}
      spacing='12px'
      border={`1px solid`}
      borderColor={theme.colorToken.border[colorUsed].subtle}
    >
      <Stack
        alignItems='center'
        justifyContent='center'
        width='20px'
        height='20px'
        minWidth='20px'
        minHeight='20px'
        flexShrink={0}
        borderRadius='10px'
        bgcolor={`${colorUsed}.main`}
      >
        <Icon color={theme.colorToken.icon.neutral.inverted} icon={getIcon()} fontSize='16px' />
      </Stack>
      <Stack spacing='2px' flexGrow={1}>
        <MvTypography size={size == 'small' ? 'LABEL_MD_BOLDEST' : 'LABEL_LG_BOLDEST'} typeSize='PX'>
          {title}
        </MvTypography>
        <MvTypography size={size == 'small' ? 'LABEL_SM_NORMAL' : 'LABEL_MD_NORMAL'} typeSize='PX'>
          {content}
        </MvTypography>
      </Stack>
      {children && <Stack alignSelf={'center'}>{children}</Stack>}
    </Stack>
  )
}
