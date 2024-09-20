import { PaletteOptions, ThemeOptions } from '@mui/material'

export interface IExtendedPaletteColorOptions {
  subtlest?: string
  subtlestText?: string
  25?: string
  white?: string
  black?: string
}

export type ExtendedPaletteColorOptions = PaletteOptions['primary'] & IExtendedPaletteColorOptions

export interface IExtendedPalette
  extends Omit<PaletteOptions, 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success'> {
  primary?: ExtendedPaletteColorOptions
  neutral?: ExtendedPaletteColorOptions
  neutralInverted?: ExtendedPaletteColorOptions
  success?: ExtendedPaletteColorOptions
  info?: ExtendedPaletteColorOptions
  warning?: ExtendedPaletteColorOptions
  danger?: ExtendedPaletteColorOptions
  brickRed?: ExtendedPaletteColorOptions
  pink?: ExtendedPaletteColorOptions
  violet?: ExtendedPaletteColorOptions
  purple?: ExtendedPaletteColorOptions
  royalBlue?: ExtendedPaletteColorOptions
  dodgerBlue?: ExtendedPaletteColorOptions
  cyan?: ExtendedPaletteColorOptions
  seaGreen?: ExtendedPaletteColorOptions
  springGreen?: ExtendedPaletteColorOptions
  greenYellow?: ExtendedPaletteColorOptions
  yellow?: ExtendedPaletteColorOptions
  brown?: ExtendedPaletteColorOptions
  important?: ExtendedPaletteColorOptions
  secondary?: ExtendedPaletteColorOptions
  error?: ExtendedPaletteColorOptions
}

export interface IExtendedThemeOptions extends ThemeOptions {
  palette?: IExtendedPalette
}
