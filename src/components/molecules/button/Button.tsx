import { Icon } from '@iconify/react'
import { Fab, Stack, Typography, useTheme } from '@mui/material'
import { PropsButton, TypeButtonSize, TypeButtonVariant } from './Button.type'

export const Button = ({
  data = [],
  icon,
  isButtonView = false,
  size = 'medium',
  style = 'default',
  text = '',
  variant = 'primary',
  ...props
}: PropsButton) => {
  const { palette } = useTheme()

  function getButtonColor(_variant: TypeButtonVariant | undefined) {
    switch (_variant) {
      case 'transparent':
        return palette.primary.contrastText
      case 'secondary':
        return '#A8CCFF'
      case 'primary':
      default:
        return palette.primary.main
    }
  }

  function getIconSize(_size: TypeButtonSize | undefined) {
    switch (_size) {
      case 'large':
        return 28
      case 'medium':
        return 24
      case 'small':
      default:
        return 20
    }
  }

  function getIconColor(_variant: TypeButtonVariant | undefined) {
    switch (_variant) {
      case 'transparent':
      case 'secondary':
        return palette.primary.main
      case 'primary':
      default:
        return palette.primary.contrastText
    }
  }

  return (
    <Stack direction='row' spacing={isButtonView ? 0 : 1} alignItems='center'>
      {style === 'custom' && !isButtonView && (
        <Typography variant='h6' color={palette.text.disabled} sx={{ fontWeight: 700 }}>
          {text}
        </Typography>
      )}

      {isButtonView ? (
        <>
          {data?.map((v, i) => (
            <Fab
              key={i}
              size={v.size}
              sx={{
                borderRadius: 0,
                background: getButtonColor(v?.variant),
                border: v?.variant === 'transparent' ? `3px solid ${palette.primary.main}` : 'none',
                '&:hover': { background: getButtonColor(v?.variant) }
              }}
              {...props}
            >
              <Icon icon={v.icon} color={getIconColor(v?.variant)} width={getIconSize(v.size)} />
            </Fab>
          ))}
        </>
      ) : (
        <Fab
          size={size}
          sx={{
            background: getButtonColor(variant),
            border: variant === 'transparent' ? `3px solid ${palette.primary.main}` : 'none',
            '&:hover': { background: getButtonColor(variant) }
          }}
          {...props}
        >
          <Icon icon={icon} color={getIconColor(variant)} width={getIconSize(size)} />
        </Fab>
      )}
    </Stack>
  )
}
