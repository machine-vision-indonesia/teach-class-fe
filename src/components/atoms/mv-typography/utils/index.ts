import { Typography } from '@mui/material'
import { styled } from '@mui/system'
import { SIZE_VARIANT } from '../constants/size'

export const getComputedStyleBackgroundColor = (element: HTMLElement | null): string => {
  if (element && typeof window !== 'undefined') {
    return window.getComputedStyle(element).backgroundColor
  }
  return ''
}

export const rgbToHex = (r: number, g: number, b: number): string => {
  const componentToHex = (c: number) => {
    const hex = c.toString(16)
    return hex.length === 1 ? '0' + hex : hex
  }
  return `#${componentToHex(r)}${componentToHex(g)}${componentToHex(b)}`
}

export const getTextColor = (hexColor: string, theme: any): string => {
  const backgroundColors = theme.colorToken.background
  for (const key in backgroundColors) {
    if (backgroundColors[key].subtlest === hexColor) {
      if (theme.colorToken.text[key]) {
        if (theme.colorToken.text[key].normal) {
          return theme.colorToken.text[key].normal
        } else {
          return theme.colorToken.text.neutral.normal
        }
      } else {
        return theme.colorToken.text.neutral.normal
      }
    }
  }
  return ''
}

export const StyledTypography = styled(Typography)<{ typeSize: 'PX' | 'DVW'; size: keyof typeof SIZE_VARIANT }>(({
  typeSize = 'PX',
  size = 'BODY_MD_NORMAL'
}) => {
  const themeSize: any = SIZE_VARIANT[size]
  const fontSize = typeSize === 'DVW' ? `calc(${themeSize.fontSize / 10}dvw)` : `${themeSize.fontSize}px`
  return {
    fontSize,
    fontWeight: themeSize.fontWeight,
    textTransform: themeSize.textTransform || 'none',
    letterSpacing: themeSize.letterSpacing || 'normal'
  }
})
