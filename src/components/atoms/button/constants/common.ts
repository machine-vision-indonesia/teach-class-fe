import { OverridableStringUnion } from '@mui/types'
import { ButtonPropsVariantOverrides } from '@mui/material/Button'
import { buttonVariant } from '../types/button.types'

export const variantMap: Record<string, OverridableStringUnion<buttonVariant, ButtonPropsVariantOverrides>> = {
  solid: 'contained',
  contained: 'contained',
  outlined: 'outlined',
  plain: 'text'
}
