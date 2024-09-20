// ** MUI Imports
import { ThemeOptions } from '@mui/system'

// import { lightTheme, darkTheme } from '../stories/theme'

// ** To use core palette, uncomment the below import
// import { PaletteMode } from '@mui/material'

// ** To use core palette, uncomment the below import
// import corePalette from 'src/@core/theme/palette'

// ** To use mode (light/dark/semi-dark), skin(default/bordered), direction(ltr/rtl), etc. for conditional styles, uncomment below line
import { useSettings } from 'src/@core/hooks/useSettings'
import { darkThemeOptions, lightThemeOptions } from 'src/theme'

const UserThemeOptions = (): ThemeOptions => {
  // ** To use mode (light/dark/semi-dark), skin(default/bordered), direction(ltr/rtl), etc. for conditional styles, uncomment below line
  const { settings } = useSettings()

  // ** To use mode (light/dark/semi-dark), skin(default/bordered), direction(ltr/rtl), etc. for conditional styles, uncomment below line
  const { mode } = settings

  // ** To use core palette, uncomment the below line
  // const palette = corePalette(mode as PaletteMode, skin)
  return mode == 'light' ? lightThemeOptions : darkThemeOptions
}

export default UserThemeOptions
