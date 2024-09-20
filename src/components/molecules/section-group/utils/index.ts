import { Theme } from '@mui/material/styles'
import { ColorSection } from '../types/SectionGroup.type'

export const getStyles = (variant: ColorSection = 'default', theme: Theme) => {
  const styles = {
    primary: {
      background: theme.colorToken.background.primary.subtlest,
      borderColor: theme.colorToken.border.primary.normal
    },
    default: {
      background: theme.colorToken.background.default,
      borderColor: theme.colorToken.border.neutral.normal
    },
    success: {
      background: theme.colorToken.background.success.subtlest,
      borderColor: theme.colorToken.background.success.normal
    },
    warning: {
      background: theme.colorToken.background.warning.subtlest,
      borderColor: theme.colorToken.border.warning.normal
    },
    critical: {
      background: theme.colorToken.background.danger.subtlest,
      borderColor: theme.colorToken.border.danger.normal
    },
    info: {
      background: theme.colorToken.background.info.subtlest,
      borderColor: theme.colorToken.border.dodgerBlue.normal
    }
  }

  return {
    backgroundSection: styles[variant]?.background,
    borderSection: styles[variant]?.borderColor
  }
}
