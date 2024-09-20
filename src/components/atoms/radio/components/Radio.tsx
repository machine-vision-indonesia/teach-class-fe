import React from 'react'
import { FormControlLabel, Radio as MuiRadio } from '@mui/material'
import { Palette, ThemeProvider } from '@mui/material/styles'
import RadioProps from '../types/radio.types'
import { RADIO_COLOR_VARIANT, theme } from '../constants/radio.constant'
import { BpCheckedIcon, BpIcon } from '../styles/radio.style'
import { lightThemeOptions } from '@/theme'
/**
 * Renders a custom radio button component.
 *
 * @param {RadioProps} props - The props for the radio button.
 * @param {string} props.label - The label for the radio button.
 * @param {string} props.color - The color of the radio button.
 * @param {boolean} props.disabled - Whether the radio button is disabled.
 * @param {boolean} props.checked - Whether the radio button is checked.
 * @param {boolean} props.hover - Whether the radio button is being hovered.
 * @return {JSX.Element} The rendered radio button component.
 */
const Radio: React.FC<RadioProps> = ({ label, color = 'primary', disabled, checked, hover, onChange, value }) => {
  const dataColor = RADIO_COLOR_VARIANT[color].main

  return (
    <ThemeProvider theme={theme}>
      <FormControlLabel
        control={
          <MuiRadio
            disableRipple
            color={color}
            checkedIcon={<BpCheckedIcon colorHover={dataColor} colorPalette={lightThemeOptions.palette as Palette} />}
            icon={<BpIcon colorHover={dataColor} hover={hover} />}
            onChange={onChange}
            checked={checked}
            disabled={disabled}
            value={value}
          />
        }
        label={label}
      />
    </ThemeProvider>
  )
}

export default Radio
