// ** Type Imports
import { PaletteMode } from '@mui/material'
import { Skin } from 'src/@core/layouts/types'

const DefaultPalette = (mode: PaletteMode, skin: Skin) => {
  // ** Vars
  const whiteColor = '#FFF'
  const lightColor = '51, 48, 60'
  const darkColor = '228, 230, 244'
  const darkPaperBgColor = '#2F3349'
  const mainColor = mode === 'light' ? lightColor : darkColor

  const defaultBgColor = () => {
    if (skin === 'bordered' && mode === 'light') {
      return whiteColor
    } else if (skin === 'bordered' && mode === 'dark') {
      return darkPaperBgColor
    } else if (mode === 'light') {
      return '#F8F7FA'
    } else return '#25293C'
  }

  return {
    customColors: {
      dark: darkColor,
      main: mainColor,
      light: lightColor,
      lightPaperBg: whiteColor,
      darkPaperBg: darkPaperBgColor,
      bodyBg: mode === 'light' ? '#F8F7FA' : '#25293C', // Same as palette.background.default but doesn't consider bordered skin
      trackBg: mode === 'light' ? '#F1F0F2' : '#3B405B',
      avatarBg: mode === 'light' ? '#F6F6F7' : '#4A5072',
      tableHeaderBg: mode === 'light' ? '#F6F6F7' : '#4A5072'
    },
    mode: mode,
    common: {
      black: '#000',
      white: whiteColor
    },
    primary: {
      light: '#8479F2',
      main: '#7367F0',
      dark: '#0a50c7',
      contrastText: whiteColor,
      50: '#E6EFFF',
      100: '#CCDFFF',
      200: '#99BFFF',
      300: '#669EFF',
      400: '#337EFF',
      500: '#005EFF',
      600: '#004BCC',
      700: '#003899',
      800: '#002666',
      900: '#001C4D',
      subtlest: '#E6EFFF',
      subtlestText: '#005EFF'
    },
    neutral: {
      main: '#2D2E31',
      25: '#F9F9FA',
      50: '#EDEEF0',
      100: '#D4D5D7',
      200: '#C6C7CA',
      300: '#A9ACB0',
      400: '#8D9095',
      500: '#70747B',
      600: '#5A5D62',
      700: '#43464A',
      800: '#2D2E31',
      white: '#FEFEFE',
      black: '#222325',
      contrastText: '#FEFEFE',
      subtlest: '#F9F9FA',
      subtlestText: '#5A5D62'
    },
    neutralInverted: {
      main: '#D4D5D7',
      contrastText: '#222325',
      subtlest: '#D4D5D7',
      subtlestText: '#222325'
    },
    secondary: {
      light: '#B2B4B8',
      main: '#A8AAAE',
      dark: '#949699',
      contrastText: whiteColor
    },
    error: {
      light: '#ED6F70',
      main: '#EA5455',
      dark: '#CE4A4B',
      contrastText: whiteColor,
      50: '#FDE6EA',
      100: '#FBCCD4',
      200: '#F69AA9',
      300: '#F2677F',
      400: '#ED3554',
      500: '#E90229',
      600: '#BA0221',
      700: '#8C0119',
      800: '#5D0110',
      900: '#46010C',
      subtlest: '#FDE6EA',
      subtlestText: '#E90229'
    },
    warning: {
      light: '#FFAB5A',
      main: '#FF9F43',
      dark: '#E08C3B',
      contrastText: whiteColor,
      50: '#FFF7E6',
      100: '#FFEFCC',
      200: '#FFDF9A',
      300: '#FFCE67',
      400: '#FFBE35',
      500: '#FFAE02',
      600: '#E09902',
      700: '#996801',
      800: '#664601',
      900: '#4D3401',
      subtlest: '#FFF7E6',
      subtlestText: '#222325'
    },
    danger: {
      main: '#E90229',
      50: '#FDE6EA',
      100: '#FBCCD4',
      200: '#F69AA9',
      300: '#F2677F',
      400: '#ED3554',
      500: '#E90229',
      600: '#BA0221',
      700: '#8C0119',
      800: '#5D0110',
      900: '#46010C',
      contrastText: '#FEFEFE',
      subtlest: '#FDE6EA',
      subtlestText: '#E90229'
    },
    info: {
      light: '#1FD5EB',
      main: '#00CFE8',
      dark: '#00B6CC',
      contrastText: whiteColor,
      50: '#E6F7FF',
      100: '#CEEEFF',
      200: '#9CDDFF',
      300: '#6BCDFF',
      400: '#39BCFF',
      500: '#08ABFF',
      600: '#0689CC',
      700: '#056799',
      800: '#034466',
      900: '#02334D',
      subtlest: '#E6F7FF',
      subtlestText: '#0689CC'
    },
    success: {
      light: '#42CE80',
      main: '#28C76F',
      dark: '#23AF62',
      contrastText: whiteColor,
      50: '#ECF8EC',
      100: '#C3E8C5',
      200: '#A7DDA9',
      300: '#7ECD82',
      400: '#65C46A',
      500: '#3EB645',
      600: '#39A53F',
      700: '#2D8131',
      800: '#236426',
      900: '#1A4C1D',
      subtlest: '#ECF8EC',
      subtlestText: '#39A53F'
    },
    grey: {
      50: '#FAFAFA',
      100: '#F5F5F5',
      200: '#EEEEEE',
      300: '#E0E0E0',
      400: '#BDBDBD',
      500: '#9E9E9E',
      600: '#757575',
      700: '#616161',
      800: '#424242',
      900: '#212121',
      A100: '#F5F5F5',
      A200: '#EEEEEE',
      A400: '#BDBDBD',
      A700: '#616161'
    },
    text: {
      primary: `rgba(${mainColor}, 0.87)`,
      secondary: `rgba(${mainColor}, 0.6)`,
      disabled: `rgba(${mainColor}, 0.38)`
    },
    divider: `rgba(${mainColor}, 0.12)`,
    background: {
      paper: mode === 'light' ? whiteColor : darkPaperBgColor,
      default: defaultBgColor()
    },
    action: {
      active: `rgba(${mainColor}, 0.54)`,
      hover: `rgba(${mainColor}, 0.04)`,
      selected: `rgba(${mainColor}, 0.08)`,
      disabled: `rgba(${mainColor}, 0.26)`,
      disabledBackground: `rgba(${mainColor}, 0.12)`,
      focus: `rgba(${mainColor}, 0.12)`
    }
  }
}

export default DefaultPalette
