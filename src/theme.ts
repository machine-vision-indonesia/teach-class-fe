import { ThemeOptions, createTheme } from '@mui/material'

export const lightThemeOptions: ThemeOptions = {
  palette: {
    mode: 'light',
    primary: {
      main: '#005EFF',
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
      contrastText: '#FFFFFF',
      subtlest: '#E6EFFF',
      subtlestText: '#005EFF',
      dark: '#004BCC'
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
      subtlest: '#2D2E31',
      subtlestText: '#F9F9FA'
    },
    success: {
      main: '#3EB645',
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
      contrastText: '#FEFEFE',
      subtlestText: '#39A53F',
      dark: '#39A53F'
    },
    info: {
      main: '#08ABFF',
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
      contrastText: '#FEFEFE',
      subtlest: '#E6F7FF',
      subtlestText: '#0689CC',
      dark: '#0689CC'
    },
    warning: {
      main: '#FFAE02',
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
      contrastText: '#222325',
      subtlestText: '#222325',
      dark: '#E09902'
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
      subtlestText: '#E90229',
      dark: '#BA0221'
    },
    brickRed: {
      main: '#F65556',
      50: '#FEEEEE',
      100: '#FDDDDD',
      200: '#FBBBBB',
      300: '#FA999A',
      400: '#F87778',
      500: '#F65556',
      600: '#CA4445',
      700: '#9D3334',
      800: '#712323',
      900: '#5B1A1B',
      contrastText: '#F9F9FA',
      subtlest: '#FEEEEE',
      subtlestText: '#F65556'
    },
    pink: {
      main: '#EF48A2',
      50: '#FDEDF6',
      100: '#FCDAEC',
      200: '#F9B6DA',
      300: '#F591C7',
      400: '#F26DB5',
      500: '#EF48A2',
      600: '#C03A82',
      700: '#912B62',
      800: '#631D43',
      900: '#4B1633',
      contrastText: '#F9F9FA',
      subtlest: '#FDEDF6',
      subtlestText: '#EF48A2'
    },
    violet: {
      main: '#EF34FF',
      50: '#FDEBFF',
      100: '#FCD6FF',
      200: '#F9AEFF',
      300: '#F585FF',
      400: '#F25DFF',
      500: '#EF34FF',
      600: '#BF2ACC',
      700: '#901F99',
      800: '#601567',
      900: '#48104D',
      contrastText: '#F9F9FA',
      subtlest: '#FDEBFF',
      subtlestText: '#EF34FF'
    },
    purple: {
      main: '#8850E3',
      50: '#F3EEFC',
      100: '#E7DCF9',
      200: '#CFB9F4',
      300: '#B896EE',
      400: '#A073E9',
      500: '#8850E3',
      600: '#6D40B6',
      700: '#523089',
      800: '#36205B',
      900: '#291845'
    },
    violetBlue: {
      main: '#5D47FF',
      50: '#EFEDFF',
      100: '#DFDAFF',
      200: '#BEB5FF',
      300: '#9E91FF',
      400: '#7D6CFF',
      500: '#5D47FF',
      600: '#4B39D0',
      700: '#392BA1',
      800: '#261C72',
      900: '#1D155B',
      contrastText: '#F9F9FA',
      subtlest: '#EFEDFF',
      subtlestText: '#5D47FF'
    },
    royalBlue: {
      main: '#4678DD',
      50: '#EDF2FC',
      100: '#DAE4F8',
      200: '#B5C9F1',
      300: '#90AEEB',
      400: '#6B93E4',
      500: '#4678DD',
      600: '#3860B1',
      700: '#2A4885',
      800: '#1C3058',
      900: '#152442',
      contrastText: '#F9F9FA',
      subtlest: '#EDF2FC',
      subtlestText: '#4678DD'
    },
    dodgerBlue: {
      main: '#449EFD',
      50: '#ECF5FF',
      100: '#DAECFF',
      200: '#B4D8FE',
      300: '#8FC5FE',
      400: '#69B1FD',
      500: '#449EFD',
      600: '#3680CD',
      700: '#29629E',
      800: '#1B436E',
      900: '#143456',
      contrastText: '#F9F9FA',
      subtlest: '#ECF5FF',
      subtlestText: '#449EFD'
    },
    cyan: {
      main: '#48D3E5',
      50: '#EDFBFC',
      100: '#DAF6FA',
      200: '#B6EDF5',
      300: '#91E5EF',
      400: '#6DDCEA',
      500: '#48D3E5',
      600: '#3AA9B7',
      700: '#2B7F89',
      800: '#1D545C',
      900: '#163F45',
      contrastText: '#222529',
      subtlest: '#EDFBFC',
      subtlestText: '#48D3E5'
    },
    seaGreen: {
      main: '#56D7C2',
      50: '#EEFBF9',
      100: '#DDF7F3',
      200: '#BBEFE7',
      300: '#9AE7DA',
      400: '#78DFCE',
      500: '#56D7C2',
      600: '#45AC9B',
      700: '#348174',
      800: '#22564E',
      900: '#1A413A',
      contrastText: '#222529',
      subtlest: '#EEFBF9',
      subtlestText: '#56D7C2'
    },
    springGreen: {
      main: '#5BEB9D',
      50: '#EFFDF5',
      100: '#DEFBEB',
      200: '#BDF7D8',
      300: '#9DF3C4',
      400: '#7CEFB1',
      500: '#5BEB9D',
      600: '#49C07F',
      700: '#379462',
      800: '#266944',
      900: '#1D5335',
      contrastText: '#222529',
      subtlest: '#EFFDF5',
      subtlestText: '#5BEB9D'
    },
    greenYellow: {
      main: '#A3EB5B',
      50: '#F6FDEF',
      100: '#EDFBDE',
      200: '#DAF7BD',
      300: '#C8F39D',
      400: '#B5EF7C',
      500: '#A3EB5B',
      600: '#84C049',
      700: '#669437',
      800: '#476926',
      900: '#38531D',
      contrastText: '#222529',
      subtlest: '#F6FDEF',
      subtlestText: '#A3EB5B'
    },
    yellow: {
      main: '#F5DA4E',
      50: '#FEFBED',
      100: '#FDF8DC',
      200: '#FBF0B8',
      300: '#F9E995',
      400: '#F7E171',
      500: '#F5DA4E',
      600: '#C7B13F',
      700: '#99882F',
      800: '#6C6020',
      900: '#554B18',
      contrastText: '#222529',
      subtlest: '#FEFBED',
      subtlestText: '#F5DA4E'
    },
    brown: {
      main: '#BB884C',
      50: '#F8F3ED',
      100: '#F1E7DB',
      200: '#E4CFB7',
      300: '#D6B894',
      400: '#C9A070',
      500: '#BB884C',
      600: '#966D3D',
      700: '#70522E',
      800: '#4B361E',
      900: '#382917',
      contrastText: '#222325',
      subtlest: '#F8F3ED',
      subtlestText: '#BB884C'
    },
    orangeWarm: {
      main: '#FA8848',
      50: '#FFF3ED',
      100: '#FEE7DA',
      200: '#FDCFB6',
      300: '#FCB891',
      400: '#FBA06D',
      500: '#BB884C',
      600: '#CB6E3A',
      700: '#9C542B',
      800: '#6E3A1D',
      900: '#562D16',
      contrastText: '#222325',
      subtlest: '#FFF3ED',
      subtlestText: '#FA8848'
    },
    secondary: {
      main: '#95969C',
      100: '#81818129',
      200: '#81818152',
      contrastText: '#ffffff'
    },
    brand: {
      first: '#2A6AB0',
      second: '#1E4480',
      third: '#6594FE',
      white: '#FFFFFF'
    },
    error: {
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
    accent: {
      main: '#00B8C3',
      100: '#00CFDC29',
      200: '#00CFDC52',
      contrastText: '#ffffff'
    },
    placeholder: '#D5D7DA',
    navbarHeader: '#F8F8F8',
    text: {
      primary: '#5D5E61',
      secondary: '#2F3033',
      disabled: '#5D5E61'
    },
    background: {
      default: '#FEFEFE',
      paper: '#FEFEFE'
    },
    divider: '#DBDADE',
    grey: {
      100: '#F7F8FA',
      200: '#F0F1F5',
      300: '#DBDCE1',
      400: '#BDBEC3',
      500: '#6C7086',
      600: '#4B4F70',
      700: '#2F335A',
      800: '#1C204A'
    },
    blueMv: {
      100: '#CCE6FF',
      200: '#99CAFF',
      300: '#66A9FF',
      400: '#3F8DFF',
      500: '#0048DB',
      600: '#0035B7',
      700: '#002593',
      800: '#001A7A'
    },
    davis: {
      1: '#12E6F3',
      2: '#007BFF',
      3: '#164FBE',
      4: '#538BFA',
      5: '#702DDE',
      6: '#7367F0',
      7: '#EB00FF',
      8: '#DE4095',
      9: '#EA5455',
      10: '#FFD600',
      11: '#EEA83E',
      12: '#80FF00',
      13: '#00FF72',
      14: '#20C997',
      15: '#0DB5D0',
      16: '#00FFD1'
    }
  },
  colorToken: {
    text: {
      neutral: {
        normal: '#222325',
        inverted: '#FEFEFE',
        disabled: '#C6C7CA',
        subtle: '#5A5D62',
        subtlest: '#A9ACB0'
      },
      neutralInverted: {
        normal: '#FEFEFE'
      },
      success: {
        normal: '#39A53F'
      },
      danger: {
        normal: '#E90229'
      },
      primary: {
        normal: '#005EFF',
        bold: '#004BCC',
        boldest: '#002666'
      },
      info: {
        normal: '#0689CC'
      },
      warning: {
        normal: '#FFAE02'
      }
    },
    background: {
      default: '#FEFEFE',
      paper: '#FEFEFE',
      primary: {
        normal: '#005EFF',
        hover: '#004BCC',
        pressed: '#003899',
        subtle: '#99BFFF',
        subtlest: '#E6EFFF',
        disabled: '#CCDFFF'
      },
      neutral: {
        normal: '#FEFEFE',
        subtle: '#D4D5D7',
        inverted: '#2D2E31',
        subtlest: '#F9F9FA',
        disabled: '#EDEEF0'
      },
      neutralInverted: {
        normal: '#2D2E31',
        subtle: '#5A5D62',
        inverted: '#F9F9FA',
        subtlest: '#2D2E31',
        disabled: '#43464A'
      },
      success: {
        normal: '#3EB645',
        hover: '#39A53F',
        pressed: '#2D8131',
        subtle: '#A7DDA9',
        subtlest: '#ECF8EC'
      },
      info: {
        normal: '#08ABFF',
        hover: '#0689CC',
        pressed: '#056799',
        subtle: '#9CDDFF',
        subtlest: '#E6F7FF'
      },
      warning: {
        normal: '#FFAE02',
        hover: '#E09902',
        pressed: '#996801',
        subtle: '#FFDF9A',
        subtlest: '#FFF7E6'
      },
      danger: {
        normal: '#E90229',
        hover: '#BA0221',
        pressed: '#8C0119',
        subtle: '#F69AA9',
        subtlest: '#FDE6EA'
      },
      brickRed: {
        normal: '#F65556',
        disabled: '#FDDDDD'
      },
      pink: {
        normal: '#EF48A2',
        disabled: '#FDEDF6'
      },
      violet: {
        normal: '#EF34FF',
        disabled: '#FDEBFF'
      },
      purple: {
        normal: '#8850E3',
        disabled: '#F3EEFC'
      },
      violetBlue: {
        normal: '#5D47FF',
        disabled: '#EFEDFF'
      },
      royalBlue: {
        normal: '#4678DD',
        disabled: '#EDF2FC'
      },
      dodgerBlue: {
        normal: '#449EFD',
        disabled: '#ECF5FF'
      },
      cyan: {
        normal: '#48D3E5',
        disabled: '#EDFBFC'
      },
      seaGreen: {
        normal: '#56D7C2',
        disabled: '#EEFBF9'
      },
      springGreen: {
        normal: '#5BEB9D',
        disabled: '#EFFDF5'
      },
      greenYellow: {
        normal: '#A3EB5B',
        disabled: '#F6FDEF'
      },
      yellow: {
        normal: '#F5DA4E',
        disabled: '#FEFBED'
      },
      brown: {
        normal: '#BB884C',
        disabled: '#F8F3ED'
      },
      orangeWarm: {
        normal: '#FEE7DA',
        disabled: '#FFF3ED'
      }
    },
    border: {
      neutral: {
        subtlest: '#FEFEFE',
        subtle: '#F9F9FA',
        normal: '#EDEEF0',
        bold: '#D4D5D7',
        boldest: '#8D9095'
      },
      primary: {
        subtlest: '#E6EFFF',
        subtle: '#CCDFFF',
        normal: '#005EFF',
        hover: '#004BCC',
        pressed: '#003899',
        disabled: '#E6EFFF'
      },
      success: {
        subtlest: '#ECF8EC',
        subtle: '#C3E8C5',
        normal: '#3EB645',
        bold: '#39A53F',
        boldest: '#2D8131'
      },
      danger: {
        subtlest: '#FDE6EA',
        subtle: '#FBCCD4',
        normal: '#E90229',
        bold: '#BA0221',
        boldest: '#8C0119'
      },
      warning: {
        subtlest: '#FFF7E6',
        subtle: '#FFEFCC',
        normal: '#FFAE02',
        bold: '#E09902',
        boldest: '#996801'
      },
      brickRed: {
        subtlest: '#FEEEEE',
        subtle: '#FDDDDD',
        normal: '#F65556',
        bold: '#CA4445',
        boldest: '#9D3334'
      },
      pink: {
        subtlest: '#FDEDF6',
        subtle: '#FCDAEC',
        normal: '#EF48A2',
        bold: '#C03A82',
        boldest: '#912B62'
      },
      violet: {
        subtlest: '#FDEBFF',
        subtle: '#FCD6FF',
        normal: '#EF34FF',
        bold: '#BF2ACC',
        boldest: '#901F99'
      },
      purple: {
        subtlest: '#F3EEFC',
        subtle: '#E7DCF9',
        normal: '#8850E3',
        bold: '#6D40B6',
        boldest: '#523089'
      },
      violetBlue: {
        subtlest: '#EFEDFF',
        subtle: '#DFDAFF',
        normal: '#5D47FF',
        bold: '#4B39D0',
        boldest: '#392BA1'
      },
      royalBlue: {
        subtlest: '#EDF2FC',
        subtle: '#DAE4F8',
        normal: '#4678DD',
        bold: '#3860B1',
        boldest: '#2A4885'
      },
      dodgerBlue: {
        subtlest: '#ECF5FF',
        subtle: '#DAECFF',
        normal: '#449EFD',
        bold: '#3680CD',
        boldest: '#29629E'
      },
      cyan: {
        subtlest: '#EDFBFC',
        subtle: '#DAF6FA',
        normal: '#48D3E5',
        bold: '#3AA9B7',
        boldest: '#2B7F89'
      },
      seaGreen: {
        subtlest: '#EEFBF9',
        subtle: '#DDF7F3',
        normal: '#56D7C2',
        bold: '#45AC9B',
        boldest: '#348174'
      },
      springGreen: {
        subtlest: '#EFFDF5',
        subtle: '#DEFBEB',
        normal: '#5BEB9D',
        bold: '#49C07F',
        boldest: '#379462'
      },
      greenYellow: {
        subtlest: '#F6FDEF',
        subtle: '#EDFBDE',
        normal: '#A3EB5B',
        bold: '#84C049',
        boldest: '#669437'
      },
      yellow: {
        subtlest: '#FEFBED',
        subtle: '#FDF8DC',
        normal: '#F5DA4E',
        bold: '#C7B13F',
        boldest: '#99882F'
      },
      brown: {
        subtlest: '#F8F3ED',
        subtle: '#F1E7DB',
        normal: '#BB884C',
        bold: '#966D3D',
        boldest: '#70522E'
      },
      orangeWarm: {
        subtlest: '#FFF3ED',
        subtle: '#FEE7DA',
        normal: '#FA8848',
        bold: '#CB6E3A',
        boldest: '#9C542B'
      }
    },
    icon: {
      primary: {
        normal: '#005EFF',
        bold: '#004BCC',
        boldest: '#003899'
      },
      danger: {
        normal: '#E90229',
        bold: '#BA0221',
        boldest: '#8C0119',
        subtlest: '#F69AA9'
      },
      neutral: {
        normal: '#70747B',
        inverted: '#FEFEFE',
        subtle: '#5A5D62',
        subtlest: '#C6C7CA',
        boldest: '#2D2E31',
        disabled: '#A9ACB0'
      },
      success: {
        normal: '#3EB645',
        subtlest: '#A7DDA9',
        bold: '#39A53F',
        boldest: '#2D8131'
      },
      warning: {
        normal: '#FFAE02',
        subtlest: '#FFDF9A',
        bold: '#E09902',
        boldest: '#996801'
      },
      info: {
        normal: '#08ABFF',
        subtlest: '#9CDDFF',
        bold: '#0689CC',
        boldest: '#056799'
      }
    },
    link: {
      primary: {
        subtlest: '#99BFFF',
        subtle: '#004BCC',
        boldest: '#003899',
        normal: '#005EFF',
        hover: '#004BCC',
        pressed: '#003899'
      },
      danger: {
        subtlest: '#F69AA9',
        subtle: '#BA0221',
        boldest: '#8C0119',
        normal: '#E90229',
        hover: '#BA0221',
        pressed: '#8C0119'
      },
      success: {
        subtlest: '#A7DDA9',
        subtle: '#39A53F',
        boldest: '#2D8131',
        normal: '#3EB645',
        hover: '#39A53F',
        pressed: '#2D8131'
      },
      warning: {
        subtlest: '#FFDF9A',
        subtle: '#E09902',
        boldest: '#996801',
        normal: '#FFAE02',
        hover: '#E09902',
        pressed: '#996801'
      },
      neutral: {
        subtlest: '#C6C7CA',
        subtle: '#5A5D62',
        boldest: '#43464A',
        normal: '#70747B',
        hover: '#5A5D62',
        pressed: '#43464A'
      }
    },
    chart: {
      accents: {
        brickRed: {
          default: '#F65556'
        },
        pink: {
          default: '#EF48A2'
        },
        violet: {
          default: '#EF34FF'
        },
        purple: {
          default: '#8850E3'
        },
        violetBlue: {
          default: '#5D47FF'
        },
        royalBlue: {
          default: '#4678DD'
        },
        dodgerBlue: {
          default: '#DAECFF'
        },
        cyan: {
          default: '#DAF6FA'
        },
        seaGreen: {
          default: '#DDF7F3'
        },
        springGreen: {
          default: '#DEFBEB'
        },
        greenYellow: {
          default: '#EDFBDE'
        },
        yellow: {
          default: '#FDF8DC'
        },
        brown: {
          default: '#F1E7DB'
        },
        orangeWarm: {
          default: '#FEE7DA'
        }
      }
    }
  },
  typography: {
    fontFamily: ['var(--font-roboto)', 'sans-serif'].join(','),
    button: {
      textTransform: 'none'
    },
    display1: {
      fontWeight: 500,
      lineHeight: 1.3125,
      fontSize: 64,
      color: '#2F3033'
    },
    display2: {
      fontWeight: 500,
      lineHeight: 1.39,
      fontSize: 56,
      color: '#2F3033'
    },
    display3: {
      fontWeight: 500,
      lineHeight: 1.41,
      fontSize: 48,
      color: '#2F3033'
    },
    display4: {
      fontWeight: 500,
      lineHeight: 1.4375,
      fontSize: 32,
      color: '#2F3033'
    },
    h1: {
      fontWeight: 600,
      lineHeight: 1.36,
      fontSize: 38,
      color: '#2F3033'
    },
    h2: {
      fontWeight: 700,
      lineHeight: 1.375,
      fontSize: 32,
      color: '#2F3033'
    },
    h3: {
      fontWeight: 600,
      lineHeight: 1.38,
      fontSize: 26,
      color: '#2F3033'
    },
    h4: {
      fontWeight: 600,
      lineHeight: 1.36,
      fontSize: 22,
      color: '#2F3033'
    },
    h5: {
      fontWeight: 600,
      lineHeight: 1.33,
      fontSize: 18,
      color: '#2F3033'
    },

    h6: {
      fontWeight: 600,
      lineHeight: 1.4,
      fontSize: 15,
      color: '#2F3033'
    },
    subtitle1Medium: {
      fontWeight: 500,
      lineHeight: 1.16,
      fontSize: 18,
      color: '#5D5E61'
    },
    subtitle2Medium: {
      fontWeight: 500,
      lineHeight: 1.17,
      fontSize: 16,
      color: '#5D5E61'
    },
    subtitle1: {
      fontWeight: 400,
      lineHeight: 1.16,
      fontSize: 18,
      color: '#5D5E61'
    },
    subtitle2: {
      fontWeight: 400,
      lineHeight: 1.17,
      fontSize: 16,
      color: '#5D5E61'
    },
    body1: {
      fontWeight: 400,
      lineHeight: 1.17,
      fontSize: 16,
      letterSpacing: 0.015,
      color: '#5D5E61'
    },
    body2: {
      fontWeight: 400,
      lineHeight: 1.14,
      fontSize: 14,
      letterSpacing: 0.015,
      color: '#5D5E61'
    },
    menuActive: {
      fontWeight: 400,
      lineHeight: 1.14,
      fontSize: 15,
      color: '#5D5E61'
    },
    buttonLg: {
      fontWeight: 500,
      lineHeight: 1.17,
      fontSize: 16,
      color: '#5D5E61'
    },
    buttonMd: {
      fontWeight: 500,
      fontSize: 14,
      color: '#5D5E61'
    },
    buttonSm: {
      fontWeight: 500,
      fontSize: 12,
      color: '#5D5E61'
    },
    labelLg: {
      fontWeight: 400,
      fontSize: 18,
      color: '#5D5E61'
    },
    labelMd: {
      fontWeight: 400,
      fontSize: 16,
      color: '#5D5E61'
    },
    labelSmBold: {
      fontWeight: 600,
      fontSize: 13,
      color: '#5D5E61'
    },
    labelSm: {
      fontWeight: 400,
      fontSize: 13,
      color: '#5D5E61'
    },
    inputLg: {
      fontWeight: 400,
      fontSize: 18,
      color: '#5D5E61'
    },
    inputMd: {
      fontWeight: 400,
      fontSize: 16,
      color: '#5D5E61'
    },
    inputSm: {
      fontWeight: 400,
      fontSize: 13,
      color: '#5D5E61'
    },
    PlaceholderLg: {
      fontWeight: 400,
      fontSize: 18,
      color: '#D5D7DA'
    },
    PlaceholderMd: {
      fontWeight: 400,
      fontSize: 16,
      color: '#D5D7DA'
    },
    PlaceholderSm: {
      fontWeight: 400,
      fontSize: 13,
      color: '#D5D7DA'
    },
    TableHeader: {
      fontWeight: 600,
      fontSize: 12,
      color: '#5D5E61'
    }
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiInputBase-root.Mui-disabled': {
            backgroundColor: '#DBDADE'
          },
          '& .MuiInputBase-root.Mui-disabled .MuiOutlinedInput-notchedOutline': {
            borderWidth: 0
          },
          '& .MuiInputBase-input::placeholder': {
            color: '#D5D7DA',
            fontSize: '15px',
            opacity: 1
          }
        }
      }
    }
  }
}

