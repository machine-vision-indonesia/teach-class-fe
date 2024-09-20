import { Palette } from '@mui/material/styles'

export default interface SwitchProps {
  label?: string
  color?: 'primary' | 'danger' | 'warning' | 'info' | 'success'
  disabled?: boolean
  checked?: boolean
  onChange?: () => void
  onClick?: () => void
}

export interface ColorVariant {
  main: string
  dark: string
}

export interface CustomPalette {
  primary: ColorVariant
  error: ColorVariant
  warning: ColorVariant
  info: ColorVariant
  success: ColorVariant
}

export interface SwitchCustomProps extends Omit<SwitchProps, 'color'> {
  color?: string // Custom color prop
  colorPalette?: Palette
}
