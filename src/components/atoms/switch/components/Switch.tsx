import React from 'react'
import { FormControlLabel } from '@mui/material'
import { Palette, ThemeProvider } from '@mui/material/styles'
import SwitchProps from '../types/switch.types'
import { SWITCH_COLOR_VARIANT, theme } from '../constants/switch.constant'
import { SwitchCustom } from '../styles/switch.style'
import { lightThemeOptions } from '@/theme'

/**
 * Renders a custom switch component with provided label, color, disabled state, and checked state.
 *
 * @param {SwitchProps} label - The label to display for the switch component.
 * @param {string} color - The color of the switch component.
 * @param {boolean} disabled - The disabled state of the switch component.
 * @param {boolean} checked - The checked state of the switch component.
 * @return {ReactElement} The rendered custom switch component.
 */

const Switch: React.FC<SwitchProps> = ({ label, color = 'primary', disabled, checked, onChange, onClick }) => {
  let colorVariant: 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success' = 'primary'

  if (color === 'danger') {
    colorVariant = 'error' // Map 'danger' to 'error'
  } else {
    colorVariant =
      (SWITCH_COLOR_VARIANT[color] as 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success') || 'primary'
  }

  return (
    <FormControlLabel
      control={
        <>
          <ThemeProvider theme={theme}>
            <SwitchCustom
              disabled={disabled}
              checked={checked}
              color={colorVariant}
              onChange={onChange}
              onClick={onClick}
              colorPalette={lightThemeOptions.palette as Palette}
            />
          </ThemeProvider>
        </>
      }
      label={label}
    />
  )
}

export default Switch
