import '@mui/material/styles'

declare module '@mui/material/styles' {
  export interface TypographyVariants {
    display1: React.CSSProperties
    display2: React.CSSProperties
    display3: React.CSSProperties
    display4: React.CSSProperties
    subtitle1Medium: React.CSSProperties
    subtitle2Medium: React.CSSProperties
    menuActive: React.CSSProperties
    buttonLg: React.CSSProperties
    buttonMd: React.CSSProperties
    buttonSm: React.CSSProperties
    labelLg: React.CSSProperties
    labelMd: React.CSSProperties
    labelSm: React.CSSProperties
    labelSmBold: React.CSSProperties
    inputLg: React.CSSProperties
    inputMd: React.CSSProperties
    inputSm: React.CSSProperties
    PlaceholderLg: React.CSSProperties
    PlaceholderMd: React.CSSProperties
    PlaceholderSm: React.CSSProperties
    TableHeader: React.CSSProperties
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    display1: React.CSSProperties
    display2: React.CSSProperties
    display3: React.CSSProperties
    display4: React.CSSProperties
    subtitle1Medium: React.CSSProperties
    subtitle2Medium: React.CSSProperties
    menuActive: React.CSSProperties
    buttonLg: React.CSSProperties
    buttonMd: React.CSSProperties
    buttonSm: React.CSSProperties
    labelLg: React.CSSProperties
    labelMd: React.CSSProperties
    labelSm: React.CSSProperties
    labelSmBold: React.CSSProperties
    inputLg: React.CSSProperties
    inputMd: React.CSSProperties
    inputSm: React.CSSProperties
    PlaceholderLg: React.CSSProperties
    PlaceholderMd: React.CSSProperties
    PlaceholderSm: React.CSSProperties
    TableHeader: React.CSSProperties
  }
}
import '@mui/material/Typography'

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    display1: true
    display2: true
    display3: true
    display4: true
    subtitle1Medium: true
    subtitle2Medium: true
    menuActive: true
    buttonLg: true
    buttonMd: true
    buttonSm: true
    labelLg: true
    labelMd: true
    labelSm: true
    labelSmBold: true
    inputLg: true
    inputMd: true
    inputSm: true
    PlaceholderLg: true
    PlaceholderMd: true
    PlaceholderSm: true
    TableHeader: true
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    accent: true
  }
}

declare module '@mui/material/ButtonGroup' {
  interface ButtonGroupPropsColorOverrides {
    accent: true
  }
}
declare module '@mui/material/Checkbox' {
  interface CheckboxPropsColorOverrides {
    accent: true
  }
}
declare module '@mui/material/Chip' {
  interface ChipPropsColorOverrides {
    accent: true
  }
}
declare module '@mui/material/CircularProgress' {
  interface CircularProgressPropsColorOverrides {
    accent: true
  }
}
declare module '@mui/material/LinearProgress' {
  interface LinearProgressPropsColorOverrides {
    accent: true
  }
}
declare module '@mui/material/Radio' {
  interface RadioPropsColorOverrides {
    accent: true
  }
}
declare module '@mui/material/Switch' {
  interface SwitchPropsColorOverrides {
    accent: true
  }
}
