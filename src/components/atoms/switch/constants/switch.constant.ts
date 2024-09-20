import { createTheme } from '@mui/material'
import { ColorVariant, CustomPalette } from '../types/switch.types'
import { lightThemeOptions as themelight } from '@/theme'

const paletteColors = ['primary', 'error', 'warning', 'info', 'success'] as const

export const SWITCH_COLOR_VARIANT = {
  primary: 'primary',
  danger: 'error',
  warning: 'warning',
  info: 'info',
  success: 'success'
}

const lightThemeOptions: { palette: Partial<CustomPalette> } = {
  palette: Object.fromEntries(
    paletteColors.map(color => [color, themelight.palette?.[color] as ColorVariant | undefined])
  ) as Partial<CustomPalette>
}

export const theme = createTheme({
  palette: {
    primary: {
      main: lightThemeOptions.palette.primary?.main ?? '',
      light: lightThemeOptions.palette.primary?.main ?? ''
    },
    error: {
      main: lightThemeOptions.palette.error?.main ?? '',
      light: lightThemeOptions.palette.error?.main ?? ''
    },
    warning: {
      main: lightThemeOptions.palette.warning?.main ?? '',
      light: lightThemeOptions.palette.warning?.main ?? ''
    },
    success: {
      main: lightThemeOptions.palette.success?.main ?? '',
      light: lightThemeOptions.palette.success?.main ?? ''
    },
    info: {
      main: lightThemeOptions.palette.info?.main ?? '',
      light: lightThemeOptions.palette.info?.main ?? ''
    }
  },
  colorToken: {}
} as const)
