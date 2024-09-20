import { createTheme, ThemeOptions } from '@mui/material'
import { lightThemeOptions as themelight } from '@/theme'
import { ColorVariant, CustomPalette } from '../types/radio.types'

const paletteColors = [
  'primary',
  'brickRed',
  'pink',
  'violet',
  'purple',
  'violetBlue',
  'royalBlue',
  'dodgerBlue',
  'cyan',
  'seaGreen',
  'springGreen',
  'greenYellow',
  'yellow',
  'brown',
  'orangeWarm'
] as const

const lightThemeOptions: { palette: Partial<CustomPalette> } = {
  palette: Object.fromEntries(
    paletteColors.map(color => [color, themelight.palette?.[color] as ColorVariant | undefined])
  ) as Partial<CustomPalette>
}

const themePalette = Object.fromEntries(
  paletteColors.map(color => [
    color,
    {
      main: lightThemeOptions.palette?.[color]?.main || '',
      dark: lightThemeOptions.palette?.[color]?.main || ''
    }
  ])
)

export const theme = createTheme({
  palette: themePalette,
  colorToken: {}
} as unknown as ThemeOptions)

export const RADIO_COLOR_VARIANT: Record<string, ColorVariant> = Object.fromEntries(
  paletteColors.map(color => [color, theme.palette[color] as ColorVariant])
)
