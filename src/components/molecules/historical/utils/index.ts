import { Theme } from '@mui/material/styles'
import { ColorHistorical } from '../types/Historical.type'

export const getStyles = (variant: ColorHistorical = 'neutral', theme: Theme) => {
  const styles = {
    neutral: {
      bg: theme.colorToken.background.neutral.inverted,
      border: theme.colorToken.border.neutral.boldest
    },
    primary: {
      bg: theme.colorToken.background.primary.normal,
      border: theme.colorToken.border.primary.subtle
    },
    success: {
      bg: theme.colorToken.background.success.normal,
      border: theme.colorToken.border.success.subtle
    },
    danger: {
      bg: theme.colorToken.background.danger.normal,
      border: theme.colorToken.border.danger.subtle
    },
    info: {
      bg: theme.colorToken.background.info.normal,
      border: theme.colorToken.border.primary.subtle
    },
    warning: {
      bg: theme.colorToken.background.warning.normal,
      border: theme.colorToken.border.warning.subtle
    }
  }

  return {
    background: styles[variant]?.bg,
    border: styles[variant]?.border
  }
}

export const formatDate = (date: Date) => {
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const year = String(date.getFullYear()).slice(-2)
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')

  return `${day}/${month}/${year}, ${hours}:${minutes}`
}
