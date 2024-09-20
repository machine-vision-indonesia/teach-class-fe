import { PaletteColorOptions } from '@mui/material/styles'

interface CustomBackground {
  normal: string
  hover?: string
  pressed?: string
  subtle?: string
  subtlest?: string
  disabled?: string
  inverted?: string
}

interface CustomText {
  normal: string
  inverted?: string
  bold?: string
  boldest?: string
  disabled?: string
  subtle?: string
  subtlest?: string
}

interface CustomLink {
  normal: string
  hover: string
  pressed: string
  subtle: string
  subtlest: string
  boldest: string
}

interface CustomTypeLink {
  primary: CustomLink
  danger: CustomLink
  success: CustomLink
  warning: CustomLink
  neutral: CustomLink
}

interface CustomTypeText {
  primary: CustomText
  neutral: CustomText
  neutralInverted: CustomText
  success: CustomText
  danger: CustomText
  info: CustomText
  warning: CustomText
}

interface CustomTypeBackground {
  default: string
  paper: string
  primary: CustomBackground
  neutral: CustomBackground
  neutralInverted: CustomBackground
  success: CustomBackground
  info: CustomBackground
  warning: CustomBackground
  danger: CustomBackground
  brickRed: CustomBackground
  pink: CustomBackground
  violet: CustomBackground
  purple: CustomBackground
  violetBlue: CustomBackground
  royalBlue: CustomBackground
  dodgerBlue: CustomBackground
  cyan: CustomBackground
  seaGreen: CustomBackground
  springGreen: CustomBackground
  greenYellow: CustomBackground
  yellow: CustomBackground
  brown: CustomBackground
  orangeWarm: CustomBackground
}

interface CustomBorderItem {
  subtlest?: string
  subtle?: string
  normal: string
  bold?: string
  boldest?: string
  hover?: string
  pressed?: string
  disabled?: string
}

interface CustomBorderOptions {
  neutral: CustomBorderItem
  primary: CustomBorderItem
  success: CustomBorderItem
  danger: CustomBorderItem
  warning: CustomBorderItem
  brickRed: CustomBorderItem
  pink: CustomBorderItem
  violet: CustomBorderItem
  purple: CustomBorderItem
  violetBlue: CustomBorderItem
  royalBlue: CustomBorderItem
  dodgerBlue: CustomBorderItem
  cyan: CustomBorderItem
  seaGreen: CustomBorderItem
  springGreen: CustomBorderItem
  greenYellow: CustomBorderItem
  yellow: CustomBorderItem
  brown: CustomBorderItem
  orangeWarm: CustomBorderItem
}

interface CustomIconItem {
  normal: string
  inverted?: string
  subtle?: string
  subtlest?: string
  bold?: string
  boldest?: string
  disabled?: string
}

interface CustomIconOptions {
  primary: CustomIconItem
  danger: CustomIconItem
  neutral: CustomIconItem
  success: CustomIconItem
  warning: CustomIconItem
  info: CustomIconItem
}

interface CustomChartItem {
  default: string
}

interface CustomChartOptions {
  brickRed: CustomChartItem
  pink: CustomChartItem
  violet: CustomChartItem
  purple: CustomChartItem
  violetBlue: CustomChartItem
  royalBlue: CustomChartItem
  dodgerBlue: CustomChartItem
  cyan: CustomChartItem
  seaGreen: CustomChartItem
  springGreen: CustomChartItem
  greenYellow: CustomChartItem
  yellow: CustomChartItem
  brown: CustomChartItem
  orangeWarm: CustomChartItem
}

interface ColorToken {
  text: CustomTypeText
  background: CustomTypeBackground
  border: CustomBorderOptions
  icon: CustomIconOptions
  link: CustomTypeLink
  chart: {
    accents: CustomChartOptions
  }
}

interface ColorPartialCustom {
  25: string
  50: string
  100: string
  200: string
  300: string
  400: string
  500: string
  600: string
  700: string
  800: string
  900: string
  A100: string
  A200: string
  A400: string
  A700: string
}

declare module '@mui/system' {
  interface Theme {
    colorToken: ColorToken
  }
}

declare module '@mui/material' {
  interface Color {
    25: string
    50: string
    100: string
    200: string
    300: string
    400: string
    500: string
    600: string
    700: string
    800: string
    900: string
    A100: string
    A200: string
    A400: string
    A700: string
  }
}

