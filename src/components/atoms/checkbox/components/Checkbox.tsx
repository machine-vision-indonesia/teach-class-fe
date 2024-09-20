import React from 'react'
import { FormControlLabel, Palette, useTheme } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import CheckboxProps from '../types/checkbox.types'
import { CHECKBOX_COLOR_VARIANT, theme } from '../constants/checkbox.constant'
import { CheckboxCustom } from '../styles/checkbox.style'
import { lightThemeOptions } from '@/theme'
import { MvTypography } from '@/components/atoms/mv-typography'
/**
 * Checkbox component that renders a customized checkbox based on props.
 *
 * @param {CheckboxProps} label - The label to display next to the checkbox
 * @param {string} color - The color variant of the checkbox
 * @param {boolean} disabled - Indicates if the checkbox is disabled
 * @param {boolean} checked - Indicates if the checkbox is checked
 * @param {boolean} indeterminate - Indicates if the checkbox is in an indeterminate state
 * @param {boolean} hover - Indicates if the hover effect is enabled
 * @param {string} size - The size of the checkbox and label
 * @return {JSX.Element} The customized checkbox component
 */
const Checkbox: React.FC<CheckboxProps> = ({
  label,
  color = 'primary',
  disabled,
  checked,
  indeterminate,
  hover,
  onChange,
  size = 'small'
}) => {
  const dataColor = CHECKBOX_COLOR_VARIANT[color].main
  const labelSize = {
    small: 'LABEL_MD_NORMAL',
    large: 'LABEL_LG_NORMAL'
  }

  const themeMv = useTheme()

  return (
    <ThemeProvider theme={theme}>
      <FormControlLabel
        control={
          <CheckboxCustom
            color={color}
            disabled={disabled}
            checked={checked}
            indeterminate={indeterminate}
            hover={hover}
            colorHover={dataColor}
            onChange={onChange}
            size={size}
            colorPalette={lightThemeOptions.palette as Palette}
          />
        }
        label={
          <MvTypography
            size={labelSize[size] as any}
            typeSize='PX'
            color={disabled ? themeMv.colorToken.text.neutral.subtlest : themeMv.colorToken.text.neutral.normal}
          >
            {label}
          </MvTypography>
        } // Apply size-based styling
      />
    </ThemeProvider>
  )
}

export default Checkbox
