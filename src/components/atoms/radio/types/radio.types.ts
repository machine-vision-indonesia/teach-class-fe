export default interface RadioProps {
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
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  value?: string | number | boolean
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