declare module '@mui/material/styles' {
  export type ColorPartial = Partial<ColorPartialCustom>
  interface BaseTheme {
    colorToken: ColorToken
  }
  interface ThemeOptions {
    colorToken: ColorToken
  }
  interface PaletteColor {
    light: string
    main: string
    dark: string
    contrastText: string
    normal?: string
    subtlest?: string
    subtlestText?: string
    white?: string
    black?: string
    25?: string
    50?: string
    100?: string
    200?: string
    300?: string
    400?: string
    500?: string
    600?: string
    700?: string
    800?: string
    900?: string
    A100?: string
    A200?: string
    A400?: string
    A700?: string
  }
  interface Palette {
    customColors: {
      dark: string
      main: string
      light: string
      bodyBg: string
      trackBg: string
      avatarBg: string
      darkPaperBg: string
      lightPaperBg: string
      tableHeaderBg: string
      buttonEnable: string
      buttonDisable: string
    }
    blueMv: PaletteColorOptions
    accent: Palette['primary']
    placeholder: string
    brand: {
      first: string
      second: string
      third: string
      white: string
    }
    navbarHeader: string
    davis: {
      1: string
      2: string
      3: string
      4: string
      5: string
      6: string
      7: string
      8: string
      9: string
      10: string
      11: string
      12: string
      13: string
      14: string
      15: string
      16: string
    }
    primary: PaletteColor
    neutral: PaletteColor
    neutralInverted?: PaletteColor
    success: PaletteColor
    info: PaletteColor
    warning: PaletteColor
    danger: PaletteColor
    brickRed: PaletteColor
    pink: PaletteColor
    violet: PaletteColor
    purple: PaletteColor
    violetBlue: PaletteColor
    royalBlue: PaletteColor
    dodgerBlue: PaletteColor
    cyan: PaletteColor
    seaGreen: PaletteColor
    springGreen: PaletteColor
    greenYellow: PaletteColor
    yellow: PaletteColor
    brown: PaletteColor
    orangeWarm: PaletteColor
    important: PaletteColor
    critical: PaletteColor
  }
  interface PaletteOptions {
    customColors?: {
      dark?: string
      main?: string
      light?: string
      bodyBg?: string
      trackBg?: string
      avatarBg?: string
      darkPaperBg?: string
      lightPaperBg?: string
      tableHeaderBg?: string
      buttonEnable: string
      buttonDisable: string
    }
    blueMv?: PaletteColorOptions
    accent?: PaletteOptions['primary']
    placeholder?: string
    brand?: {
      first?: string
      second?: string
      third?: string
      white?: string
    }
    navbarHeader?: string
    davis?: {
      1: string
      2: string
      3: string
      4: string
      5: string
      6: string
      7: string
      8: string
      9: string
      10: string
      11: string
      12: string
      13: string
      14: string
      15: string
      16: string
    }
    neutral?: PaletteColorOptions
    neutralInverted?: PaletteColorOptions
    important?: PaletteColorOptions
    danger?: PaletteColorOptions
    critical?: PaletteColorOptions
    brickRed?: PaletteColorOptions
    pink?: PaletteColorOptions
    violet?: PaletteColorOptions
    purple?: PaletteColorOptions
    violetBlue?: PaletteColorOptions
    royalBlue?: PaletteColorOptions
    dodgerBlue?: PaletteColorOptions
    cyan?: PaletteColorOptions
    seaGreen?: PaletteColorOptions
    springGreen?: PaletteColorOptions
    greenYellow?: PaletteColorOptions
    yellow?: PaletteColorOptions
    brown?: PaletteColorOptions
    orangeWarm?: PaletteColorOptions
  }
  interface SimplePaletteColorOptions {
    light?: string
    main: string
    dark?: string
    contrastText?: string
    subtlest?: string
    subtlestText?: string
    white?: string
    black?: string
  }
  interface TypeBackground {
    default: string
    paper: string
    primary: CustomBackground
    neutral: CustomBackground
    neutralInverted: CustomBackground
    success: CustomBackground
    info: CustomBackground
    warning: CustomBackground
    danger: CustomBackground
    brickRed: CustomBackground
    pink: CustomBackground
    violet: CustomBackground
    purple: CustomBackground
    royalBlue: CustomBackground
    dodgerBlue: CustomBackground
    cyan: CustomBackground
    seaGreen: CustomBackground
    springGreen: CustomBackground
    greenYellow: CustomBackground
    yellow: CustomBackground
    brown: CustomBackground
  }
  interface TypeText {
    neutral: CustomText
    neutralInverted: CustomText
    success: CustomText
    danger: CustomText
    info: CustomText
    warning: CustomText
  }
}

export {}
