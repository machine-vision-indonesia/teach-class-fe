import { useTheme } from '@mui/material'
import { PropsTextarea } from '../types/textarea.types'
import { getSize } from '../utils'
import { MvTextarea } from '../styles/textarea.style'

export const Textarea = ({ variant = 'medium', isError, ...rest }: PropsTextarea) => {
  const theme = useTheme()

  return (
    <MvTextarea
      color={theme.colorToken.text.neutral.normal}
      background={theme.colorToken.background.neutral.normal}
      borderColor={isError ? theme.colorToken.border.danger.normal : theme.colorToken.border.neutral.bold}
      hoverBorderColor={theme.colorToken.border.neutral.boldest}
      focusColor={theme.colorToken.border.primary.normal}
      disabledBackground={theme.colorToken.background.neutral.disabled}
      readonlyBackground={theme.colorToken.background.neutral.disabled}
      placeholdertextColor={theme.colorToken.text.neutral.subtlest}
      fontSize={getSize.fontSize(variant)}
      {...rest}
    />
  )
}
