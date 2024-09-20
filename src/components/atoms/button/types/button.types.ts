import { ButtonProps as MuiButtonProps } from '@mui/material'

declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    solid: true
    plain: true
  }
}

export type buttonVariant = 'solid' | 'contained' | 'outlined' | 'text' | 'plain'

interface CommonMvButtonProps extends MuiButtonProps {
  loading?: boolean
  fontWeight?: number
}

interface IconTextButtonProps extends CommonMvButtonProps {
  content: 'iconText'
  icon: string
  text: string
  fontWeight?: number
  iconSize?: number
}

interface TextOnlyButtonProps extends CommonMvButtonProps {
  content: 'textOnly'
  icon?: never
  text: string
  iconSize?: never
}

interface IconOnlyButtonProps extends CommonMvButtonProps {
  content: 'iconOnly'
  icon: string
  iconSize?: number
  fontWeight?: number
  text?: never
}

export type ButtonProps = IconTextButtonProps | TextOnlyButtonProps | IconOnlyButtonProps

export interface ColorVariant {
  main: string
  dark: string
}

export interface CustomPalette {
  primary: ColorVariant
  brickRed: ColorVariant
  pink: ColorVariant
  violet: ColorVariant
  purple: ColorVariant
  violetBlue: ColorVariant
  royalBlue: ColorVariant
  dodgerBlue: ColorVariant
  cyan: ColorVariant
  seaGreen: ColorVariant
  springGreen: ColorVariant
  greenYellow: ColorVariant
  yellow: ColorVariant
  brown: ColorVariant
  orangeWarm: ColorVariant
}
