import { Palette } from '@mui/material/styles'

export default interface CheckboxProps {
  label?: string
  color?:
    | 'primary'
    | 'brick'
    | 'pink'
    | 'violet'
    | 'purple'
    | 'violetBlue'
    | 'royalBlue'
    | 'dodgerBlue'
    | 'cyan'
    | 'seaGreen'
    | 'springGreen'
    | 'greenYellow'
    | 'yellow'
    | 'brown'
    | 'orangeWarm'
    | any
  disabled?: boolean
  checked?: boolean
  hover?: boolean
  indeterminate?: boolean
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  size?: 'small' | 'large'
}

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

export interface CustomCheckboxProps extends CheckboxProps {
  hover?: boolean
  colorHover?: string
  size?: 'small' | 'large'
  colorPalette?: Palette
}
