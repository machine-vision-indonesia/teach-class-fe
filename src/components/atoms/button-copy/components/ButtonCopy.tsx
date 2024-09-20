import React from 'react'
import { Box, IconButton, useTheme } from '@mui/material'
import { Icon } from '@iconify/react'
import { ButtonCopyProps } from '../types/buttonCopy.type'
import { Tooltip } from '../../tooltip'

/**
 * Button copy dapat membantu pengguna untuk menyalin teks ke clipboard dengan sekali klik. Button copy memiliki variant contained ataupun icon only
 */
export const ButtonCopy = ({
  variant = 'icon-only',
  color = 'warning',
  title,
  value,
  disabled = false
}: ButtonCopyProps) => {
  const theme = useTheme()

  function getColor() {
    switch (color) {
      case 'primary':
        return theme.colorToken.background.primary.normal
      case 'success':
        return theme.colorToken.background.success.normal
      case 'error':
        return theme.colorToken.background.danger.normal
      case 'warning':
        return theme.colorToken.background.warning.normal
    }
  }

  function getVariant() {
    switch (variant) {
      case 'contained':
        return getColor()
      case 'icon-only':
        return 'transparent'
    }
  }

  const handleCopy = () => {
    const textToCopy = value
    navigator.clipboard.writeText(textToCopy)
  }

  return (
    <Box>
      <Tooltip id='button-copy' renderContent={`Copy ${title}`} size='medium' variant='top' style='arrow'>
        <Box
          sx={{
            backgroundColor:
              disabled && variant == 'icon-only'
                ? getVariant()
                : disabled && variant == 'contained'
                  ? theme.colorToken.background.neutral.disabled
                  : getVariant(),
            borderRadius: '4px',
            cursor: disabled ? 'default' : 'pointer'
          }}
        >
          <IconButton
            disabled={disabled}
            onClick={handleCopy}
            aria-label='copy'
            sx={{
              color: variant == 'icon-only' ? getColor() : 'white'
            }}
          >
            <Icon icon={variant == 'icon-only' ? 'ion:copy-outline' : 'ion:copy'} fontSize={20} />
          </IconButton>
        </Box>
      </Tooltip>
    </Box>
  )
}
