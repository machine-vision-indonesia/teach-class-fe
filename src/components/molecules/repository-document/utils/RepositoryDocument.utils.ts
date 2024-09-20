import { ThemeColor } from '@/@core/layouts/types'
import { Theme } from '@mui/material/styles'

export const getFormattedDate = (dateString: string): string => {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' }
  return new Date(dateString).toLocaleDateString('en-US', options)
}

export const getDay = (dateString: string): string => {
  const options: Intl.DateTimeFormatOptions = { weekday: 'long' }
  return new Date(dateString).toLocaleDateString('en-US', options)
}

export const getHeaderBackground = (color: ThemeColor, theme: Theme) => {
  switch (color) {
    case 'primary':
      return theme.colorToken.background.primary.normal
    case 'secondary':
      return theme.colorToken.background.primary.subtlest
    case 'error':
      return theme.colorToken.background.danger.normal
    case 'warning':
      return theme.colorToken.background.warning.normal
    case 'success':
      return theme.colorToken.background.success.normal
    case 'info':
      return theme.colorToken.background.info.normal
    default:
      return theme.colorToken.background.primary.normal
  }
}
