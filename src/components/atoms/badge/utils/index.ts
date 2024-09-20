import { getContrastRatio } from '@mui/material'

export const getBgColor = (isTransparent: boolean, theme: any, color: string) => {
  if (color === 'neutral') {
    return isTransparent
      ? theme.colorToken.background.neutral.subtlest
      : theme.colorToken.background.neutralInverted.normal
  } else if (color === 'neutralInverted') {
    return isTransparent ? theme.colorToken.background.neutral.subtle : theme.colorToken.background.neutral.subtle
  } else {
    return isTransparent ? theme.colorToken.background[color].subtlest : theme.colorToken.background[color].normal
  }
}

export const getStyleRadiusValue = (style: string) => {
  switch (style) {
    case 'rect':
      return 4

    case 'circular':
      return 100

    default:
      return 4
  }
}

export const getHeightBySize = (size: string) => {
  switch (size) {
    case 'small':
      return 16

    case 'medium':
      return 20

    default:
      return 20
  }
}

export const getIconColor = (isTransparent: boolean, theme: any, color: string) => {
  const badgeColor = getBgColor(isTransparent, theme, color)
  const contrastRatio = getContrastRatio(badgeColor || '', '#FFFFFF')
  const isNeutral = badgeColor === theme.colorToken.background.neutralInverted.normal
  const isNeutralInverted = badgeColor === theme.colorToken.background.neutral.subtle

  if (isTransparent) {
    if (isNeutralInverted) {
      return theme.colorToken.text.neutral.normal
    } else {
      return theme.colorToken.text[color].normal
    }
  } else if (isNeutral) {
    return theme.colorToken.text.neutral.inverted
  } else if (isNeutralInverted) {
    return theme.colorToken.text.neutral.normal
  } else if (contrastRatio < 5.5) {
    return theme.colorToken.text.neutral.inverted
  } else if (contrastRatio > 5.5) {
    return theme.colorToken.text.neutral.normal
  } else {
    return theme.palette.getContrastText(badgeColor || '')
  }
}

export const getLabelSize = (size: string) => {
  switch (size) {
    case 'small':
      return 'LABEL_SM_NORMAL'
    case 'medium':
      return 'LABEL_SM_BOLDEST'
    default:
      return 'LABEL_SM_NORMAL'
  }
}

export const getIconSize = (size: string) => {
  switch (size) {
    case 'small':
      return 12
    case 'medium':
      return 16
    default:
      return 12
  }
}
