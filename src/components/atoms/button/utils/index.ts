import { Theme } from '@mui/material/styles'
import { buttonVariant } from '../types/button.types'
import { OverridableStringUnion } from '@mui/types'
import { ButtonPropsVariantOverrides } from '@mui/material/Button'
import { variantMap } from '../constants/common'

/**
 * Returns the appropriate color based on the button style, color, theme, and rest props.
 *
 * @param {string} buttonStyle - The style of the button.
 * @param {string} color - The color of the button.
 * @param {Theme} theme - The theme object.
 * @param {any} restProps - The rest of the props.
 * @return {string} The color to be used for the button.
 */
export const getColor = (buttonStyle: string, color: string, theme: Theme, restProps: any) => {
  if (restProps.disabled) {
    return theme.palette.text.disabled
  }
  if (color === 'warning') {
    return theme.palette.text.secondary
  } else if (buttonStyle === 'outlined' || buttonStyle === 'text' || buttonStyle === 'plain') {
    // @ts-ignore
    return theme.palette[color]?.main
  } else {
    return 'white'
  }
}

/**
 * A function that returns a label size based on the provided size parameter.
 *
 * @param {string} size - The size parameter to determine the label size.
 * @return {string} The label size based on the provided size parameter.
 */
export const getSize = (size: string) => {
  switch (size) {
    case 'small':
      return 'LABEL_SM_NORMAL'
    case 'large':
      return 'LABEL_LG_NORMAL'
    default:
      return 'LABEL_MD_NORMAL'
  }
}

/**
 * A function that returns an icon size based on the provided size parameter.
 *
 * @param {string} size - The size parameter to determine the icon size.
 * @return {number} The icon size based on the provided size parameter.
 */
export const getIconSize = (size: string) => {
  switch (size) {
    case 'small':
      return 16
    case 'large':
      return 24
    default:
      return 20
  }
}

export const getVariantType = (
  variant: string
): OverridableStringUnion<buttonVariant, ButtonPropsVariantOverrides> | undefined => {
  return variantMap[variant] || 'text'
}
