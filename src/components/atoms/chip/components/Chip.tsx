import { Icon } from '@iconify/react'
import { Box, useTheme } from '@mui/material'
import MuiChip, { type ChipProps } from '@mui/material/Chip'
import React, { useState } from 'react'
import { MvTypography } from '../../mv-typography'
import { PropsMvChip } from '../types/chip.types'

export const Chip = ({
  shape = 'circular',
  onClick = () => {},
  onDelete,
  size,
  avatar,
  ...props
}: PropsMvChip & Omit<ChipProps, 'color' | 'variant' | 'sx' | 'component' | 'deleteIcon' | 'children'>) => {
  const theme = useTheme()
  const [active, setActive] = useState(false)
  const [clicked, setClick] = useState(false)

  const bgStyle = () => {
    if (active || clicked) {
      return theme.colorToken.background.primary.normal
    } else {
      return undefined
    }
  }

  const bgStyleHover = () => {
    if (!clicked) {
      return theme.colorToken.background.primary.hover
    } else {
      return theme.colorToken.background.primary.normal + '95 !important'
    }
  }

  const textStyle = () => {
    if (active || clicked) {
      return theme.colorToken.text.neutral.inverted
    } else {
      return undefined
    }
  }

  return (
    <MuiChip
      variant={'outlined'}
      onMouseDown={() => setActive(true)}
      onMouseUp={() => setActive(false)}
      onClick={() => {
        onClick()
        setClick(!clicked)
      }}
      onDelete={onDelete}
      avatar={avatar ? <Box bgcolor={'transparent !important'}>{avatar}</Box> : undefined}
      deleteIcon={
        <Icon
          icon='material-symbols:close-rounded'
          fontSize={size === 'small' ? '12px' : '16px'}
          color={active || clicked ? theme.colorToken.text.neutral.inverted : theme.colorToken.icon.neutral.subtle}
        />
      }
      sx={{
        bgcolor: bgStyle,
        color: undefined,
        borderRadius: shape == 'rounded' ? '4px' : undefined,
        borderColor: !clicked ? theme.colorToken.border.neutral.bold : theme.colorToken.background.primary.normal,
        '&:hover': {
          backgroundColor: bgStyleHover,
          borderColor: bgStyleHover,
          transition: '0.2s'
        },
        '&:active': {
          backgroundColor: theme.colorToken.background.primary.normal + '!important'
        },
        '&.Mui-disabled': {
          background: theme.colorToken.background.neutral.subtle + ' !important',
          border: `1px solid ${theme.colorToken.text.neutral.normal} !important`
        }
      }}
      {...props}
      label={
        typeof props.label == 'string' ? (
          <MvTypography size={size === 'small' ? 'LABEL_SM_NORMAL' : 'LABEL_MD_NORMAL'} typeSize='PX' color={textStyle}>
            {props.label}
          </MvTypography>
        ) : (
          props.label
        )
      }
      color={'primary'}
    />
  )
}