export const darkThemeOptions: ThemeOptions = {
  palette: {
    mode: 'dark',
    primary: {
      main: '#337EFF',
      900: '#E6EFFF',
      800: '#CCDFFF',
      700: '#99BFFF',
      600: '#669EFF',
      500: '#337EFF',
      400: '#005EFF',
      300: '#004BCC',
      200: '#003899',
      100: '#002666',
      50: '#001C4D',
      contrastText: '#FFFFFF',
      subtlest: '#001C4D',
      subtlestText: '#337EFF',
      dark: '#004BCC'
    },
    neutral: {
      main: '#F9F9FA',
      800: '#F9F9FA',
      700: '#EDEEF0',
      600: '#D4D5D7',
      500: '#C6C7CA',
      400: '#A9ACB0',
      300: '#8D9095',
      200: '#70747B',
      100: '#5A5D62',
      50: '#43464A',
      25: '#2D2E31',
      white: '#FEFEFE',
      black: '#222325',
      contrastText: '#2D2E31',
      subtlest: '#2D2E31',
      subtlestText: '#D4D5D7'
    },
    neutralInverted: {
      main: '#5A5D62',
      contrastText: '#F9F9FA',
      subtlest: '##F9F9FA',
      subtlestText: '#222325'
    },
    success: {
      main: '#65C46A',
      900: '#ECF8EC',
      800: '#C3E8C5',
      700: '#A7DDA9',
      600: '#7ECD82',
      500: '#65C46A',
      400: '#3EB645',
      300: '#39A53F',
      200: '#2D8131',
      100: '#236426',
      50: '#1A4C1D',
      subtlest: '#1A4C1D',
      contrastText: '#FEFEFE',
      subtlestText: '#65C46A',
      dark: '#A7DDA9'
    },
    info: {
      main: '#39BCFF',
      900: '#E6F7FF',
      800: '#CEEEFF',
      700: '#9CDDFF',
      600: '#6BCDFF',
      500: '#39BCFF',
      400: '#08ABFF',
      300: '#0689CC',
      200: '#056799',
      100: '#034466',
      50: '#02334D',
      contrastText: '#FEFEFE',
      subtlest: '#02334D',
      subtlestText: '#39BCFF',
      dark: '#9CDDFF'
    },
    warning: {
      main: '#FFBE35',
      900: '#FFF7E6',
      800: '#FFEFCC',
      700: '#FFDF9A',
      600: '#FFCE67',
      500: '#FFBE35',
      400: '#FFAE02',
      300: '#E09902',
      200: '#996801',
      100: '#664601',
      50: '#4D3401',
      subtlest: '#4D3401',
      contrastText: '#222325',
      subtlestText: '#FFBE35',
      dark: '#FFCE67'
    },
    danger: {
      main: '#ED3554',
      900: '#FDE6EA',
      800: '#FBCCD4',
      700: '#F69AA9',
      600: '#F2677F',
      500: '#ED3554',
      400: '#E90229',
      300: '#BA0221',
      200: '#8C0119',
      100: '#5D0110',
      50: '#46010C',
      contrastText: '#FEFEFE',
      subtlest: '#46010C',
      subtlestText: '#ED3554',
      dark: '#F69AA9'
    },
    brickRed: {
      main: '#CA4445',
      900: '#FEEEEE',
      800: '#FDDDDD',
      700: '#FBBBBB',
      600: '#FA999A',
      500: '#F87778',
      400: '#F65556',
      300: '#CA4445',
      200: '#9D3334',
      100: '#712323',
      50: '#5B1A1B',
      contrastText: '#F9F9FA',
      subtlest: '#FEEEEE',
      subtlestText: '#F65556'
    },
    pink: {
      main: '#C03A82',
      900: '#FDEDF6',
      800: '#FCDAEC',
      700: '#F9B6DA',
      600: '#F591C7',
      500: '#F26DB5',
      400: '#EF48A2',
      300: '#C03A82',
      200: '#912B62',
      100: '#631D43',
      50: '#4B1633',
      contrastText: '#F9F9FA',
      subtlest: '#FDEDF6',
      subtlestText: '#EF48A2'
    },
    violet: {
      main: '#BF2ACC',
      900: '#FDEBFF',
      800: '#FCD6FF',
      700: '#F9AEFF',
      600: '#F585FF',
      500: '#F25DFF',
      400: '#EF34FF',
      300: '#BF2ACC',
      200: '#901F99',
      100: '#601567',
      50: '#48104D',
      contrastText: '#F9F9FA',
      subtlest: '#FDEBFF',
      subtlestText: '#EF34FF'
    },
    purple: {
      main: '#6D40B6',
      900: '#F3EEFC',
      800: '#E7DCF9',
      700: '#CFB9F4',
      600: '#B896EE',
      500: '#A073E9',
      400: '#8850E3',
      300: '#6D40B6',
      200: '#523089',
      100: '#36205B',
      50: '#291845'
    },
    violetBlue: {
      main: '#4B39D0',
      900: '#EFEDFF',
      800: '#DFDAFF',
      700: '#BEB5FF',
      600: '#9E91FF',
      500: '#7D6CFF',
      400: '#5D47FF',
      300: '#4B39D0',
      200: '#392BA1',
      100: '#261C72',
      50: '#1D155B',
      contrastText: '#F9F9FA',
      subtlest: '#EFEDFF',
      subtlestText: '#5D47FF'
    },
    royalBlue: {
      main: '#3860B1',
      900: '#EDF2FC',
      800: '#DAE4F8',
      700: '#B5C9F1',
      600: '#90AEEB',
      500: '#6B93E4',
      400: '#4678DD',
      300: '#3860B1',
      200: '#2A4885',
      100: '#1C3058',
      50: '#152442',
      contrastText: '#F9F9FA',
      subtlest: '#EDF2FC',
      subtlestText: '#4678DD'
    },
    dodgerBlue: {
      main: '#1B436E',
      900: '#ECF5FF',
      800: '#DAECFF',
      700: '#B4D8FE',
      600: '#8FC5FE',
      500: '#69B1FD',
      400: '#449EFD',
      300: '#3680CD',
      200: '#29629E',
      100: '#1B436E',
      50: '#143456',
      contrastText: '#F9F9FA',
      subtlest: '#ECF5FF',
      subtlestText: '#449EFD'
    },
    cyan: {
      main: '#48D3E5',
      900: '#EDFBFC',
      800: '#DAF6FA',
      700: '#B6EDF5',
      600: '#91E5EF',
      500: '#6DDCEA',
      400: '#48D3E5',
      300: '#3AA9B7',
      200: '#2B7F89',
      100: '#1D545C',
      50: '#163F45',
      contrastText: '#222529',
      subtlest: '#EDFBFC',
      subtlestText: '#48D3E5'
    },
    seaGreen: {
      main: '#22564E',
      900: '#EEFBF9',
      800: '#DDF7F3',
      700: '#BBEFE7',
      600: '#9AE7DA',
      500: '#78DFCE',
      400: '#56D7C2',
      300: '#45AC9B',
      200: '#348174',
      100: '#22564E',
      50: '#1A413A',
      contrastText: '#222529',
      subtlest: '#EEFBF9',
      subtlestText: '#56D7C2'
    },
    springGreen: {
      main: '#266944',
      900: '#EFFDF5',
      800: '#DEFBEB',
      700: '#BDF7D8',
      600: '#9DF3C4',
      500: '#7CEFB1',
      400: '#5BEB9D',
      300: '#49C07F',
      200: '#379462',
      100: '#266944',
      50: '#1D5335',
      contrastText: '#222529',
      subtlest: '#EFFDF5',
      subtlestText: '#5BEB9D'
    },
    greenYellow: {
      main: '#A3EB5B',
      900: '#F6FDEF',
      800: '#EDFBDE',
      700: '#DAF7BD',
      600: '#C8F39D',
      500: '#B5EF7C',
      400: '#A3EB5B',
      300: '#84C049',
      200: '#669437',
      100: '#476926',
      50: '#38531D',
      contrastText: '#222529',
      subtlest: '#F6FDEF',
      subtlestText: '#A3EB5B'
    },
    yellow: {
      main: '#6C6020',
      900: '#FEFBED',
      800: '#FDF8DC',
      700: '#FBF0B8',
      600: '#F9E995',
      500: '#F7E171',
      400: '#F5DA4E',
      300: '#C7B13F',
      200: '#99882F',
      100: '#6C6020',
      50: '#554B18',
      contrastText: '#222529',
      subtlest: '#FEFBED',
      subtlestText: '#F5DA4E'
    },
    brown: {
      main: '#4B361E',
      900: '#F8F3ED',
      800: '#F1E7DB',
      700: '#E4CFB7',
      600: '#D6B894',
      500: '#C9A070',
      400: '#BB884C',
      300: '#966D3D',
      200: '#70522E',
      100: '#4B361E',
      50: '#382917',
      contrastText: '#222325',
      subtlest: '#F8F3ED',
      subtlestText: '#BB884C'
    },
    orangeWarm: {
      main: '#6E3A1D',
      900: '#FFF3ED',
      800: '#FEE7DA',
      700: '#FDCFB6',
      600: '#FCB891',
      500: '#FBA06D',
      400: '#BB884C',
      300: '#CB6E3A',
      200: '#9C542B',
      100: '#6E3A1D',
      50: '#562D16',
      contrastText: '#F9F9FA',
      subtlest: '#562D16',
      subtlestText: '#CB6E3A'
    },
    secondary: {
      main: '#95969C',
      100: '#81818129',
      200: '#81818152',
      contrastText: '#ffffff'
    },
    brand: {
      first: '#2A6AB0',
      second: '#1E4480',
      third: '#6594FE',
      white: '#FFFFFF'
    },
    important: {
      main: '#ED3554',
      900: '#FDE6EA',
      800: '#FBCCD4',
      700: '#F69AA9',
      600: '#F2677F',
      500: '#ED3554',
      400: '#E90229',
      300: '#BA0221',
      200: '#8C0119',
      100: '#5D0110',
      50: '#46010C',
      contrastText: '#FEFEFE',
      subtlest: '#46010C',
      subtlestText: '#ED3554'
    },
    critical: {
      main: '#ED3554',
      900: '#FDE6EA',
      800: '#FBCCD4',
      700: '#F69AA9',
      600: '#F2677F',
      500: '#ED3554',
      400: '#E90229',
      300: '#BA0221',
      200: '#8C0119',
      100: '#5D0110',
      50: '#46010C',
      contrastText: '#FEFEFE',
      subtlest: '#46010C',
      subtlestText: '#ED3554'
    },
    error: {
      main: '#ED3554',
      900: '#FDE6EA',
      800: '#FBCCD4',
      700: '#F69AA9',
      600: '#F2677F',
      500: '#ED3554',
      400: '#E90229',
      300: '#BA0221',
      200: '#8C0119',
      100: '#5D0110',
      50: '#46010C',
      contrastText: '#FEFEFE',
      subtlest: '#46010C',
      subtlestText: '#ED3554'
    },
    accent: {
      main: '#12E6F3',
      100: '#12E6F329',
      200: '#12E6F352',
      contrastText: '#ffffff'
    },
    placeholder: '#485171',
    navbarHeader: '#0E1A25',
    text: {
      primary: '#B4B4EB',
      secondary: '#DAE4F9',
      disabled: '#7F8CAF'
    },
    background: {
      default: '#222325',
      paper: '#222325'
    },
    divider: '#DBDADE',
    grey: {
      100: '#F7F8FA',
      200: '#F0F1F5',
      300: '#DBDCE1',
      400: '#BDBEC3',
      500: '#6C7086',
      600: '#4B4F70',
      700: '#2F335A',
      800: '#1C204A'
    },
    blueMv: {
      100: '#98BAFE',
      200: '#98BAFE',
      300: '#6594FE',
      400: '#3F74FE',
      500: '#0031DA',
      600: '#0024B6',
      700: '#001993',
      800: '#001279'
    },
    davis: {
      1: '#12E6F3',
      2: '#007BFF',
      3: '#164FBE',
      4: '#538BFA',
      5: '#702DDE',
      6: '#7367F0',
      7: '#EB00FF',
      8: '#DE4095',
      9: '#EA5455',
      10: '#FFD600',
      11: '#EEA83E',
      12: '#80FF00',
      13: '#00FF72',
      14: '#20C997',
      15: '#0DB5D0',
      16: '#00FFD1'
    }
  },
  colorToken: {
    text: {
      neutral: {
        normal: '#FEFEFE',
        inverted: '#222325',
        disabled: '#5A5D62'
      },
      neutralInverted: {
        normal: '#222325'
      },
      success: {
        normal: '#2D8131'
      },
      danger: {
        normal: '#ED3554'
      },
      primary: {
        normal: '#005EFF',
        bold: '#337EFF',
        boldest: '#99BFFF'
      },
      info: {
        normal: '#6BCDFF'
      },
      warning: {
        normal: '#FFAE02'
      }
    },
    background: {
      default: '#222325',
      paper: '#222325',
      primary: {
        normal: '#337EFF',
        hover: '#005EFF',
        pressed: '#99BFFF',
        subtle: '#003899',
        subtlest: '#001C4D',
        disabled: '#001C4D'
      },
      neutral: {
        normal: '#222325',
        subtle: '#5A5D62',
        inverted: '#F9F9FA',
        subtlest: '#2D2E31',
        disabled: '#43464A'
      },
      neutralInverted: {
        normal: '#FEFEFE',
        subtle: '#D4D5D7',
        inverted: '#2D2E31',
        subtlest: '#F9F9FA'
      },
      success: {
        normal: '#65C46A',
        hover: '#A7DDA9',
        pressed: '#C3E8C5',
        subtle: '#2D8131',
        subtlest: '#1A4C1D'
      },
      info: {
        normal: '#39BCFF',
        hover: '#9CDDFF',
        pressed: '#CEEEFF',
        subtle: '#056799',
        subtlest: '#02334D'
      },
      warning: {
        normal: '#FFBE35',
        hover: '#FFCE67',
        pressed: '#FFDF9A',
        subtle: '#996801',
        subtlest: '#4D3401'
      },
      danger: {
        normal: '#ED3554',
        hover: '#F69AA9',
        pressed: '#FBCCD4',
        subtle: '#8C0119',
        subtlest: '#46010C'
      },
      brickRed: {
        normal: '#CA4445',
        disabled: '#5B1A1B'
      },
      pink: {
        normal: '#C03A82',
        disabled: '#4B1633'
      },
      violet: {
        normal: '#BF2ACC',
        disabled: '#48104D'
      },
      purple: {
        normal: '#6D40B6',
        disabled: '#291845'
      },
      violetBlue: {
        normal: '#4B39D0',
        disabled: '#1D155B'
      },
      royalBlue: {
        normal: '#3860B1',
        disabled: '#152442'
      },
      dodgerBlue: {
        normal: '#1B436E',
        disabled: '#143456'
      },
      cyan: {
        normal: '#1D545C',
        disabled: '#163F45'
      },
      seaGreen: {
        normal: '#22564E',
        disabled: '#1A413A'
      },
      springGreen: {
        normal: '#266944',
        disabled: '#1D5335'
      },
      greenYellow: {
        normal: '#476926',
        disabled: '#38531D'
      },
      yellow: {
        normal: '#6C6020',
        disabled: '#554B18'
      },
      brown: {
        normal: '#4B361E',
        disabled: '#382917'
      },
      orangeWarm: {
        normal: '#6E3A1D',
        disabled: '#562D16'
      }
    },
    border: {
      neutral: {
        subtlest: '#43464A',
        subtle: '#5A5D62',
        normal: '#70747B',
        bold: '#EDEEF0',
        boldest: '#FEFEFE'
      },
      primary: {
        subtlest: '#002666',
        subtle: '#003899',
        normal: '#005EFF',
        hover: '#004BCC',
        pressed: '#002666',
        disabled: '#001C4D'
      },
      success: {
        subtlest: '#236426',
        subtle: '#2D8131',
        normal: '#3EB645',
        bold: '#7ECD82',
        boldest: '#A7DDA9'
      },
      danger: {
        subtlest: '#5D0110',
        subtle: '#8C0119',
        normal: '#E90229',
        bold: '#F2677F',
        boldest: '#F69AA9'
      },
      warning: {
        subtlest: '#664601',
        subtle: '#996801',
        normal: '#FFAE02',
        bold: '#FFCE67',
        boldest: '#FFDF9A'
      },
      brickRed: {
        subtlest: '#712323',
        subtle: '#9D3334',
        normal: '#F65556',
        bold: '#FA999A',
        boldest: '#FBBBBB'
      },
      pink: {
        subtlest: '#631D43',
        subtle: '#912B62',
        normal: '#EF48A2',
        bold: '#F591C7',
        boldest: '#F9B6DA'
      },
      violet: {
        subtlest: '#601567',
        subtle: '#901F99',
        normal: '#EF34FF',
        bold: '#F585FF',
        boldest: '#F9AEFF'
      },
      purple: {
        subtlest: '#36205B',
        subtle: '#523089',
        normal: '#8850E3',
        bold: '#B896EE',
        boldest: '#CFB9F4'
      },
      violetBlue: {
        subtlest: '#36205B',
        subtle: '#392BA1',
        normal: '#5D47FF',
        bold: '#9E91FF',
        boldest: '#BEB5FF'
      },
      royalBlue: {
        subtlest: '#1C3058',
        subtle: '#2A4885',
        normal: '#4678DD',
        bold: '#90AEEB',
        boldest: '#B5C9F1'
      },
      dodgerBlue: {
        subtlest: '#1B436E',
        subtle: '#29629E',
        normal: '#449EFD',
        bold: '#8FC5FE',
        boldest: '#B4D8FE'
      },
      cyan: {
        subtlest: '#1D545C',
        subtle: '#2B7F89',
        normal: '#48D3E5',
        bold: '#91E5EF',
        boldest: '#B6EDF5'
      },
      seaGreen: {
        subtlest: '#22564E',
        subtle: '#348174',
        normal: '#56D7C2',
        bold: '#9AE7DA',
        boldest: '#BBEFE7'
      },
      springGreen: {
        subtlest: '#266944',
        subtle: '#379462',
        normal: '#5BEB9D',
        bold: '#9DF3C4',
        boldest: '#BDF7D8'
      },
      greenYellow: {
        subtlest: '#476926',
        subtle: '#669437',
        normal: '#A3EB5B',
        bold: '#C8F39D',
        boldest: '#DAF7BD'
      },
      yellow: {
        subtlest: '#6C6020',
        subtle: '#99882F',
        normal: '#F5DA4E',
        bold: '#F9E995',
        boldest: '#FBF0B8'
      },
      brown: {
        subtlest: '#4B361E',
        subtle: '#70522E',
        normal: '#BB884C',
        bold: '#D6B894',
        boldest: '#E4CFB7'
      },
      orangeWarm: {
        subtlest: '#6E3A1D',
        subtle: '#9C542B',
        normal: '#FA8848',
        bold: '#FCB891',
        boldest: '#FDCFB6'
      }
    },
    icon: {
      primary: {
        normal: '#669EFF',
        bold: '#99BFFF',
        boldest: '#CCDFFF'
      },
      danger: {
        normal: '#F2677F',
        bold: '#F69AA9',
        boldest: '#FBCCD4',
        subtlest: '#ED3554'
      },
      neutral: {
        normal: '#8D9095',
        inverted: '#FEFEFE',
        subtle: '#70747B',
        subtlest: '#43464A',
        boldest: '#D4D5D7',
        disabled: '#43464A'
      },
      success: {
        normal: '#7ECD82',
        subtlest: '#2D8131',
        bold: '#A7DDA9',
        boldest: '#C3E8C5'
      },
      warning: {
        normal: '#FFCE67',
        subtlest: '#996801',
        bold: '#FFDF9A',
        boldest: '#FFEFCC'
      },
      info: {
        normal: '#6BCDFF',
        subtlest: '#056799',
        bold: '#9CDDFF',
        boldest: '#CEEEFF'
      }
    },
    link: {
      primary: {
        subtlest: '#337EFF',
        subtle: '#99BFFF',
        boldest: '#CCDFFF',
        normal: '#337EFF',
        hover: '#005EFF',
        pressed: '#002666'
      },
      danger: {
        subtlest: '#ED3554',
        subtle: '#F69AA9',
        boldest: '#FBCCD4',
        normal: '#ED3554',
        hover: '#E90229',
        pressed: '#5D0110'
      },
      success: {
        subtlest: '#65C46A',
        subtle: '#A7DDA9',
        boldest: '#C3E8C5',
        normal: '#65C46A',
        hover: '#3EB645',
        pressed: '#236426'
      },
      warning: {
        subtlest: '#FFBE35',
        subtle: '#FFDF9A',
        boldest: '#FFEFCC',
        normal: '#FFBE35',
        hover: '#FFAE02',
        pressed: '#664601'
      },
      neutral: {
        subtlest: '#8D9095',
        subtle: '#C6C7CA',
        boldest: '#D4D5D7',
        normal: '#8D9095',
        hover: '#70747B',
        pressed: '#2D2E31'
      }
    },
    chart: {
      accents: {
        brickRed: {
          default: '#CA4445'
        },
        pink: {
          default: '#C03A82'
        },
        violet: {
          default: '#BF2ACC'
        },
        purple: {
          default: '#6D40B6'
        },
        violetBlue: {
          default: '#4B39D0'
        },
        royalBlue: {
          default: '#3860B1'
        },
        dodgerBlue: {
          default: '#1B436E'
        },
        cyan: {
          default: '#1D545C'
        },
        seaGreen: {
          default: '#22564E'
        },
        springGreen: {
          default: '#266944'
        },
        greenYellow: {
          default: '#476926'
        },
        yellow: {
          default: '#6C6020'
        },
        brown: {
          default: '#4B361E'
        },
        orangeWarm: {
          default: '#6E3A1D'
        }
      }
    }
  },
  typography: {
    fontFamily: ['var(--font-roboto)', 'sans-serif'].join(','),
    button: {
      textTransform: 'none'
    },
    display1: {
      fontWeight: 500,
      lineHeight: 1.3125,
      fontSize: 64,
      color: '#DAE4F9'
    },
    display2: {
      fontWeight: 500,
      lineHeight: 1.39,
      fontSize: 56,
      color: '#DAE4F9'
    },
    display3: {
      fontWeight: 500,
      lineHeight: 1.41,
      fontSize: 48,
      color: '#DAE4F9'
    },
    display4: {
      fontWeight: 500,
      lineHeight: 1.4375,
      fontSize: 32,
      color: '#DAE4F9'
    },
    h1: {
      fontWeight: 600,
      lineHeight: 1.36,
      fontSize: 38,
      color: '#DAE4F9'
    },
    h2: {
      fontWeight: 700,
      lineHeight: 1.375,
      fontSize: 32,
      color: '#DAE4F9'
    },
    h3: {
      fontWeight: 600,
      lineHeight: 1.38,
      fontSize: 26,
      color: '#DAE4F9'
    },
    h4: {
      fontWeight: 600,
      lineHeight: 1.36,
      fontSize: 22,
      color: '#DAE4F9'
    },
    h5: {
      fontWeight: 600,
      lineHeight: 1.33,
      fontSize: 18,
      color: '#DAE4F9'
    },

    h6: {
      fontWeight: 600,
      lineHeight: 1.4,
      fontSize: 15,
      color: '#DAE4F9'
    },
    subtitle1Medium: {
      fontWeight: 500,
      lineHeight: 1.16,
      fontSize: 18,
      color: '#B4B4EB'
    },
    subtitle2Medium: {
      fontWeight: 500,
      lineHeight: 1.17,
      fontSize: 16,
      color: '#B4B4EB'
    },
    subtitle1: {
      fontWeight: 400,
      lineHeight: 1.16,
      fontSize: 18,
      color: '#B4B4EB'
    },
    subtitle2: {
      fontWeight: 400,
      lineHeight: 1.17,
      fontSize: 16,
      color: '#B4B4EB'
    },
    body1: {
      fontWeight: 400,
      lineHeight: 1.17,
      fontSize: 16,
      letterSpacing: 0.015,
      color: '#B4B4EB'
    },
    body2: {
      fontWeight: 400,
      lineHeight: 1.14,
      fontSize: 14,
      letterSpacing: 0.015,
      color: '#B4B4EB'
    },
    menuActive: {
      fontWeight: 400,
      lineHeight: 1.53,
      fontSize: 15,
      color: '#B4B4EB'
    },
    buttonLg: {
      fontWeight: 500,
      lineHeight: 1.17,
      fontSize: 16,
      color: '#B4B4EB'
    },
    buttonMd: {
      fontWeight: 500,
      fontSize: 14,
      color: '#B4B4EB'
    },
    buttonSm: {
      fontWeight: 500,
      fontSize: 12,
      color: '#B4B4EB'
    },
    labelLg: {
      fontWeight: 400,
      fontSize: 18,
      color: '#B4B4EB'
    },
    labelMd: {
      fontWeight: 400,
      fontSize: 16,
      color: '#B4B4EB'
    },
    labelSmBold: {
      fontWeight: 600,
      fontSize: 13,
      color: '#B4B4EB'
    },
    labelSm: {
      fontWeight: 400,
      fontSize: 13,
      color: '#B4B4EB'
    },
    inputLg: {
      fontWeight: 400,
      fontSize: 18,
      color: '#B4B4EB'
    },
    inputMd: {
      fontWeight: 400,
      fontSize: 16,
      color: '#B4B4EB'
    },
    inputSm: {
      fontWeight: 400,
      fontSize: 13,
      color: '#B4B4EB'
    },
    PlaceholderLg: {
      fontWeight: 400,
      fontSize: 18,
      color: '#485171'
    },
    PlaceholderMd: {
      fontWeight: 400,
      fontSize: 16,
      color: '#485171'
    },
    PlaceholderSm: {
      fontWeight: 400,
      fontSize: 13,
      color: '#485171'
    },
    TableHeader: {
      fontWeight: 600,
      fontSize: 12,
      color: '#B4B4EB'
    }
  },
  components: {
    MuiSwitch: {
      defaultProps: {
        sx: {
          '.MuiSwitch-switchBase': {
            p: '10px !important'
          }
        }
      }
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiInputBase-input::placeholder': {
            color: '#485171',
            fontSize: '15px',
            opacity: 1
          }
        }
      }
    }
  }
}

export const lightTheme = createTheme({
  ...lightThemeOptions,
  palette: {
    ...lightThemeOptions.palette,
    mode: 'light'
  }
})

export const darkTheme = createTheme({
  ...darkThemeOptions,
  palette: {
    ...darkThemeOptions.palette,
    mode: 'dark'
  }
})
