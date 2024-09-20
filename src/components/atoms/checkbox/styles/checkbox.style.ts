import { Checkbox as MuiCheckbox, styled } from '@mui/material'
import { CustomCheckboxProps } from '../types/checkbox.types'

export const CheckboxCustom = styled(MuiCheckbox)<CustomCheckboxProps>(({
  colorHover,
  hover = true,
  size = 'small',
  colorPalette
}) => {
  const sizeStyles = {
    small: {
      fontSize: 16 // Adjust font size as needed
    },
    large: {
      fontSize: 20 // Adjust font size as needed
    }
  }

  return {
    color: colorPalette?.neutral['100'],
    '& .MuiSvgIcon-root': {
      borderRadius: 4,
      ...sizeStyles[size] // Apply size-specific styles
    },
    '&:hover': {
      color: hover ? colorHover : undefined
    },
    '&.Mui-disabled': {
      opacity: 0.4,
      '&.Mui-checked': {
        color: colorHover,
        opacity: 0.5
      }
    }
  }
})
