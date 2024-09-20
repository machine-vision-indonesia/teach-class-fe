import { TextFieldProps } from '@mui/material'

declare module '@mui/material/TextField' {
  interface TextFieldPropsSizeOverrides {
    large: true
  }
}

export type Size = 'small' | 'medium' | 'large'

export default interface ComponentInputProps extends Omit<TextFieldProps, 'variant' | 'color' | 'size'> {
  variant?: 'outlined' | 'filled'
  size?: Size
  type?: 'text' | 'number' | 'password'
  color?: 'primary' | 'neutral' | 'neutral-inverted' | 'danger' | 'warning' | 'success' | 'info' | 'error'
  fullWidth?: boolean
  width?: string
  iconStartAdornment?: string
  iconEndAdornment?: string
  leftUnit?: string
  rightUnit?: string
  numberNoArrow?: boolean
}
