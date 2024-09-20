import Popover from '@mui/material/Popover'
import Box from '@mui/material/Box'
import React, { PropsWithChildren } from 'react'
import { Stack, SxProps, Theme } from '@mui/material'
import { PropsTooltip } from '../types/tooltip.types'
import { MvTypography } from '../../mv-typography'
import { bottom, bottomSm, left, leftSm, right, rightSm, top, topSm } from '../styles/tooltip.styles'

/**
 * Tooltip adalah elemen UI (User Interface) kecil yang muncul ketika pengguna mengarahkan kursor mouse atau
 * pointer ke suatu objek atau elemen di antarmuka pengguna, seperti tombol, ikon, atau teks. Tujuan utama
 * tooltip adalah memberikan informasi tambahan atau penjelasan singkat tentang objek yang sedang diarahkan,
 * yang mungkin tidak terlihat jelas atau tidak diketahui oleh pengguna.
 */
export const Tooltip = ({ id, children, renderContent, variant, style, size }: PropsWithChildren<PropsTooltip>) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null)
  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handlePopoverClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)
  const variantUsed = variant ?? 'bottom'
  const styleUsed = style ?? 'basic'

  const generateAnchor = () => {
    switch (variantUsed) {
      case 'bottom':
        return { anchorV: 'bottom', anchorH: 'center', transV: 'top', transH: 'center' }
      case 'left':
        return { anchorV: 'center', anchorH: 'left', transV: 'center', transH: 'right' }
      case 'right':
        return { anchorV: 'center', anchorH: 'right', transV: 'center', transH: 'left' }
      case 'top':
        return { anchorV: 'top', anchorH: 'center', transV: 'bottom', transH: 'center' }
      default:
        return undefined
    }
  }

  const getFlexDirection = () => {
    switch (variantUsed) {
      case 'bottom':
        return 'column'
      case 'left':
        return 'row-reverse'
      case 'right':
        return 'row'
      case 'top':
        return 'column-reverse'
      default:
        return undefined
    }
  }

  const generateSx = (): SxProps<Theme> | undefined => {
    switch (variantUsed) {
      case 'bottom':
        if (size == 'small') {
          return bottomSm
        } else {
          return bottom
        }
      case 'left':
        if (size == 'small') {
          return leftSm
        } else {
          return left
        }
      case 'right':
        if (size == 'small') {
          return rightSm
        } else {
          return right
        }
      case 'top':
        if (size == 'small') {
          return topSm
        } else {
          return top
        }
      default:
        return undefined
    }
  }

  const getSize = () => {
    switch (size) {
      case 'small':
        return 'BODY_SM_NORMAL'
      case 'medium':
        return 'BODY_MD_NORMAL'
      case 'large':
        return 'BODY_LG_NORMAL'
      default:
        return 'BODY_SM_NORMAL'
    }
  }

  const postition = generateAnchor()

  return (
    <>
      <Box
        aria-owns={open ? id : undefined}
        aria-haspopup='true'
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
        display='flex'
      >
        <>{children}</>
      </Box>
      <Popover
        PaperProps={{
          style: {
            backgroundColor: 'transparent',
            boxShadow: 'none',
            borderRadius: 0
          }
        }}
        id={id}
        sx={{ pointerEvents: 'none' }}
        open={open ?? false}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: postition?.anchorV as any,
          horizontal: postition?.anchorH as any
        }}
        transformOrigin={{
          vertical: postition?.transV as any,
          horizontal: postition?.transH as any
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <Stack flexDirection={getFlexDirection()}>
          {styleUsed == 'arrow' && <Box sx={generateSx()} />}
          <Box borderRadius='6px' bgcolor={thm => thm.palette.text.secondary} px='14px' py='4px'>
            <MvTypography size={getSize()} typeSize='PX' color={thm => thm.palette.secondary.contrastText}>
              {renderContent}
            </MvTypography>
          </Box>
        </Stack>
      </Popover>
    </>
  )
}
