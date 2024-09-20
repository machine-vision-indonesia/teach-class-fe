import { FabProps } from '@mui/material'

export type TypeButtonSize = 'small' | 'medium' | 'large'
export type TypeButtonVariant = 'primary' | 'transparent' | 'secondary'

export interface TypeButtonData extends Omit<FabProps, 'size' | 'style' | 'variant'> {
  icon: string
  size?: TypeButtonSize
  variant?: TypeButtonVariant
}

export interface PropsButton extends TypeButtonData {
  style?: 'default' | 'custom'
  text?: string
  isButtonView?: boolean
  data?: TypeButtonData[]
}
